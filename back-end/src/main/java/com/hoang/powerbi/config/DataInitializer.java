package com.hoang.powerbi.config;

import com.hoang.powerbi.model.User;
import com.hoang.powerbi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Profile;
import jakarta.annotation.PostConstruct;

@Profile("dev")
@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
public void initData() {
    if (userRepository.count() == 0) { 
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(User.Role.ADMIN);
        admin.setEmail("admin@example.com"); 
        userRepository.save(admin);

        User advancedUser = new User();
        advancedUser.setUsername("advanced");
        advancedUser.setPassword(passwordEncoder.encode("advanced123"));
        advancedUser.setRole(User.Role.ADVANCED_USER);
        advancedUser.setEmail("advanced@example.com");
        userRepository.save(advancedUser);

        User regularUser = new User();
        regularUser.setUsername("user");
        regularUser.setPassword(passwordEncoder.encode("user123"));
        regularUser.setRole(User.Role.USER);
        regularUser.setEmail("user@example.com"); 
        userRepository.save(regularUser);

        System.out.println("Sample data initialized.");
        }
    }
}