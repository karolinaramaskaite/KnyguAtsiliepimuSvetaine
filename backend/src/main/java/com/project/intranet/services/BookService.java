package com.project.intranet.services;

import com.project.intranet.domain.Author;
import com.project.intranet.domain.Book;
import com.project.intranet.domain.User;
import com.project.intranet.exceptions.BookAlreadyExistsExeption;
import com.project.intranet.mappers.AuthorMapper;
import com.project.intranet.mappers.BookMapper;
import com.project.intranet.mappers.ReviewMapper;
import com.project.intranet.requests.BookRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookMapper bookMapper;
    @Autowired
    private AuthorMapper authorMapper;
    @Autowired
    private ReviewMapper reviewMapper;

    @Transactional
    public BookRequest insertBook(
            BookRequest request,
            HttpServletResponse response) throws BookAlreadyExistsExeption {
        Author auth = authorMapper.findByName(request.getAuthor());
        int authorId;
        if (auth == null) {
            Author author = new Author();
            author.setName(request.getAuthor());
            author.setBiography("");
            authorMapper.insertAuthor(author);
        }
        authorId = authorMapper.getId(request.getAuthor());
        Book book = bookMapper.findByTitleAndAuthor(request.getTitle(), authorId);
        if (book != null) {
            throw new BookAlreadyExistsExeption("Book already exists");
        }
        Book newBook = new Book();
        newBook.setTitle(request.getTitle());
        newBook.setAuthorId(authorId);
        newBook.setAbout(request.getAbout());
        newBook.setIsbn(request.getIsbn());
        newBook.setYear(request.getYear());
        newBook.setCreatedOn();
        bookMapper.insertBook(newBook);
        request.setCreatedOn(newBook.getCreatedOn());
        Book books = bookMapper.findByTitleAndAuthor(request.getTitle(), authorId);
        request.setId(books.getId());
        return request;
    }

    public void saveImage(byte[] bytes, int id) {
        bookMapper.saveImage(id, bytes);
    }

    @Transactional
    public boolean tryDeleteBook(int bookId) {
        BookRequest book = bookMapper.getById(bookId);

        if (book != null) {
            reviewMapper.deleteBookReviews(bookId);
            bookMapper.delete(bookId);
            return true;
        }
        else return false;
    }

    public List<BookRequest> getAllBooks(int start, int limit, String keyword) {
        return bookMapper.getAllBooks(start, limit, keyword);
    }

    public BookRequest getBook(int bookId) {
        return bookMapper.getById(bookId);
    }

    public void updateBook(Book request) {
        bookMapper.updateBook(
                request.getId(),
                request.getTitle(),
                request.getYear(),
                request.getIsbn(),
                request.getAbout());
    }
}
