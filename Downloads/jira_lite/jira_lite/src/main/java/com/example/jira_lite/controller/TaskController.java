package com.example.jira_lite.controller;

import com.example.jira_lite.entity.Task;
import com.example.jira_lite.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // Получить список всех задач
    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUserId(@PathVariable Long userId) {
        return taskRepository.findByAssigneeId(userId);
    }

    // Создать новую задачу
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }
    @PatchMapping("/{id}/status")
    public Task updateTaskStatus(@PathVariable Long id, @RequestParam String status) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Задача с id " + id + " не найдена"));

        task.setStatus(status);
        return taskRepository.save(task);
    }

    // Удалить задачу по ID
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        if (!taskRepository.existsById(id)) {
            return "Задача с id " + id + " не найдена!";
        }
        taskRepository.deleteById(id);
        return "Задача с id " + id + " успешно удалена!";
    }
}