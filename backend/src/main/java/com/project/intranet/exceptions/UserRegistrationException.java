package com.project.intranet.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserRegistrationException extends Exception {
    public UserRegistrationException(String message) {
        super(message);
    }
}
