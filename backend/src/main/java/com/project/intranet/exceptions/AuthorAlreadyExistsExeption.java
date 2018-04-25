package com.project.intranet.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class AuthorAlreadyExistsExeption extends Exception {

    public AuthorAlreadyExistsExeption(String message) {
        super(message);
    }
}