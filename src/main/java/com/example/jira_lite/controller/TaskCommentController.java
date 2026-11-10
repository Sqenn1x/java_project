package com.example.jira_lite.controller;

import com.example.jira_lite.Repository.TaskCommentRepository;
import com.example.jira_lite.Repository.TaskRepository;
import com.example.jira_lite.model.Task;
import com.example.jira_lite.model.TaskComment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks/{taskId}/comments")
public class TaskCommentController {

    private static final int MAX_COMMENT_LENGTH = 5000;

    private final TaskRepository taskRepository;
    private final TaskCommentRepository commentRepository;

    public TaskCommentController(TaskRepository taskRepository, TaskCommentRepository commentRepository) {
        this.taskRepository = taskRepository;
        this.commentRepository = commentRepository;
    }

    @GetMapping
    public ResponseEntity<?> getComments(@PathVariable Long taskId, @RequestParam Long userId) {
        if (findOwnedTask(taskId, userId) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(commentRepository.findByTaskIdOrderByCreatedAtAsc(taskId));
    }

    @PostMapping
    public ResponseEntity<?> createComment(@PathVariable Long taskId, @RequestBody CommentRequest request) {
        if (request.userId() == null || findOwnedTask(taskId, request.userId()) == null) {
            return ResponseEntity.notFound().build();
        }
        if (request.body() == null || request.body().trim().isEmpty()
                || request.body().trim().length() > MAX_COMMENT_LENGTH) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Комментарий должен содержать от 1 до 5000 символов."));
        }

        TaskComment comment = new TaskComment();
        comment.setTaskId(taskId);
        comment.setUserId(request.userId());
        comment.setBody(request.body().trim());
        return ResponseEntity.status(HttpStatus.CREATED).body(commentRepository.save(comment));
    }

    private Task findOwnedTask(Long taskId, Long userId) {
        return taskRepository.findById(taskId)
                .filter(task -> userId.equals(task.getUserId()))
                .orElse(null);
    }

    public record CommentRequest(Long userId, String body) {}
}
