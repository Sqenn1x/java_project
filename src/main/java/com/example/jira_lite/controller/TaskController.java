package com.example.jira_lite.controller;

import com.example.jira_lite.model.Task;
import com.example.jira_lite.Repository.BoardRepository;
import com.example.jira_lite.Repository.SprintRepository;
import com.example.jira_lite.Repository.TaskAttachmentRepository;
import com.example.jira_lite.Repository.TaskCommentRepository;
import com.example.jira_lite.Repository.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private static final Set<String> TYPES = Set.of("TASK", "STORY", "BUG", "EPIC", "SUBTASK");
    private static final Set<String> PRIORITIES = Set.of("LOW", "MEDIUM", "HIGH", "HIGHEST");

    private final TaskRepository taskRepository;
    private final BoardRepository boardRepository;
    private final SprintRepository sprintRepository;
    private final TaskCommentRepository commentRepository;
    private final TaskAttachmentRepository attachmentRepository;

    public TaskController(TaskRepository taskRepository, BoardRepository boardRepository,
                          SprintRepository sprintRepository, TaskCommentRepository commentRepository,
                          TaskAttachmentRepository attachmentRepository) {
        this.taskRepository = taskRepository;
        this.boardRepository = boardRepository;
        this.sprintRepository = sprintRepository;
        this.commentRepository = commentRepository;
        this.attachmentRepository = attachmentRepository;
    }

    // Получить задачи: если передан userId, возвращаем только его таски
    @GetMapping
    public List<Task> getTasks(@RequestParam(required = false) Long userId,
                               @RequestParam(required = false) Long boardId) {
        if (userId != null) {
            if (boardId != null) {
                return taskRepository.findByUserIdAndBoardId(userId, boardId);
            }
            return taskRepository.findByUserId(userId);
        }
        return List.of(); // Если ID не передан, не показываем чужие задачи
    }

    // Получить конкретную задачу по ID (нужно для переименования на фронтенде)
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskRepository.findById(id);
        return task.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Создать задачу с обязательной привязкой к пользователю
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        if (task.getUserId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        if (!isBoardOwnedBy(task.getBoardId(), task.getUserId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        normalizeIssueFields(task);
        if (!hasValidIssueFields(task, task.getUserId())) {
            return ResponseEntity.badRequest().build();
        }
        Task savedTask = taskRepository.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    // Обновить / переименовать задачу
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTitle(taskDetails.getTitle());
            task.setStatus(taskDetails.getStatus());
            task.setDescription(taskDetails.getDescription());
            task.setUserId(taskDetails.getUserId());
            task.setType(taskDetails.getType());
            task.setPriority(taskDetails.getPriority());
            task.setAssigneeId(taskDetails.getAssigneeId());
            task.setSprintId(taskDetails.getSprintId());
            task.setStartDate(taskDetails.getStartDate());
            task.setEndDate(taskDetails.getEndDate());
            if (taskDetails.getBoardId() != null) {
                task.setBoardId(taskDetails.getBoardId());
            }
            normalizeIssueFields(task);
            if (!isBoardOwnedBy(task.getBoardId(), task.getUserId())
                    || !hasValidIssueFields(task, task.getUserId())) {
                return ResponseEntity.badRequest().build();
            }

            Task updatedTask = taskRepository.save(task);
            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Удалить задачу
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (taskRepository.findById(id).isPresent()) {
            commentRepository.deleteAll(commentRepository.findByTaskIdOrderByCreatedAtAsc(id));
            attachmentRepository.deleteAll(attachmentRepository.findByTaskIdOrderByCreatedAtAsc(id));
            taskRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private boolean isBoardOwnedBy(Long boardId, Long userId) {
        return boardId == null || boardRepository.findById(boardId)
                .filter(board -> board.getUserId().equals(userId))
                .isPresent();
    }

    private void normalizeIssueFields(Task task) {
        task.setType(task.getType().toUpperCase(java.util.Locale.ROOT));
        task.setPriority(task.getPriority().toUpperCase(java.util.Locale.ROOT));
    }

    private boolean hasValidIssueFields(Task task, Long userId) {
        boolean validAssignee = task.getAssigneeId() == null || task.getAssigneeId().equals(userId);
        boolean validSprint = task.getSprintId() == null || sprintRepository.findById(task.getSprintId())
                .filter(sprint -> sprint.getBoardId().equals(task.getBoardId()))
                .isPresent();
        return userId != null && TYPES.contains(task.getType()) && PRIORITIES.contains(task.getPriority())
                && validAssignee && validSprint;
    }
}