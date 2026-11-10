package com.example.jira_lite.service;

import com.example.jira_lite.Repository.BoardRepository;
import com.example.jira_lite.Repository.SprintRepository;
import com.example.jira_lite.model.Sprint;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SprintService {

    private final SprintRepository sprintRepository;
    private final BoardRepository boardRepository;

    public SprintService(SprintRepository sprintRepository, BoardRepository boardRepository) {
        this.sprintRepository = sprintRepository;
        this.boardRepository = boardRepository;
    }

    public Optional<List<Sprint>> getSprints(Long boardId, Long userId) {
        if (!isBoardOwnedBy(boardId, userId)) {
            return Optional.empty();
        }
        return Optional.of(sprintRepository.findByBoardIdOrderByIdAsc(boardId));
    }

    public Sprint createSprint(Long boardId, Long userId, Sprint sprint) {
        requireBoardOwner(boardId, userId);
        sprint.setBoardId(boardId);
        sprint.setStatus("PLANNED");
        return sprintRepository.save(sprint);
    }

    @Transactional
    public Sprint startSprint(Long boardId, Long sprintId, Long userId) {
        Sprint sprint = getOwnedSprint(boardId, sprintId, userId);
        if (!"PLANNED".equals(sprint.getStatus())) {
            throw new IllegalStateException("Можно запустить только запланированный спринт.");
        }
        if (sprintRepository.existsByBoardIdAndStatus(boardId, "ACTIVE")) {
            throw new IllegalStateException("На доске уже есть активный спринт.");
        }
        sprint.setStatus("ACTIVE");
        return sprintRepository.save(sprint);
    }

    @Transactional
    public Sprint completeSprint(Long boardId, Long sprintId, Long userId) {
        Sprint sprint = getOwnedSprint(boardId, sprintId, userId);
        if (!"ACTIVE".equals(sprint.getStatus())) {
            throw new IllegalStateException("Завершить можно только активный спринт.");
        }
        sprint.setStatus("COMPLETED");
        return sprintRepository.save(sprint);
    }

    private Sprint getOwnedSprint(Long boardId, Long sprintId, Long userId) {
        requireBoardOwner(boardId, userId);
        return sprintRepository.findById(sprintId)
                .filter(sprint -> sprint.getBoardId().equals(boardId))
                .orElseThrow(() -> new IllegalArgumentException("Спринт не найден."));
    }

    private void requireBoardOwner(Long boardId, Long userId) {
        if (!isBoardOwnedBy(boardId, userId)) {
            throw new IllegalArgumentException("Доска не найдена.");
        }
    }

    private boolean isBoardOwnedBy(Long boardId, Long userId) {
        return boardRepository.findById(boardId)
                .filter(board -> board.getUserId().equals(userId))
                .isPresent();
    }
}
