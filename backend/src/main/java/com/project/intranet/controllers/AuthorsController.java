package com.project.intranet.controllers;

import com.project.intranet.domain.Author;
import com.project.intranet.domain.User;
import com.project.intranet.exceptions.AuthorAlreadyExistsExeption;
import com.project.intranet.mappers.AuthorMapper;
import com.project.intranet.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class AuthorsController {
    @Autowired
    private AuthorService authorService;

    @Autowired
    private AuthorMapper authorMapper;

    @RequestMapping(
            path = "authors",
            method = RequestMethod.POST,
            consumes = {"application/json"})
    public ResponseEntity<Author> insertAuthor(
            @Valid @RequestBody Author request,
            HttpServletResponse response) throws AuthorAlreadyExistsExeption {
        return new ResponseEntity<>(authorService.insertAuthor(request, response), HttpStatus.CREATED);
    }

    @RequestMapping(path = "authors/{id}/image", method = RequestMethod.POST)
    public ResponseEntity saveImage(
            @RequestPart("image") MultipartFile file,
            @PathVariable("id") long postId,
            @AuthenticationPrincipal Author author) throws IOException {
        authorService.saveImage(file.getBytes(), postId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(path = "authors/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteAuthor(
            @PathVariable("id") int authorId,
            @AuthenticationPrincipal User user) {
        Author author = authorMapper.getById(authorId);

        if (author != null) {
            if (user.getType().compareTo("admin")!= 0) {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
            if (authorService.tryDeleteAuthor(authorId)) {
                return new ResponseEntity<>(author, HttpStatus.OK);
            }
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping( path = "/authors", method = RequestMethod.GET)
    public ResponseEntity<List<Author>> getAuthors(
            @AuthenticationPrincipal User user,
            @RequestParam(value = "start", defaultValue = "0") int start,
            @RequestParam(value = "limit", defaultValue = "20") int limit
    ) {
        List<Author> authors = authorService.getAllAuthors(start, limit);
        if (authors.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @RequestMapping(path = "/authors/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateAuthor(
            @AuthenticationPrincipal User user,
            @PathVariable("id") int authorId,
            @Valid @RequestBody Author request
    ) {
        if (user.getType().compareTo("admin")!= 0) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        authorService.updateAuthor(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
