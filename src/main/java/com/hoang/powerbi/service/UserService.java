package com.hoang.powerbi.service;

import com.hoang.powerbi.model.User;
import com.hoang.powerbi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Đăng ký tài khoản mới
     */
    public User register(String username, String email, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username is already taken");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email is already registered");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER"); // Mặc định khi đăng ký là USER

        return userRepository.save(user);
    }

    /**
     * Tìm User theo Username
     */
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Nâng cấp User thành Advanced User
     */
    public void upgradeToAdvancedUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole().equalsIgnoreCase("ADVANCED_USER")) {
            throw new RuntimeException("Already Advanced User");
        }
        if (user.getRole().equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Admin cannot downgrade");
        }

        user.setRole("ADVANCED_USER");
        userRepository.save(user);
    }

    /**
     * Cập nhật thông tin cá nhân (email, password,...)
     */
    public void updateProfile(User updatedUser) {
        User user = userRepository.findById(updatedUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEmail(updatedUser.getEmail());

        // Nếu người dùng nhập password mới thì update
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        userRepository.save(user);
    }

    /**
     * Lấy tất cả người dùng (cho Admin)
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Cập nhật role của User
     */
    public void updateRole(Long userId, String newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(newRole);
        userRepository.save(user);
    }

    /**
     * Xoá User
     */
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }
}
