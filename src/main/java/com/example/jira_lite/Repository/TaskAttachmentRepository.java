package com.example.jira_lite.Repository;

import com.example.jira_lite.model.TaskAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskAttachmentRepository extends JpaRepository<TaskAttachment, Long> {
    List<TaskAttachment> findByTaskIdOrderByCreatedAtAsc(Long taskId);
    Optional<TaskAttachment> findByIdAndTaskId(Long id, Long taskId);
}
