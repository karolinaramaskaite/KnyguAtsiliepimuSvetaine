package com.project.intranet.controllers;

import com.project.intranet.domain.Profile;
import com.project.intranet.domain.User;
import com.project.intranet.exceptions.UserAlreadyExistsException;
import com.project.intranet.mappers.UserMapper;
import com.project.intranet.requests.RegistrationRequest;
import com.project.intranet.services.ProfileService;
import com.project.intranet.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class UsersController {
    @Autowired
    private ProfileService profileService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserMapper userMapper;

    @RequestMapping(path = "/profiles/{id}", method = RequestMethod.GET)
    public ResponseEntity<Profile> getProfile(@PathVariable("id") long id) {
        Profile profile = profileService.getProfile(id);
        if (profile == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @RequestMapping(
            path = "profiles",
            method = RequestMethod.POST,
            consumes = {"application/json"})
    public ResponseEntity<RegistrationRequest> register(
            @Valid @RequestBody RegistrationRequest request,
            HttpServletResponse response) throws UserAlreadyExistsException {
        return new ResponseEntity<>(userService.register(request, response), HttpStatus.CREATED);
    }

    @RequestMapping(path = "/profiles/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateProfile(
            @AuthenticationPrincipal User user,
            @PathVariable("id") long userId,
            @Valid @RequestBody Profile request
    ) {
        if (user.getId() != userId) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        profileService.updateProfile(user, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping( path = "/users", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getUsers(
            @AuthenticationPrincipal User user
    ) {
        List<User> users = userService.getAllUsers();
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(path = "users/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteUser(
            @PathVariable("id") int userId,
            @AuthenticationPrincipal User admin) {
        User user = userMapper.getById(userId);

        if (user != null) {
            if (user.getType().compareTo("admin")!= 0) {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
            if (userService.tryDeleteUser(userId)) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
}
