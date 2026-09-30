package com.example.jira_lite.repository;

import com.example.jira_lite.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Spring Data JPA автоматически сгенерирует SQL-запрос по имени метода!
    List<Task> findByAssigneeId(Long userId);
}