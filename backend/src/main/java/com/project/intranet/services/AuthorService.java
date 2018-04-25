package com.project.intranet.services;

import com.project.intranet.domain.Author;
import com.project.intranet.exceptions.AuthorAlreadyExistsExeption;
import com.project.intranet.mappers.AuthorMapper;
import com.project.intranet.mappers.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Service
public class AuthorService {
    @Autowired
    private AuthorMapper authorMapper;
    @Autowired
    private BookMapper bookMapper;

    @Transactional
    public Author insertAuthor(
            Author request,
            HttpServletResponse response) throws AuthorAlreadyExistsExeption {
//        Author author = authorMapper.findByName(request.getName());
//        if (author != null) {
//            throw new AuthorAlreadyExistsExeption("Author already exists");
//        }
        authorMapper.insertAuthor(request);
        return request;
    }

    public void saveImage(byte[] bytes, long id) {
        authorMapper.saveImage(id, bytes);
    }

    @Transactional
    public boolean tryDeleteAuthor(int authorId) {
        Author author = authorMapper.getById(authorId);

        if (author != null) {
            bookMapper.deleteByAuthor(authorId);
            authorMapper.delete(authorId);
            return true;
        }
        else return false;
    }

    public List<Author> getAllAuthors(int start, int limit) {
        return authorMapper.getAllAuthors(start, limit);
    }

    public void updateAuthor(Author request) {
        authorMapper.updateAuthor(
                request.getId(),
                request.getName(),
                request.getBiography());
    }
}
