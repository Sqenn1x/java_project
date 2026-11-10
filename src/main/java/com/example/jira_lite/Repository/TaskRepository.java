package com.example.jira_lite.Repository;

import com.example.jira_lite.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Этот метод обязателен для поиска задач конкретного пользователя
    List<Task> findByUserId(Long userId);
    List<Task> findByUserIdAndBoardId(Long userId, Long boardId);
    List<Task> findByUserIdAndBoardIdIsNull(Long userId);
}