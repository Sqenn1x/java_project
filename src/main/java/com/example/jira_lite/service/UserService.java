package com.example.jira_lite.service;

import com.example.jira_lite.Repository.UserRepository;
import com.example.jira_lite.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User createUser(User user) {
        // Проверяем, существует ли уже пользователь с таким email
        if (user.getEmail() != null) {
            Optional<User> existing = userRepository.findByEmail(user.getEmail());
            if (existing.isPresent()) {
                return existing.get();
            }
        }
        return userRepository.save(user);
    }
}