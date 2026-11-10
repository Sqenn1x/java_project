package com.example.jira_lite.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "boards")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String name;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "template_key", length = 40)
    private String templateKey = "KANBAN";

    @Column(name = "space_key", length = 10)
    private String spaceKey;

    @Column(name = "management_type", length = 20)
    private String managementType = "TEAM_MANAGED";

    public Board() {}

    public Board(String name, Long userId) {
        this(name, userId, "KANBAN");
    }

    public Board(String name, Long userId, String templateKey) {
        this(name, userId, templateKey, null, "TEAM_MANAGED");
    }

    public Board(String name, Long userId, String templateKey, String spaceKey, String managementType) {
        this.name = name;
        this.userId = userId;
        this.templateKey = templateKey;
        this.spaceKey = spaceKey;
        this.managementType = managementType;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTemplateKey() { return templateKey == null ? "KANBAN" : templateKey; }
    public void setTemplateKey(String templateKey) { this.templateKey = templateKey; }

    public String getSpaceKey() { return spaceKey; }
    public void setSpaceKey(String spaceKey) { this.spaceKey = spaceKey; }

    public String getManagementType() {
        return managementType == null ? "TEAM_MANAGED" : managementType;
    }
    public void setManagementType(String managementType) { this.managementType = managementType; }
}
