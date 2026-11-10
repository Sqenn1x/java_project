package com.example.jira_lite.controller;

import com.example.jira_lite.Repository.BoardRepository;
import com.example.jira_lite.Repository.AiChatMessageRepository;
import com.example.jira_lite.Repository.TaskAttachmentRepository;
import com.example.jira_lite.Repository.TaskRepository;
import com.example.jira_lite.model.AiChatMessage;
import com.example.jira_lite.model.Board;
import com.example.jira_lite.model.Task;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
class AiControllerActionTests {

    @Autowired
    private AiController aiController;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskAttachmentRepository attachmentRepository;

    @Autowired
    private AiChatMessageRepository chatMessageRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createsBoardAndReturnsItForTheFrontendToSelect() throws Exception {
        Board currentBoard = boardRepository.save(new Board("Current", 41L));
        JsonNode command = objectMapper.readTree("""
                {"action":"CREATE_BOARD","name":"Mobile app"}
                """);

        var result = aiController.executeAction(command, "создай доску Mobile app", 41L, currentBoard.getId(),
                List.of(), List.of(currentBoard));

        Board created = boardRepository.findByUserIdOrderByIdAsc(41L).stream()
                .filter(board -> board.getName().equals("Mobile app"))
                .findFirst()
                .orElseThrow();
        assertThat(result.get("boardId")).isEqualTo(created.getId());
        assertThat(result.get("refreshBoards")).isEqualTo(true);
    }

    @Test
    void updatesTaskFieldsAndRejectsTasksOutsideTheCurrentBoard() throws Exception {
        Board board = boardRepository.save(new Board("Current", 42L));
        Task task = createTask(42L, board.getId(), "Old title");
        JsonNode command = objectMapper.readTree("""
                {"action":"UPDATE_TASK","taskId":%d,"title":"New title","priority":"HIGH","status":"IN_PROGRESS"}
                """.formatted(task.getId()));

        aiController.executeAction(command, "измени задачу", 42L, board.getId(),
                List.of(task), List.of(board));

        Task updated = taskRepository.findById(task.getId()).orElseThrow();
        assertThat(updated.getTitle()).isEqualTo("New title");
        assertThat(updated.getPriority()).isEqualTo("HIGH");
        assertThat(updated.getStatus()).isEqualTo("IN_PROGRESS");

        JsonNode outsideBoardCommand = objectMapper.readTree("""
                {"action":"UPDATE_TASK","taskId":%d,"title":"Tampered"}
                """.formatted(task.getId()));
        assertThatThrownBy(() -> aiController.executeAction(outsideBoardCommand, "измени задачу", 42L,
                board.getId(), List.of(), List.of(board)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("текущей доске");
    }

    @Test
    void accountActionsAreNotSupported() throws Exception {
        Board board = boardRepository.save(new Board("Current", 43L));
        JsonNode command = objectMapper.readTree("""
                {"action":"CHANGE_EMAIL","email":"other@example.com"}
                """);

        var result = aiController.executeAction(command, "измени email", 43L, board.getId(),
                List.of(), List.of(board));

        assertThat(result.get("message").toString()).contains("не поддерживается");
    }

    @Test
    void createsTextAttachmentsOnlyForTasksOnTheCurrentBoard() throws Exception {
        Board board = boardRepository.save(new Board("Current", 44L));
        Task task = createTask(44L, board.getId(), "Release checklist");
        JsonNode command = objectMapper.readTree("""
                {"action":"CREATE_TEXT_ATTACHMENT","taskId":%d,"fileName":"checklist.txt","content":"1. Test\\n2. Release"}
                """.formatted(task.getId()));

        aiController.executeAction(command, "создай файл с чек-листом", 44L, board.getId(),
                List.of(task), List.of(board));

        var attachment = attachmentRepository.findByTaskIdOrderByCreatedAtAsc(task.getId()).getFirst();
        assertThat(attachment.getOriginalName()).isEqualTo("checklist.txt");
        assertThat(new String(attachment.getContent(), java.nio.charset.StandardCharsets.UTF_8))
                .isEqualTo("1. Test\n2. Release");
    }

    @Test
    void persistsChatHistoryAndIncludesItInTheNextPrompt() throws Exception {
        AiChatMessage userMessage = saveMessage(44L, "user", "Создай задачу для релиза");
        AiChatMessage assistantMessage = saveMessage(44L, "assistant", "Создал задачу TA-22.");
        saveMessage(45L, "user", "Private conversation");

        @SuppressWarnings("unchecked")
        List<AiChatMessage> history =
                (List<AiChatMessage>) aiController.getChatHistory(44L).getBody();
        assertThat(history).extracting(AiChatMessage::getContent)
                .containsExactly(userMessage.getContent(), assistantMessage.getContent());

        var buildPrompt = AiController.class.getDeclaredMethod("buildAiPrompt", String.class, Long.class,
                List.class, List.class, List.class, List.class);
        buildPrompt.setAccessible(true);
        String prompt = (String) buildPrompt.invoke(aiController, "Добавь туда сроки", 1L,
                List.of(), List.of(), List.of(), history);
        assertThat(prompt).contains("Создай задачу для релиза", "Создал задачу TA-22.");
        assertThat(prompt).doesNotContain("Private conversation");

        aiController.clearChatHistory(44L);
        assertThat(chatMessageRepository.findTop100ByUserIdOrderByCreatedAtDescIdDesc(44L)).isEmpty();
        assertThat(chatMessageRepository.findTop100ByUserIdOrderByCreatedAtDescIdDesc(45L)).hasSize(1);
    }

    @Test
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    void clearsChatHistoryOutsideAnExistingTransaction() {
        saveMessage(4401L, "user", "Remove this conversation");
        saveMessage(4501L, "user", "Keep this conversation");

        aiController.clearChatHistory(4401L);

        assertThat(chatMessageRepository.findTop100ByUserIdOrderByCreatedAtDescIdDesc(4401L)).isEmpty();
        assertThat(chatMessageRepository.findTop100ByUserIdOrderByCreatedAtDescIdDesc(4501L)).hasSize(1);
    }

    private Task createTask(Long userId, Long boardId, String title) {
        Task task = new Task();
        task.setUserId(userId);
        task.setBoardId(boardId);
        task.setTitle(title);
        task.setStatus("TODO");
        return taskRepository.save(task);
    }

    private AiChatMessage saveMessage(Long userId, String role, String content) {
        AiChatMessage message = new AiChatMessage();
        message.setUserId(userId);
        message.setRole(role);
        message.setContent(content);
        return chatMessageRepository.save(message);
    }
}
