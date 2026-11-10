package com.example.jira_lite.controller;

import com.example.jira_lite.Repository.UserRepository;
import com.example.jira_lite.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // РЕГИСТРАЦИЯ: создает нового пользователя (ошибка, если email уже занят)
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email не может быть пустым"));
        }

        String email = request.getEmail().trim();
        Optional<User> existing = userRepository.findByEmail(email);

        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Пользователь с таким email уже существует!"));
        }

        User newUser = new User();
        newUser.setUsername(request.getUsername() != null ? request.getUsername().trim() : "User");
        newUser.setEmail(email);

        User saved = userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ВХОД: проверяет, существует ли аккаунт с таким email
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email не может быть пустым"));
        }

        String email = request.getEmail().trim();
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Аккаунт с таким email не найден. Пожалуйста, зарегистрируйтесь."));
        }

        return ResponseEntity.ok(user.get());
    }
}