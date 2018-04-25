package com.project.intranet.mappers;

import com.project.intranet.domain.Profile;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;

@Mapper
public interface ProfileMapper {
    Profile getById(@Param("id") long id);

    void updatePassword(@Param("id") long id, @Param("password") String password);

    void updateProfile(
            @Param("id") long id,
            @Param("name") String name,
            @Param("surname") String surname,
            @Param("email") String email);
}