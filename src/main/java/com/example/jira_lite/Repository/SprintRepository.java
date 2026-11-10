package com.example.jira_lite.Repository;

import com.example.jira_lite.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SprintRepository extends JpaRepository<Sprint, Long> {
    List<Sprint> findByBoardIdOrderByIdAsc(Long boardId);
    boolean existsByBoardIdAndStatus(Long boardId, String status);
}
