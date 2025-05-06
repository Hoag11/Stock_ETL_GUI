package com.hoang.powerbi.controller;

import com.hoang.powerbi.model.User;
import com.hoang.powerbi.service.JwtService;
import com.hoang.powerbi.service.UserService;
import com.hoang.powerbi.dto.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        if (!auth.isAuthenticated()) {
            throw new BadCredentialsException("Invalid credentials");
        }

        User user = userService.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }
}
