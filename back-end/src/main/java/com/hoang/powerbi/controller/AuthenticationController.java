package com.hoang.powerbi.controller;

import com.hoang.powerbi.model.User;
import com.hoang.powerbi.service.JwtService;
import com.hoang.powerbi.service.UserService;
import com.hoang.powerbi.dto.LoginRequest;
import com.hoang.powerbi.dto.RegisterRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    try {
        // Log để debug
        System.out.println("Login attempt: " + request.getUsername());
        
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        
        // Lấy thông tin user
        User user = userService.findByUsername(request.getUsername())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        // Debug log - kiểm tra role
        System.out.println("User found: " + user.getUsername() + " with role: " + user.getRole());
        
        // Tạo token với role chính xác
        String token = jwtService.generateToken(user);
        
        // Trả về token và thông tin role
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", user.getUsername());
        response.put("role", user.getRole().name());  // Trả về role dưới dạng string
        
        return ResponseEntity.ok(response);
    } catch (BadCredentialsException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    } catch (Exception e) {
        System.out.println("Login error: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error during authentication: " + e.getMessage());
    }
}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        User newUser = new User(
            request.getUsername(),
            request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            User.Role.USER // Gán vai trò mặc định
        );
        userService.saveUser(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }
}