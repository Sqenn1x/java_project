package com.example.jira_lite;

import com.example.jira_lite.Repository.BoardRepository;
import com.example.jira_lite.Repository.TaskAttachmentRepository;
import com.example.jira_lite.Repository.TaskCommentRepository;
import com.example.jira_lite.Repository.TaskRepository;
import com.example.jira_lite.Repository.UserRepository;
import com.example.jira_lite.model.Board;
import com.example.jira_lite.model.Sprint;
import com.example.jira_lite.model.Task;
import com.example.jira_lite.model.TaskAttachment;
import com.example.jira_lite.model.TaskComment;
import com.example.jira_lite.entity.User;
import com.example.jira_lite.service.BoardService;
import com.example.jira_lite.service.SprintService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DataJpaTest
@Import({BoardService.class, SprintService.class})
class BoardServiceTests {

    @Autowired
    private BoardService boardService;

    @Autowired
    private SprintService sprintService;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskCommentRepository commentRepository;

    @Autowired
    private TaskAttachmentRepository attachmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void createsDefaultBoardAndAssignsExistingTasks() {
        User user = userRepository.save(new User("Denis", "denis@example.com"));
        Task task = new Task();
        task.setTitle("Existing task");
        task.setStatus("TODO");
        task.setUserId(user.getId());
        task = taskRepository.save(task);

        List<Board> boards = boardService.getBoards(user.getId());

        assertThat(boards).hasSize(1);
        assertThat(boards.getFirst().getName()).isEqualTo("Tarkvara arendusmeetodid");
        assertThat(taskRepository.findById(task.getId()).orElseThrow().getBoardId())
                .isEqualTo(boards.getFirst().getId());
    }

    @Test
    void returnsExistingBoardsWithoutCreatingDuplicates() {
        User user = userRepository.save(new User("Denis", "denis@example.com"));
        Board first = boardRepository.save(new Board("Team", user.getId()));
        Board second = boardService.createBoard(user.getId(), "Personal", "PERSONAL_PLANNER", "PERS", "PERSONAL");

        List<Board> boards = boardService.getBoards(user.getId());

        assertThat(boards).extracting(Board::getId).containsExactly(first.getId(), second.getId());
        assertThat(boards.get(1).getTemplateKey()).isEqualTo("PERSONAL_PLANNER");
        assertThat(boards.get(1).getSpaceKey()).isEqualTo("PERS");
        assertThat(boards.get(1).getManagementType()).isEqualTo("PERSONAL");
    }

    @Test
    void rejectsUnsupportedSpaceTemplates() {
        User user = userRepository.save(new User("Denis", "denis@example.com"));

        assertThatThrownBy(() -> boardService.createBoard(user.getId(), "Invalid", "UNKNOWN"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("шаблон");
    }

    @Test
    void createsBoardsForAllSupportedTemplates() {
        User user = userRepository.save(new User("Denis", "denis@example.com"));
        List<String> templateKeys = List.of(
                "PERSONAL_PLANNER",
                "GENERAL_SERVICE_MANAGEMENT",
                "DEVELOPMENT_REQUESTS",
                "KANBAN",
                "PROJECT_MANAGEMENT",
                "SCRUM"
        );

        List<Board> createdBoards = templateKeys.stream()
                .map(templateKey -> boardService.createBoard(user.getId(), templateKey, templateKey))
                .toList();

        assertThat(createdBoards).extracting(Board::getTemplateKey).containsExactlyElementsOf(templateKeys);
    }

    @Test
    void generatesUniqueSpaceKeysWhenNoneAreProvided() {
        User user = userRepository.save(new User("Denis", "denis@example.com"));

        Board first = boardService.createBoard(user.getId(), "My Space", "KANBAN");
        Board second = boardService.createBoard(user.getId(), "My Space", "SCRUM");

        assertThat(first.getSpaceKey()).isEqualTo("MYSPACE");
        assertThat(second.getSpaceKey()).isEqualTo("MYSPACE2");
    }

    @Test
    void filtersTasksByBoard() {
        User user = userRepository.save(new User("Denis", "denis@example.com"));
        Board firstBoard = boardRepository.save(new Board("Team", user.getId()));
        Board secondBoard = boardRepository.save(new Board("Personal", user.getId()));
        Task firstTask = createTask(user.getId(), firstBoard.getId(), "Team task");
        createTask(user.getId(), secondBoard.getId(), "Personal task");

        assertThat(taskRepository.findByUserIdAndBoardId(user.getId(), firstBoard.getId()))
                .extracting(Task::getId)
                .containsExactly(firstTask.getId());
    }

    @Test
    void completingSprintKeepsItsTasksAssigned() {
        User user = userRepository.save(new User("Denis", "denis@example.com"));
        Board board = boardRepository.save(new Board("Team", user.getId()));
        Sprint sprint = new Sprint();
        sprint.setName("Sprint 1");
        sprint = sprintService.createSprint(board.getId(), user.getId(), sprint);
        Task task = createTask(user.getId(), board.getId(), "Sprint task");
        task.setSprintId(sprint.getId());
        taskRepository.save(task);

        sprintService.startSprint(board.getId(), sprint.getId(), user.getId());
        Sprint completed = sprintService.completeSprint(board.getId(), sprint.getId(), user.getId());

        assertThat(completed.getStatus()).isEqualTo("COMPLETED");
        assertThat(taskRepository.findById(task.getId()).orElseThrow().getSprintId()).isEqualTo(sprint.getId());
    }

    @Test
    void allowsOnlyOneActiveSprintPerBoard() {
        User user = userRepository.save(new User("Denis", "denis@example.com"));
        Board board = boardRepository.save(new Board("Team", user.getId()));
        Sprint first = createSprint(board.getId(), user.getId(), "Sprint 1");
        Sprint second = createSprint(board.getId(), user.getId(), "Sprint 2");
        sprintService.startSprint(board.getId(), first.getId(), user.getId());

        assertThatThrownBy(() -> sprintService.startSprint(board.getId(), second.getId(), user.getId()))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("активный спринт");
    }

    @Test
    void persistsIssueCommentsAndAttachmentContent() {
        User user = userRepository.save(new User("Denis", "denis@example.com"));
        Board board = boardRepository.save(new Board("Team", user.getId()));
        Task task = createTask(user.getId(), board.getId(), "Bug report");
        task.setType("BUG");
        task.setPriority("HIGH");
        task.setAssigneeId(user.getId());
        task = taskRepository.save(task);

        TaskComment comment = new TaskComment();
        comment.setTaskId(task.getId());
        comment.setUserId(user.getId());
        comment.setBody("Steps to reproduce");
        commentRepository.save(comment);

        byte[] fileContent = {1, 2, 3, 4};
        TaskAttachment attachment = new TaskAttachment();
        attachment.setTaskId(task.getId());
        attachment.setUserId(user.getId());
        attachment.setOriginalName("screenshot.png");
        attachment.setStorageKey(java.util.UUID.randomUUID().toString());
        attachment.setSize(fileContent.length);
        attachment.setContent(fileContent);
        attachmentRepository.save(attachment);

        Task storedTask = taskRepository.findById(task.getId()).orElseThrow();
        TaskAttachment storedAttachment = attachmentRepository.findById(attachment.getId()).orElseThrow();
        assertThat(storedTask.getType()).isEqualTo("BUG");
        assertThat(storedTask.getPriority()).isEqualTo("HIGH");
        assertThat(commentRepository.findByTaskIdOrderByCreatedAtAsc(task.getId()))
                .extracting(TaskComment::getBody)
                .containsExactly("Steps to reproduce");
        assertThat(storedAttachment.getContent()).containsExactly(fileContent);
    }

    private Task createTask(Long userId, Long boardId, String title) {
        Task task = new Task();
        task.setTitle(title);
        task.setStatus("TODO");
        task.setUserId(userId);
        task.setBoardId(boardId);
        return taskRepository.save(task);
    }

    private Sprint createSprint(Long boardId, Long userId, String name) {
        Sprint sprint = new Sprint();
        sprint.setName(name);
        return sprintService.createSprint(boardId, userId, sprint);
    }
}
