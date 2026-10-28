package com.example.jira_lite.Repository;

import com.example.jira_lite.model.Task;
import com.example.jira_lite.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserId(Long userId);

    List<Task> findByStatus(TaskStatus status);

    List<Task> findByUserIdAndStatus(Long userId, TaskStatus status);
}