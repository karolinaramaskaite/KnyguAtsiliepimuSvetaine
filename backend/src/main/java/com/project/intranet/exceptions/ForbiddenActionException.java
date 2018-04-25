package com.project.intranet.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class ForbiddenActionException extends Exception {
    public ForbiddenActionException(String message) {
        super(message);
    }
}
