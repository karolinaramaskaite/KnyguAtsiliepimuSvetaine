package com.project.intranet.controllers;

import com.project.intranet.domain.Review;
import com.project.intranet.domain.User;
import com.project.intranet.mappers.ReviewMapper;
import com.project.intranet.requests.ReviewRequest;
import com.project.intranet.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class ReviewsController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewMapper reviewMapper;

    @RequestMapping(
            path = "reviews",
            method = RequestMethod.POST,
            consumes = {"application/json"})
    public ResponseEntity<ReviewRequest> insertReview(
            @Valid @RequestBody Review request,
            @AuthenticationPrincipal User user,
            HttpServletResponse response){
        request.setUserId(user.getId());
        return new ResponseEntity<>(reviewService.insertReview(request, response), HttpStatus.CREATED);
    }


    @RequestMapping(path = "/reviews/{id}/user", method = RequestMethod.DELETE)
    public ResponseEntity deleteReviewByUser(
            @PathVariable("id") int userId,
            @AuthenticationPrincipal User user) {

            if (user.getType().compareTo("admin")!= 0) {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
        return new ResponseEntity<>(reviewService.tryDeleteUserReviews(userId), HttpStatus.OK);
    }

    @RequestMapping(path = "/reviews/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteReviewById(
            @PathVariable("id") int id,
            @AuthenticationPrincipal User user) {

        if (user.getType().compareTo("admin")!= 0) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(reviewService.tryDeleteById(id), HttpStatus.OK);
    }

    @RequestMapping(path = "/reviews/{id}/book", method = RequestMethod.DELETE)
    public ResponseEntity deleteReviewByBook(
            @PathVariable("id") int bookId,
            @AuthenticationPrincipal User user) {

        if (user.getType().compareTo("admin")!= 0) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(reviewService.tryDeleteBookReviews(bookId), HttpStatus.OK);
    }

    @RequestMapping( path = "/reviews/{bookId}", method = RequestMethod.GET)
    public ResponseEntity<List<ReviewRequest>> getReviews(
            @AuthenticationPrincipal User user,
            @PathVariable("bookId") int bookId
    ) {
        List<ReviewRequest> reviews = reviewService.getAllBookReviews(bookId);
        if (reviews.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }
}
