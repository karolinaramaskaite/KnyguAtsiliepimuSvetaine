package com.project.intranet.mappers;

import com.project.intranet.domain.Author;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AuthorMapper {

    void insertAuthor(Author request);

    void saveImage(@Param("id") long id, @Param("image") byte[] bytes);

    Author findByName(@Param("name") String name);

    int getId(String name);

    void delete(@Param("id") int id);

    Author getById(@Param("id") int id);

    List<Author> getAllAuthors(@Param("start") int start,
                               @Param("limit") int limit);

    void updateAuthor(
            @Param("id") int id,
            @Param("name") String name,
            @Param("biography") String biography);
}
