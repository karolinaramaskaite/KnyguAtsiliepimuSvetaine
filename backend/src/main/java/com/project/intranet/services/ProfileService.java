package com.project.intranet.services;

import com.project.intranet.domain.Profile;
import com.project.intranet.domain.User;
import com.project.intranet.exceptions.UserRegistrationException;
import com.project.intranet.mappers.ProfileMapper;
import com.project.intranet.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class ProfileService {

    @Autowired
    private ProfileMapper profileMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder encoder;

    public Profile getProfile(long id) {
        return profileMapper.getById(id);
    }

    private void validatePasswords(String oldPassword, String newPassword, User user) throws UserRegistrationException {
        if (newPassword.equals(oldPassword)) {
            throw new UserRegistrationException("New and old password matches");
        }
        if (!encoder.matches(oldPassword, user.getPassword())) {
            throw new UserRegistrationException("Old password is wrong");
        }
        if (newPassword.length() < 6) {
            throw new UserRegistrationException("New password is too short");
        }
    }

    public void updateProfile(User user, Profile request) {
        profileMapper.updateProfile(
                user.getId(),
                request.getName(),
                request.getSurname(),
                request.getEmail());
        if (request.getPassword() != null) {
            profileMapper.updatePassword(user.getId(), encoder.encode(request.getPassword()));
        }
    }
}