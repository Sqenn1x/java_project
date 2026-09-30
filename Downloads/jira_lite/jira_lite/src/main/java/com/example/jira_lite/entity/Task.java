package com.example.jira_lite.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tasks")
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    // Статус задачи (например: TODO, IN_PROGRESS, DONE)
    @Column(nullable = false)
    private String status = "TODO";

    // Связь с пользователем (много задач могут принадлежать одному пользователю)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User assignee;
}