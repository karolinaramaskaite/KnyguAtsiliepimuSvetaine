package com.project.intranet.services;

import com.project.intranet.domain.Profile;
import com.project.intranet.exceptions.UserAlreadyExistsException;
import com.project.intranet.mappers.ProfileMapper;
import com.project.intranet.mappers.ReviewMapper;
import com.project.intranet.requests.RegistrationRequest;
import com.project.intranet.domain.User;
import com.project.intranet.mappers.UserMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

import static com.project.intranet.authentication.AuthenticationConstants.*;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private ProfileMapper profileMapper;
    @Autowired
    private ReviewMapper reviewMapper;
    private String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, KEY)
                .compact();
    }

    public ResponseEntity logout(long id) {
        userMapper.removeToken(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    public Profile login(String username, String password, HttpServletResponse response) {
        if (validateLogin(username, password)) {
            setAuthorizationToken(username, response);
            User user = userMapper.findByUsername(username);
            return profileMapper.getById(user.getId());
        } else
            return null;
    }

    private String setAuthorizationToken(String username, HttpServletResponse response) {
        String token = generateToken(username);
        userMapper.saveToken(username, token);
        response.setHeader(HEADER, TOKEN_PREFIX + token);
        return token;
    }

    private boolean validateLogin(String username, String password) {
        User user = userMapper.findByUsername(username);
        if (user == null) {
            return false;
        }
        if (!encoder.matches(password, user.getPassword())) {
            return false;
        }
        return true;
    }

    @Transactional
    public RegistrationRequest register(
            RegistrationRequest request,
            HttpServletResponse response) throws UserAlreadyExistsException {
        User user = userMapper.findByUsername(request.getEmail());
        if (user != null) {
            throw new UserAlreadyExistsException("Username is already taken");
        }
        request.setPassword(encoder.encode(request.getPassword()));
        userMapper.insertUser(request);
        String token = setAuthorizationToken(request.getEmail(), response);
        return request;
    }

    public List<User> getAllUsers() {
        return userMapper.getAllUsers();
    }

    @Transactional
    public boolean tryDeleteUser(int userId) {
        User user = userMapper.getById(userId);
        reviewMapper.deleteUserReviews(userId);

        if (user != null) {
            userMapper.delete(userId);
            return true;
        }
        else return false;
    }
}