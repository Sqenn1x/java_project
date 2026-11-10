package com.example.jira_lite.controller;

import com.example.jira_lite.model.Board;
import com.example.jira_lite.service.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private static final int MAX_NAME_LENGTH = 80;

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping
    public ResponseEntity<?> getBoards(@RequestParam Long userId) {
        List<Board> boards = boardService.getBoards(userId);
        if (boards.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Пользователь не найден."));
        }
        return ResponseEntity.ok(boards);
    }

    @PostMapping
    public ResponseEntity<?> createBoard(@RequestBody BoardRequest request) {
        if (request.userId() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Не указан userId."));
        }
        if (request.name() == null || request.name().trim().isEmpty()
                || request.name().trim().length() > MAX_NAME_LENGTH) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Название пространства должно содержать от 1 до 80 символов."));
        }
        if (!BoardService.isSupportedTemplate(request.templateKey())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Неизвестный шаблон пространства."));
        }
        if (!BoardService.isSupportedManagementType(request.managementType())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Неизвестный тип управления пространством."));
        }

        try {
            Board board = boardService.createBoard(request.userId(), request.name().trim(), request.templateKey(),
                    request.spaceKey(), request.managementType());
            return ResponseEntity.status(HttpStatus.CREATED).body(board);
        } catch (IllegalArgumentException e) {
            HttpStatus status = "Пользователь не найден.".equals(e.getMessage())
                    ? HttpStatus.NOT_FOUND
                    : HttpStatus.BAD_REQUEST;
            return ResponseEntity.status(status).body(Map.of("error", e.getMessage()));
        }
    }

    public record BoardRequest(Long userId, String name, String templateKey, String spaceKey, String managementType) {}
}
