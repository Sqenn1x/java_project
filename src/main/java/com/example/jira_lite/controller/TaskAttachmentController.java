package com.example.jira_lite.controller;

import com.example.jira_lite.Repository.TaskAttachmentRepository;
import com.example.jira_lite.Repository.TaskRepository;
import com.example.jira_lite.model.Task;
import com.example.jira_lite.model.TaskAttachment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks/{taskId}/attachments")
public class TaskAttachmentController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TaskAttachmentController.class);
    private static final long MAX_ATTACHMENT_SIZE = 10L * 1024 * 1024;

    private final TaskRepository taskRepository;
    private final TaskAttachmentRepository attachmentRepository;

    public TaskAttachmentController(TaskRepository taskRepository,
                                    TaskAttachmentRepository attachmentRepository) {
        this.taskRepository = taskRepository;
        this.attachmentRepository = attachmentRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAttachments(@PathVariable Long taskId, @RequestParam Long userId) {
        if (findOwnedTask(taskId, userId) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(attachmentRepository.findByTaskIdOrderByCreatedAtAsc(taskId));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadAttachment(@PathVariable Long taskId, @RequestParam Long userId,
                                              @RequestParam("file") MultipartFile file) {
        if (findOwnedTask(taskId, userId) == null) {
            return ResponseEntity.notFound().build();
        }
        if (file.isEmpty() || file.getSize() > MAX_ATTACHMENT_SIZE) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Размер файла должен быть от 1 байта до 10 МБ."));
        }

        try {
            TaskAttachment attachment = new TaskAttachment();
            attachment.setTaskId(taskId);
            attachment.setUserId(userId);
            attachment.setOriginalName(safeFilename(file.getOriginalFilename()));
            String contentType = file.getContentType();
            attachment.setContentType(contentType != null && contentType.length() <= 150 ? contentType : null);
            attachment.setSize(file.getSize());
            attachment.setStorageKey(java.util.UUID.randomUUID().toString());
            attachment.setContent(file.getBytes());
            return ResponseEntity.status(HttpStatus.CREATED).body(attachmentRepository.save(attachment));
        } catch (IOException e) {
            LOGGER.error("Could not read uploaded attachment for task {}", taskId, e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Не удалось прочитать загруженный файл."));
        }
    }

    @GetMapping("/{attachmentId}")
    public ResponseEntity<?> downloadAttachment(@PathVariable Long taskId, @PathVariable Long attachmentId,
                                                @RequestParam Long userId) {
        if (findOwnedTask(taskId, userId) == null) {
            return ResponseEntity.notFound().build();
        }
        return attachmentRepository.findByIdAndTaskId(attachmentId, taskId)
                .<ResponseEntity<?>>map(attachment -> ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment()
                                .filename(attachment.getOriginalName(), StandardCharsets.UTF_8).build().toString())
                        .body(attachment.getContent()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{attachmentId}")
    public ResponseEntity<Void> deleteAttachment(@PathVariable Long taskId, @PathVariable Long attachmentId,
                                                 @RequestParam Long userId) {
        if (findOwnedTask(taskId, userId) == null) {
            return ResponseEntity.notFound().build();
        }
        return attachmentRepository.findByIdAndTaskId(attachmentId, taskId)
                .map(attachment -> {
                    attachmentRepository.delete(attachment);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private Task findOwnedTask(Long taskId, Long userId) {
        return taskRepository.findById(taskId)
                .filter(task -> userId.equals(task.getUserId()))
                .orElse(null);
    }

    private String safeFilename(String filename) {
        String normalized = filename == null ? "attachment" : filename.replace('\\', '/');
        String safe = normalized.substring(normalized.lastIndexOf('/') + 1).trim();
        if (safe.isEmpty()) {
            return "attachment";
        }
        return safe.length() > 255 ? safe.substring(safe.length() - 255) : safe;
    }
}
