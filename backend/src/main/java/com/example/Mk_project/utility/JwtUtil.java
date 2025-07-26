package com.example.Mk_project.utility;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

import static javax.crypto.Cipher.SECRET_KEY;

@Component
public class JwtUtil {

    private static final SecretKey key = Keys.hmacShaKeyFor("your-256-bit-secret-your-256-bit-secret".getBytes());

    public String generateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .signWith(key)  // New way to sign
                .compact();
    }

}
