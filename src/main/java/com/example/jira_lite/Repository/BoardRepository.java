package com.example.jira_lite.Repository;

import com.example.jira_lite.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByUserIdOrderByIdAsc(Long userId);

    boolean existsByUserIdAndSpaceKey(Long userId, String spaceKey);
}
