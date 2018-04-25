package com.project.intranet.services;

import com.project.intranet.domain.Profile;
import com.project.intranet.domain.Review;
import com.project.intranet.domain.User;
import com.project.intranet.mappers.ProfileMapper;
import com.project.intranet.mappers.ReviewMapper;
import com.project.intranet.mappers.UserMapper;
import com.project.intranet.requests.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewMapper reviewMapper;
    @Autowired
    private ProfileMapper profileMapper;

    @Transactional
    public ReviewRequest insertReview(
            Review request,
            HttpServletResponse response) {
        request.setDate();
        reviewMapper.insertReview(request);
        ReviewRequest review = new ReviewRequest();
        Profile profile = profileMapper.getById(request.getUserId());
        review.setBookId(request.getBookId());
        review.setUserName(profile.getName());
        review.setUserSurname(profile.getSurname());
        review.setBookId(request.getBookId());
        review.setDate(request.getDate());
        review.setId(request.getId());
        review.setReview(request.getReview());
        return review;
    }

    @Transactional
    public boolean tryDeleteById(int reviewId) {
//        Review review = reviewMapper.getById(reviewId);
//
//        if (review != null) {
            reviewMapper.deleteReviewById(reviewId);
            return true;
//        }
//        else return false;
    }

    @Transactional
    public boolean tryDeleteUserReviews(int userId) {
        reviewMapper.deleteUserReviews(userId);
        return true;
    }

    @Transactional
    public boolean tryDeleteBookReviews(int bookId) {
        reviewMapper.deleteBookReviews(bookId);
        return true;
    }

    public List<ReviewRequest> getAllBookReviews(int bookId) {
        return reviewMapper.getBookReviews(bookId);
    }
}
