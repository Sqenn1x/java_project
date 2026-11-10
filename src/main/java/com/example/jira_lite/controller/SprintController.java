package com.example.jira_lite.controller;

import com.example.jira_lite.model.Sprint;
import com.example.jira_lite.service.SprintService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/boards/{boardId}/sprints")
public class SprintController {

    private static final int MAX_NAME_LENGTH = 100;

    private final SprintService sprintService;

    public SprintController(SprintService sprintService) {
        this.sprintService = sprintService;
    }

    @GetMapping
    public ResponseEntity<?> getSprints(@PathVariable Long boardId, @RequestParam Long userId) {
        return sprintService.getSprints(boardId, userId)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createSprint(@PathVariable Long boardId, @RequestBody SprintRequest request) {
        if (request.userId() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Не указан userId."));
        }
        if (request.name() == null || request.name().trim().isEmpty()
                || request.name().trim().length() > MAX_NAME_LENGTH) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Название спринта должно содержать от 1 до 100 символов."));
        }
        if (request.startDate() != null && request.endDate() != null
                && request.endDate().isBefore(request.startDate())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Дата окончания не может быть раньше даты начала."));
        }

        Sprint sprint = new Sprint();
        sprint.setName(request.name().trim());
        sprint.setGoal(request.goal() == null || request.goal().isBlank() ? null : request.goal().trim());
        sprint.setStartDate(request.startDate());
        sprint.setEndDate(request.endDate());
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(sprintService.createSprint(boardId, request.userId(), sprint));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{sprintId}/start")
    public ResponseEntity<?> startSprint(@PathVariable Long boardId, @PathVariable Long sprintId,
                                         @RequestParam Long userId) {
        return updateSprint(() -> sprintService.startSprint(boardId, sprintId, userId));
    }

    @PostMapping("/{sprintId}/complete")
    public ResponseEntity<?> completeSprint(@PathVariable Long boardId, @PathVariable Long sprintId,
                                            @RequestParam Long userId) {
        return updateSprint(() -> sprintService.completeSprint(boardId, sprintId, userId));
    }

    private ResponseEntity<?> updateSprint(java.util.function.Supplier<Sprint> action) {
        try {
            return ResponseEntity.ok(action.get());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    public record SprintRequest(String name, String goal, java.time.LocalDate startDate,
                                java.time.LocalDate endDate, Long userId) {}
}
