package com.project.intranet.authentication;

import com.project.intranet.domain.User;
import com.project.intranet.mappers.UserMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

import static com.project.intranet.authentication.AuthenticationConstants.*;

public class JWTAuthenticationFilter extends BasicAuthenticationFilter {
    private UserMapper userMapper;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, UserMapper userMapper) {
        super(authenticationManager);
        this.userMapper = userMapper;

    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(HEADER);
        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }
        try {
            UsernamePasswordAuthenticationToken authentication = getAuthentication(header);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (ExpiredJwtException e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is invalid");
            return;
        }

        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String header) throws ExpiredJwtException {
        if (header != null) {
            String username = Jwts.parser()
                    .setSigningKey(KEY)
                    .parseClaimsJws(header.replace(TOKEN_PREFIX, ""))
                    .getBody()
                    .getSubject();


            if (username != null) {
                User user = userMapper.findByUsername(username);
                if (user == null) {
                    throw new RuntimeException("User doesn't exist");
                }
                if (user.getToken() != null && user.getToken().equals(header.replace(TOKEN_PREFIX, ""))) {
                    return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
                }
            }
            return null;
        }
        return null;
    }
}
