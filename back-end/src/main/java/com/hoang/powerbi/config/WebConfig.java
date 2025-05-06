package com.hoang.powerbi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Cho tất cả endpoint
            .allowedOrigins("http://localhost:5173") // Frontend URL
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các method được phép
            .allowedHeaders("*") // Cho phép tất cả headers
            .allowCredentials(true); // Cho phép gửi cookie hoặc JWT từ frontend
    }
}