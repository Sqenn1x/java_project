package com.example.jira_lite.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String status; // Например: TODO, IN_PROGRESS, IN_REVIEW, DONE

    @Column(name = "user_id")
    private Long userId; // Добавлено поле для связи с пользователем по ID

    @Column(name = "board_id")
    private Long boardId;

    @Column(name = "issue_type", length = 20)
    private String type = "TASK";

    @Column(length = 20)
    private String priority = "MEDIUM";

    @Column(name = "assignee_id")
    private Long assigneeId;

    @Column(name = "sprint_id")
    private Long sprintId;

    private LocalDate startDate;
    private LocalDate endDate;

    public Task() {}

    // Геттеры и сеттеры
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getBoardId() { return boardId; }
    public void setBoardId(Long boardId) { this.boardId = boardId; }

    public String getType() { return type == null ? "TASK" : type; }
    public void setType(String type) { this.type = type; }

    public String getPriority() { return priority == null ? "MEDIUM" : priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public Long getAssigneeId() { return assigneeId; }
    public void setAssigneeId(Long assigneeId) { this.assigneeId = assigneeId; }

    public Long getSprintId() { return sprintId; }
    public void setSprintId(Long sprintId) { this.sprintId = sprintId; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
}