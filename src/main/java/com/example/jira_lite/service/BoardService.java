package com.example.jira_lite.service;

import com.example.jira_lite.Repository.BoardRepository;
import com.example.jira_lite.Repository.TaskRepository;
import com.example.jira_lite.Repository.UserRepository;
import com.example.jira_lite.model.Board;
import com.example.jira_lite.model.Task;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class BoardService {

    private static final String DEFAULT_BOARD_NAME = "Tarkvara arendusmeetodid";
    private static final Set<String> SUPPORTED_TEMPLATES =
            Set.of("KANBAN", "SCRUM", "PERSONAL_PLANNER", "GENERAL_SERVICE_MANAGEMENT",
                    "DEVELOPMENT_REQUESTS", "PROJECT_MANAGEMENT");
    private static final Set<String> SUPPORTED_MANAGEMENT_TYPES =
            Set.of("TEAM_MANAGED", "PERSONAL");

    private final BoardRepository boardRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public BoardService(BoardRepository boardRepository, TaskRepository taskRepository,
                       UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public List<Board> getBoards(Long userId) {
        if (!userRepository.existsById(userId)) {
            return List.of();
        }

        List<Board> boards = boardRepository.findByUserIdOrderByIdAsc(userId);
        if (boards.isEmpty()) {
            boards = List.of(boardRepository.save(new Board(DEFAULT_BOARD_NAME, userId)));
        }

        Board defaultBoard = boards.getFirst();
        List<Task> unassignedTasks = taskRepository.findByUserIdAndBoardIdIsNull(userId);
        for (Task task : unassignedTasks) {
            task.setBoardId(defaultBoard.getId());
        }
        taskRepository.saveAll(unassignedTasks);
        return boards;
    }

    @Transactional
    public Board createBoard(Long userId, String name) {
        return createBoard(userId, name, "KANBAN");
    }

    @Transactional
    public Board createBoard(Long userId, String name, String templateKey) {
        return createBoard(userId, name, templateKey, null, "TEAM_MANAGED");
    }

    @Transactional
    public Board createBoard(Long userId, String name, String templateKey, String spaceKey, String managementType) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("Пользователь не найден.");
        }
        String normalizedTemplate = templateKey == null || templateKey.isBlank()
                ? "KANBAN"
                : templateKey.trim().toUpperCase(Locale.ROOT);
        if (!SUPPORTED_TEMPLATES.contains(normalizedTemplate)) {
            throw new IllegalArgumentException("Неизвестный шаблон пространства.");
        }
        String normalizedManagement = managementType == null || managementType.isBlank()
                ? "TEAM_MANAGED"
                : managementType.trim().toUpperCase(Locale.ROOT);
        if (!SUPPORTED_MANAGEMENT_TYPES.contains(normalizedManagement)) {
            throw new IllegalArgumentException("Неизвестный тип управления пространством.");
        }
        String normalizedKey = spaceKey == null || spaceKey.isBlank()
                ? generateSpaceKey(name, userId)
                : spaceKey.trim().toUpperCase(Locale.ROOT);
        if (!normalizedKey.matches("[A-Z][A-Z0-9]{1,9}")) {
            throw new IllegalArgumentException("Ключ должен содержать от 2 до 10 латинских букв и цифр и начинаться с буквы.");
        }
        if (boardRepository.existsByUserIdAndSpaceKey(userId, normalizedKey)) {
            throw new IllegalArgumentException("Этот ключ уже используется в другом пространстве.");
        }
        return boardRepository.save(new Board(name, userId, normalizedTemplate, normalizedKey, normalizedManagement));
    }

    public static boolean isSupportedTemplate(String templateKey) {
        return templateKey == null || templateKey.isBlank()
                || SUPPORTED_TEMPLATES.contains(templateKey.trim().toUpperCase(Locale.ROOT));
    }

    public static boolean isSupportedManagementType(String managementType) {
        return managementType == null || managementType.isBlank()
                || SUPPORTED_MANAGEMENT_TYPES.contains(managementType.trim().toUpperCase(Locale.ROOT));
    }

    private String generateSpaceKey(String name, Long userId) {
        String base = name.replaceAll("[^A-Za-z0-9]", "").toUpperCase(Locale.ROOT);
        if (base.isEmpty() || !Character.isLetter(base.charAt(0))) {
            base = "SPACE";
        }
        base = base.substring(0, Math.min(base.length(), 10));
        String candidate = base;
        int suffix = 2;
        while (boardRepository.existsByUserIdAndSpaceKey(userId, candidate)) {
            String suffixText = Integer.toString(suffix++);
            candidate = base.substring(0, Math.min(base.length(), 10 - suffixText.length())) + suffixText;
        }
        return candidate;
    }
}
