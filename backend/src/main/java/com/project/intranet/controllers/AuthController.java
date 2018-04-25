package com.project.intranet.controllers;

import com.project.intranet.domain.Profile;
import com.project.intranet.domain.User;
import com.project.intranet.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(path = "/api")
public class AuthController {

    private static final String ERROR_MESSAGE = "The username or password is incorrect";
    @Autowired
    private UserService userService;

    @RequestMapping(
            path = "auth",
            method = RequestMethod.POST,
            consumes = {"application/x-www-form-urlencoded"})
    public ResponseEntity login(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            HttpServletResponse response) {
        Profile profile = userService.login(username, password, response);
        if (profile == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(ERROR_MESSAGE);
        }
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @RequestMapping(path = "auth", method = RequestMethod.DELETE)
    public ResponseEntity logout(@AuthenticationPrincipal User user) {
        return userService.logout(user.getId());
    }
}
