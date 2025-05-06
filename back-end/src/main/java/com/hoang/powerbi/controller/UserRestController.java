package com.hoang.powerbi.controller;

import com.hoang.powerbi.model.User;
import com.hoang.powerbi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserRestController {

    private final UserService userService;

    @PostMapping("/register")
    public User register(@RequestParam String username, @RequestParam String email, @RequestParam String password) {
        return userService.register(username, email, password);
    }

    @PostMapping("/upgrade")
    public String upgrade(@AuthenticationPrincipal UserDetails userDetails) {
        userService.upgradeToAdvancedUser(userDetails.getUsername());
        return "Upgrade to Advanced Successful!";
    }

    @GetMapping("/profile")
    public User getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.findByUsername(userDetails.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/profile")
    public String updateProfile(@AuthenticationPrincipal UserDetails userDetails, @RequestBody User updatedUser) {
        updatedUser.setUsername(userDetails.getUsername());
        userService.updateProfile(updatedUser);
        return "Profile Updated Successfully!";
    }
}
