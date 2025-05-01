package com.hoang.powerbi.repository;

import com.hoang.powerbi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameAndEmail(String username, String email);
    Optional<User> findByUsernameAndPassword(String username, String password);
    Optional<User> findByEmailAndPassword(String email, String password);
    Optional<User> findByUsernameAndEmailAndPassword(String username, String email, String password);
    Optional<User> findByUsernameAndEmailAndPasswordAndRole(String username, String email, String password, User.Role role);
    Optional<User> findByUsernameAndEmailAndRole(String username, String email, User.Role role);
}
