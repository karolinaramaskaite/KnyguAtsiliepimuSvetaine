package com.project.intranet.mappers;

import com.project.intranet.domain.User;
import com.project.intranet.requests.RegistrationRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
    User findByUsername(@Param("email") String email);

    void saveToken(@Param("email") String username, @Param("token") String token);

    void removeToken(@Param("id") long id);

    void insertUser(RegistrationRequest request);

    void delete(@Param("id") int id);

    List<User> getAllUsers();

    User getById(@Param("id") int id);
}
