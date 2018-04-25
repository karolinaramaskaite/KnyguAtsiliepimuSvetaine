package com.project.intranet.controllers;

import com.project.intranet.domain.Book;
import com.project.intranet.domain.User;
import com.project.intranet.exceptions.BookAlreadyExistsExeption;
import com.project.intranet.mappers.BookMapper;
import com.project.intranet.requests.BookRequest;
import com.project.intranet.services.BookService;
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
public class BooksController {
    @Autowired
    private BookService bookService;

    @Autowired
    private BookMapper bookMapper;

    @RequestMapping(
            path = "books",
            method = RequestMethod.POST,
            consumes = {"application/json"})
    public ResponseEntity<BookRequest> insertBook(
            @Valid @RequestBody BookRequest request,
            HttpServletResponse response) throws BookAlreadyExistsExeption {
        return new ResponseEntity<>(bookService.insertBook(request, response), HttpStatus.CREATED);
    }

    @RequestMapping(path = "books/{id}/image", method = RequestMethod.POST)
    public ResponseEntity saveImage(
            @RequestPart("image") MultipartFile file,
            @PathVariable("id") int postId,
            @AuthenticationPrincipal Book book) throws IOException {
        bookService.saveImage(file.getBytes(), postId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(path = "books/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteBook(
            @PathVariable("id") int bookId,
            @AuthenticationPrincipal User user) {
        BookRequest book = bookMapper.getById(bookId);

        if (book != null) {
            if (user.getType().compareTo("admin")!= 0) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            if (bookService.tryDeleteBook(bookId)) {
                return new ResponseEntity<>(book, HttpStatus.OK);
            }
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping( path = "/all-books", method = RequestMethod.GET)
    public ResponseEntity<List<BookRequest>> getBooks(
            @AuthenticationPrincipal User user,
            @RequestParam(value = "start", defaultValue = "0") int start,
            @RequestParam(value = "limit", defaultValue = "20") int limit,
            @RequestParam(value = "search", required = false, defaultValue = "") String keyword
    ) {
        if (keyword != "") {
            limit = 100;
        }
        List<BookRequest> books = bookService.getAllBooks(start, limit, keyword);
        if (books.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @RequestMapping( path = "/book/{id}", method = RequestMethod.GET)
    public ResponseEntity<BookRequest> getBook(
            @PathVariable("id") int bookId,
            @AuthenticationPrincipal User user
    ) {
        BookRequest book = bookService.getBook(bookId);
        if (book == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(book, HttpStatus.OK);

    }

    @RequestMapping(path = "/books/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateBook(
            @AuthenticationPrincipal User user,
            @PathVariable("id") int bookId,
            @Valid @RequestBody Book request
    ) {
        if (user.getType().compareTo("admin")!= 0) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        bookService.updateBook(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
