package com.hoang.powerbi.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String home(@AuthenticationPrincipal UserDetails userDetails) {
        String role = userDetails.getAuthorities().iterator().next().getAuthority();
        if (role.contains("ADMIN")) {
            return "redirect:/admin/home";
        } else if (role.contains("ADVANCED_USER")) {
            return "redirect:/advanced/home";
        } else {
            return "redirect:/user/home";
        }
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // trả về trang login.html
    }
}