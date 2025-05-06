package com.hoang.powerbi.service;

import com.hoang.powerbi.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    // Khóa bí mật (nên lưu trong biến môi trường)
    private final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Tạo JWT token
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("role", user.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Token sống 1 ngày
                .signWith(SECRET_KEY)
                .compact();
    }

    // Lấy thông tin username từ JWT token
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    // Phân tích JWT token và lấy claims
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}