package com.hoang.powerbi.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/home")
    public String adminHome() {
        return "admin-home"; // trả về trang admin-home.html
    }

    @GetMapping("/manage-airflow")
    public String manageAirflow() {
        return "redirect:http://localhost:8080"; // airflow URL
    }

    @GetMapping("/manage-datasource")
    public String managePostgres() {
        return "redirect:http://localhost:5050"; // postgres URL
    }
}