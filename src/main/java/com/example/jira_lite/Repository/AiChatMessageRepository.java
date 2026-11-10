package com.example.jira_lite.Repository;

import com.example.jira_lite.model.AiChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AiChatMessageRepository extends JpaRepository<AiChatMessage, Long> {
    List<AiChatMessage> findTop40ByUserIdOrderByCreatedAtDescIdDesc(Long userId);
    List<AiChatMessage> findTop100ByUserIdOrderByCreatedAtDescIdDesc(Long userId);

    @Transactional
    void deleteByUserId(Long userId);
}
