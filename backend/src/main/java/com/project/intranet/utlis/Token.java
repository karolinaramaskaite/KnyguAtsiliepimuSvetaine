package com.project.intranet.utlis;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

import static com.project.intranet.authentication.AuthenticationConstants.EXPIRATION_TIME;
import static com.project.intranet.authentication.AuthenticationConstants.KEY;


public class Token {
    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, KEY)
                .compact();
    }
}
