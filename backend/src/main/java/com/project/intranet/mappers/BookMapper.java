package com.project.intranet.mappers;

import com.project.intranet.domain.Book;
import com.project.intranet.requests.BookRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BookMapper {
    void insertBook(Book request);

    void saveImage(@Param("id") int id, @Param("image") byte[] bytes);

    Book findByTitleAndAuthor(@Param("title") String title, @Param("authorId") int authorId);

    void delete(@Param("id") int id);

    void deleteByAuthor(@Param("id") int id);

    BookRequest getById(@Param("id") int id);

    List<BookRequest> getAllBooks(@Param("start") int start,
                                  @Param("limit") int limit,
                                  @Param("keyword") String keyword);

    void updateBook(
            @Param("id") int id,
            @Param("title") String title,
            @Param("year") String year,
            @Param("isbn") String isbn,
            @Param("about") String about);
}
