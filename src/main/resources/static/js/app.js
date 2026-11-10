        // ---------- State ----------
        const API_TASKS = '/api/tasks';
        const API_BOARDS = '/api/boards';
        const API_USERS = '/api/users';
        const API_AI = '/api/ai/command';
        const API_AI_HISTORY = '/api/ai/history';
        const API_SPRINTS = '/api/boards';
        const TASK_TYPE_LABELS = {
            TASK: 'Задача',
            STORY: 'История',
            BUG: 'Ошибка',
            EPIC: 'Эпик',
            SUBTASK: 'Подзадача'
        };
        const PRIORITY_LABELS = {
            LOW: 'Низкий',
            MEDIUM: 'Средний',
            HIGH: 'Высокий',
            HIGHEST: 'Критический'
        };
        const STATUSES = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];
        const STATUS_LABELS = {
            TODO: 'К выполнению',
            IN_PROGRESS: 'В работе',
            IN_REVIEW: 'На ревью',
            DONE: 'Готово'
        };
        const ENGLISH_LABELS = {
            'Избранное': 'Favorites',
            'Мои пространства': 'My spaces',
            'Новое пространство': 'New space',
            'Создать пространство': 'Create space',
            'Название пространства': 'Space name',
            'Kanban': 'Kanban',
            'Scrum': 'Scrum',
            'Personal task planner': 'Personal task planner',
            'Визуализируйте работу по колонкам и перемещайте задачи по этапам.': 'Visualize work in columns and move issues through stages.',
            'Планируйте работу в backlog и создавайте спринты для команды.': 'Plan work in a backlog and create team sprints.',
            'Организуйте личные задачи, сроки и приоритеты в отдельном пространстве.': 'Organize personal tasks, due dates, and priorities in a separate space.',
            'General service management': 'General service management',
            'Управление услугами': 'Service management',
            'Объедините обращения клиентов и сотрудников в единый поток поддержки.': 'Bring customer and employee requests into a single support workflow.',
            'Поддержка и обработка обращений': 'Support and request handling',
            'Development requests': 'Development requests',
            'Запросы на разработку': 'Development requests',
            'Отслеживайте функции, ошибки и инциденты, связанные с продуктом.': 'Track product features, bugs, and incidents.',
            'Фичи, баги и инциденты': 'Features, bugs, and incidents',
            'Project management': 'Project management',
            'Управление проектами': 'Project management',
            'Планируйте, структурируйте и выполняйте классические бизнес-проекты.': 'Plan, structure, and deliver traditional business projects.',
            'Планирование и выполнение проектов': 'Project planning and delivery',
            'Очередь': 'Queues',
            'Отчёты': 'Reports',
            'Запросы': 'Service requests',
            'Новые обращения': 'New requests',
            'В обработке': 'In progress',
            'В разработке': 'In development',
            'Новая функция': 'New feature',
            'Исправить ошибку': 'Fix a bug',
            'Завершено': 'Done',
            'Определить этапы проекта': 'Define project phases',
            'Подготовить план': 'Prepare a plan',
            'Назовите пространство': 'Name your space',
            'Назад к доске': 'Back to board',
            'Проверьте пространство': 'Review your space',
            'Обязательные поля отмечены звёздочкой': 'Required fields are marked with an asterisk',
            'Как управляется пространство': 'How your space is managed',
            'Командное пространство': 'Team-managed space',
            'Личное пространство': 'Personal space',
            'Доступ: пространство доступно только вашему аккаунту.': 'Access: this space is available only to your account.',
            'Ключ': 'Key',
            '2–10 латинских букв или цифр; начинается с буквы.': '2–10 letters or numbers; must start with a letter.',
            'Шаблон': 'Template',
            'Выбрать другой': 'Choose another',
            'Доска с колонками': 'Board with columns',
            'Личные задачи и приоритеты': 'Personal tasks and priorities',
            'Назад': 'Back',
            'Далее': 'Next',
            'Шаг 1 из 2': 'Step 1 of 2',
            'Шаг 2 из 2': 'Step 2 of 2',
            'Название пространства будет видно в навигации и в заголовке.': 'Your space name appears in navigation and the page header.',
            'Управление': 'Management',
            'Пространство будет создано отдельно от остальных. Его задачи и настройки можно будет менять после создания.': 'This space is separate from the others. You can change its tasks and settings after it is created.',
            'Предпросмотр пространства': 'Space preview',
            'Название пространства': 'Space name',
            'Командное пространство /': 'Team-managed space /',
            'Список': 'List',
            'Доска': 'Board',
            'Таймлайн': 'Timeline',
            'Календарь': 'Calendar',
            'В ожидании': 'To do',
            'Выбрано для спринта': 'Selected for sprint',
            'Сегодня': 'Today',
            'Подготовить макеты': 'Prepare mockups',
            'Проверить интеграцию': 'Check integration',
            'Запланировать задачи': 'Plan tasks',
            'Введите корректный ключ пространства.': 'Enter a valid space key.',
            'Ключ должен содержать от 2 до 10 латинских букв и цифр и начинаться с буквы.': 'The key must contain 2–10 Latin letters or digits and start with a letter.',
            'Этот ключ уже используется в другом пространстве.': 'This key is already used by another space.',
            'Неизвестный шаблон пространства.': 'Unknown space template.',
            'Шаблон: Kanban': 'Template: Kanban',
            'Шаблон: Scrum': 'Template: Scrum',
            'Шаблон: Personal task planner': 'Template: Personal task planner',
            'Шаблон: General service management': 'Template: General service management',
            'Шаблон: Development requests': 'Template: Development requests',
            'Шаблон: Project management': 'Template: Project management',
            'Действия пространства': 'Space actions',
            'Поделиться пространством': 'Share space',
            'Быстро создать задачу': 'Quickly create an issue',
            'Открыть ИИ-чат': 'Open AI chat',
            'Развернуть доску': 'Expand board',
            'Свернуть доску': 'Exit full screen',
            'Компактный режим': 'Compact mode',
            'Дополнительные действия': 'More actions',
            'Создать задачу': 'Create issue',
            'Экспортировать задачи': 'Export issues',
            'Ссылка на пространство скопирована': 'Space link copied',
            'Не удалось скопировать ссылку.': 'Could not copy the link.',
            'Не удалось развернуть доску.': 'Could not enter full screen.',
            'Автоматизация': 'Automation',
            'Создавайте правила, которые автоматически выполняют действия с задачами при смене статуса.': 'Create rules that automatically take action on issues when their status changes.',
            'Создать автоматизацию': 'Create automation',
            'Управление автоматизациями': 'Manage automations',
            'Журнал аудита': 'Audit log',
            'Автоматизации с помощью ИИ': 'Automation with AI',
            'Опишите задачу ассистенту, чтобы получить помощь с управлением проектом.': 'Describe a task to the assistant for help managing your project.',
            'Спросить ИИ': 'Try AI',
            'Выберите событие и действие для задач в этом пространстве.': 'Choose an event and action for issues in this space.',
            'Когда задача перейдёт в статус': 'When an issue transitions to',
            'Выполнить действие': 'Then perform this action',
            'Изменить приоритет': 'Change priority',
            'Назначить на меня': 'Assign to me',
            'Новый приоритет': 'New priority',
            'Изменить приоритет на': 'change priority to',
            'Сохранить правило': 'Save rule',
            'Включено': 'Enabled',
            'Выключено': 'Disabled',
            'Выключить': 'Disable',
            'Включить': 'Enable',
            'Автоматизация создана': 'Automation created',
            'Автоматизация выполнила действие': 'Automation performed an action',
            'Автоматизация выполнила действий:': 'Automation performed actions:',
            'Правило включено': 'Rule enabled',
            'Когда задача перейдёт в статус': 'When an issue transitions to',
            'назначить на меня': 'assign to me',
            'изменить приоритет на': 'change priority to',
            'Пространство': 'Space',
            'Сохранить правило': 'Save rule',
            'Создать автоматизацию': 'Create automation',
            'Закрыть': 'Close',
            'Отмена': 'Cancel',
            'Удалить': 'Delete',
            'Ошибка автоматизации': 'Automation error',
            'Не удалось сохранить правило автоматизации.': 'Could not save the automation rule.',
            'Не удалось прочитать данные автоматизации.': 'Could not read automation data.',
            'Не удалось сохранить данные автоматизации.': 'Could not save automation data.',
            'Действие выполнено.': 'Action completed.',
            'Изменения не требуются.': 'No changes were needed.',
            'Успешно': 'Success',
            'Ошибка автоматизации': 'Automation error',
            'Неизвестный тип действия.': 'Unknown action type.',
            'Не удалось применить действие.': 'Could not apply the action.',
            'Не удалось применить действие автоматизации.': 'Could not apply the automation action.',
            'Действие автоматизации': 'Automation action',
            'Выбрать доску': 'Select a board',
            'Название': 'Name',
            'Например, Мобильное приложение': 'For example, Mobile app',
            'Backlog и спринты': 'Backlog and sprints',
            'Backlog': 'Backlog',
            'Спринты': 'Sprints',
            'Создать спринт': 'Create sprint',
            'Новый спринт': 'New sprint',
            'Например, Спринт 1': 'For example, Sprint 1',
            'Цель': 'Goal',
            'Старт': 'Start',
            'Завершить': 'Complete',
            'Запланирован': 'Planned',
            'Активен': 'Active',
            'Завершён': 'Completed',
            'Запланировано': 'Planned',
            'Тип задачи': 'Issue type',
            'Приоритет': 'Priority',
            'История': 'Story',
            'Ошибка': 'Bug',
            'Эпик': 'Epic',
            'Подзадача': 'Sub-task',
            'Низкий': 'Low',
            'Средний': 'Medium',
            'Высокий': 'High',
            'Критический': 'Highest',
            'Не назначено': 'Unassigned',
            'Исполнитель': 'Assignee',
            'Спринт': 'Sprint',
            'Комментарии': 'Comments',
            'Напишите комментарий': 'Write a comment',
            'Отправить': 'Send',
            'Вложения (до 10 МБ)': 'Attachments (up to 10 MB)',
            'Выбрать файл': 'Choose file',
            'Нет комментариев': 'No comments yet.',
            'Вложений пока нет': 'No attachments yet.',
            'Backlog пуст': 'Backlog is empty.',
            'Спринтов пока нет': 'No sprints yet.',
            'Цель спринта': 'Sprint goal',
            'Задач в спринте': 'Sprint issues',
            'Введите название спринта.': 'Enter a sprint name.',
            'Не удалось создать спринт. Попробуйте ещё раз.': 'Could not create the sprint. Please try again.',
            'Спринт создан': 'Sprint created',
            'Спринт запущен': 'Sprint started',
            'Спринт завершён': 'Sprint completed',
            'Не удалось загрузить спринты.': 'Could not load sprints.',
            'Не удалось изменить состояние спринта.': 'Could not update sprint status.',
            'Не удалось загрузить комментарии и вложения.': 'Could not load comments and attachments.',
            'Не удалось добавить комментарий.': 'Could not add comment.',
            'Файл прикреплён': 'File attached',
            'Размер файла не должен превышать 10 МБ.': 'File size must not exceed 10 MB.',
            'Не удалось прикрепить файл.': 'Could not attach the file.',
            'Не удалось удалить вложение.': 'Could not delete the attachment.',
            'Введите название пространства.': 'Enter a space name.',
            'Не удалось создать доску. Попробуйте ещё раз.': 'Could not create the space. Please try again.',
            'Пространство создано': 'Space created',
            'Не удалось загрузить доски.': 'Could not load boards.',
            'Для вас': 'For you',
            'Инструменты': 'Tools',
            'Назначено мне': 'Assigned to me',
            'Вся работа': 'All work',
            'Инциденты': 'Incidents',
            'База знаний': 'Knowledge Base',
            'Пространства': 'Spaces',
            'Поиск работы': 'Search work',
            'Фильтр': 'Filter',
            'Группировать': 'Group',
            'Статус': 'Status',
            'Тип работы': 'Work type',
            'Все статусы': 'All statuses',
            'Все типы': 'All types',
            'Задачи': 'Tasks',
            'Истории': 'Stories',
            'Ошибки': 'Bugs',
            'Эпики': 'Epics',
            'Здесь пока нет рабочих элементов': 'There are no work items here yet',
            'Нет подходящих элементов или они не соответствуют текущим фильтрам.': 'You either do not have any work items or they do not match your current filters.',
            'Работа': 'Work',
            'Владелец': 'Owner',
            'Автор': 'Reporter',
            'Решение': 'Resolution',
            'Создано': 'Created',
            'Обновлено': 'Updated',
            'Выбрать всю работу': 'Select all work',
            'Недавняя активность': 'Recent activity',
            'Документация': 'Documentation',
            'Документы': 'Documents',
            'Git-репозиторий': 'Git repository',
            'Сводка': 'Summary',
            'Список': 'List',
            'Доска': 'Board',
            'Таймлайн': 'Timeline',
            'Разработка': 'Development',
            'Формы': 'Forms',
            'Спросите ИИ: «Создай задачу по дизайну» или «Перекинь TA-3 в Done»': 'Ask AI: “Create a design task” or “Move TA-3 to Done”',
            'ИИ: создай доску, измени задачу, запусти спринт или добавь комментарий': 'AI: create a board, update an issue, start a sprint, or add a comment',
            'Чат с ИИ': 'AI chat',
            'Очистить историю': 'Clear chat history',
            'Закрыть чат': 'Close chat',
            'Открыть чат с ИИ': 'Open AI chat',
            'Спросите или попросите изменить задачи...': 'Ask a question or request a task update...',
            'Enter — отправить · Shift+Enter — новая строка': 'Enter to send · Shift+Enter for a new line',
            'История сохраняется между входами. Enter — отправить · Shift+Enter — новая строка': 'Chat history is saved between sessions. Enter to send · Shift+Enter for a new line',
            'История чата очищена.': 'Chat history cleared.',
            'Не удалось загрузить историю чата.': 'Could not load chat history.',
            'Не удалось очистить историю чата.': 'Could not clear chat history.',
            'Здравствуйте! Я могу помочь с досками, задачами и спринтами.': 'Hello! I can help with boards, issues, and sprints.',
            'Очистить историю чата?': 'Clear chat history?',
            'История переписки с ИИ будет удалена.': 'Your conversation with AI will be deleted.',
            'Очистить': 'Clear',
            'Опишите действие: создайте или переименуйте доску, измените задачу, запустите спринт или добавьте комментарий.': 'Describe an action: create or rename a board, update an issue, start a sprint, or add a comment.',
            'Спросить ИИ': 'Ask AI',
            'Поиск задач...': 'Search tasks...',
            'Поиск по доске...': 'Search this board...',
            'Создать': 'Create',
            'Все': 'All',
            'Все задачи проекта в одной таблице. Нажмите на карандаш, чтобы изменить задачу или поставить сроки.': 'All project tasks in one table. Select the pencil to edit a task or set its dates.',
            'Ключ': 'Key',
            'Название': 'Title',
            'Статус': 'Status',
            'Начало': 'Start',
            'Окончание': 'Due date',
            'Исполнитель': 'Assignee',
            'Список задач': 'Task list',
            'Сроки задач по календарю. Нажмите на полосу, чтобы изменить даты, или на «Добавить даты» у задачи без сроков.': 'Task dates on a calendar. Select a bar to edit dates, or add dates to an unscheduled task.',
            'Сегодня': 'Today',
            'Разработка и Git': 'Development and Git',
            'Связанные ветки репозитория и коммиты вашего проекта.': 'Related repository branches and project commits.',
            'Ветка': 'Branch',
            'Задача': 'Task',
            'Последний коммит': 'Latest commit',
            'Форма отчёта об ошибке': 'Bug report form',
            'Отправленная форма создаёт задачу в колонке «К выполнению».': 'Submitting this form creates a task in the To do column.',
            'Описание ошибки': 'Bug description',
            'Что пошло не так?': 'What went wrong?',
            'Шаги воспроизведения': 'Steps to reproduce',
            'Опишите шаги, которые привели к ошибке.': 'Describe the steps that led to the issue.',
            'Необязательно': 'Optional',
            'Отправить': 'Submit',
            'Документация': 'Documentation',
            'Архитектура проекта': 'Project architecture',
            'Проект построен на Spring Boot, JPA и MySQL, фронтенд на чистом JavaScript с REST API.': 'Built with Spring Boot, JPA and MySQL, with a JavaScript frontend and REST API.',
            'Задачи привязаны к пользователю по': 'Tasks are associated with a user by',
            'Kanban-доска с перетаскиванием карточек.': 'Kanban board with draggable cards.',
            'Таймлайн со сроками начала и окончания задач.': 'Timeline with task start and due dates.',
            'ИИ-ассистент управляет задачами текстовыми командами.': 'Manage tasks with natural-language commands using the AI assistant.',
            'Что происходит в проекте прямо сейчас.': 'What is happening in the project right now.',
            'Всего задач': 'Total tasks',
            'В работе': 'In progress',
            'Готово': 'Done',
            'Дата начала': 'Start date',
            'Дата окончания': 'Due date',
            'Дизайн главной страницы': 'Homepage design',
            'Подключить базу данных': 'Connect the database',
            'Ревью API': 'Review the API',
            'Создать задачу': 'Create task',
            'Просрочено': 'Overdue',
            'Распределение по статусам': 'Tasks by status',
            'К выполнению': 'To do',
            'На ревью': 'In review',
            'Вся работа над проектом на одной доске': 'All your project work on one board',
            'Двигайте задачи между колонками, планируйте сроки на таймлайне и управляйте доской обычными словами через ИИ.': 'Move tasks between columns, plan dates on the timeline, and manage the board with natural-language AI commands.',
            'Вход': 'Sign in',
            'Регистрация': 'Register',
            'С возвращением': 'Welcome back',
            'Создайте аккаунт': 'Create your account',
            'Войдите по email, чтобы открыть свои задачи.': 'Sign in with your email to view your tasks.',
            'Придумайте ник и укажите email, чтобы вести свои задачи.': 'Choose a name and enter your email to manage your tasks.',
            'Никнейм': 'Username',
            'Войти': 'Sign in',
            'Создать аккаунт': 'Create account',
            'Пароль не нужен: аккаунт определяется по email.': 'No password needed: your account is linked to your email.',
            'Сменить тему': 'Switch theme',
            'Настройки интерфейса': 'Interface settings',
            'Язык': 'Language',
            'Компактный режим': 'Compact mode',
            'Экспортировать задачи': 'Export tasks',
            'Экспорт CSV': 'Export CSV',
            'Сохранить задачи в CSV для электронных таблиц': 'Save tasks as a spreadsheet-friendly CSV file.',
            '/ поиск · N новая задача · Esc закрыть': '/ search · N new task · Esc close',
            'Сменить ник': 'Change username',
            'Выйти': 'Sign out',
            'Новая задача': 'New task',
            'Сохранить': 'Save',
            'Описание': 'Description',
            'Название': 'Title',
            'Что нужно сделать?': 'What needs to be done?',
            'Статус': 'Status',
            'На ревью': 'In review',
            'Удалить': 'Delete',
            'Отмена': 'Cancel',
            'Подтвердите действие': 'Confirm action',
            'Подтвердить': 'Confirm',
            'Перетащите задачу сюда': 'Drag a task here',
            'Задач пока нет. Нажмите «Создать», чтобы добавить первую.': 'No tasks yet. Select “Create” to add your first task.',
            'Задач пока нет. Создайте задачу и поставьте ей сроки.': 'No tasks yet. Create a task and add dates to see it here.',
            'Изменить': 'Edit',
            'Добавить даты': 'Add dates',
            'с ': 'from ',
            'до ': 'until ',
            'Введите никнейм.': 'Enter a username.',
            'Введите корректный email.': 'Enter a valid email address.',
            'Аккаунт с таким email не найден. Зарегистрируйтесь.': 'No account found for this email. Please register.',
            'Этот email уже зарегистрирован. Войдите.': 'This email is already registered. Please sign in.',
            'Не получилось. Проверьте данные и попробуйте ещё раз.': 'Something went wrong. Check your details and try again.',
            'Сервер недоступен. Попробуйте позже.': 'Server unavailable. Please try again later.',
            'Новый ник:': 'New username:',
            'Выйти из аккаунта?': 'Sign out of your account?',
            'Вы сможете войти снова по email.': 'You can sign in again using your email.',
            'Задача': 'Task',
            'Введите название задачи.': 'Enter a task title.',
            'Дата окончания не может быть раньше даты начала.': 'The due date cannot be earlier than the start date.',
            'Задача сохранена': 'Task saved',
            'Задача создана': 'Task created',
            'Не удалось сохранить задачу. Попробуйте ещё раз.': 'Could not save the task. Please try again.',
            'Удалить задачу?': 'Delete this task?',
            ' будет удалена без возможности восстановления.': ' will be permanently deleted.',
            'Задача удалена': 'Task deleted',
            'Не удалось удалить задачу.': 'Could not delete the task.',
            'ИИ думает...': 'AI is thinking...',
            'Готово.': 'Done.',
            'Ошибка запроса к ИИ.': 'AI request failed.',
            'Опишите ошибку.': 'Describe the issue.',
            'Баг: ': 'Bug: ',
            'Отчёт отправлен, задача создана': 'Report submitted and task created',
            'Не удалось отправить форму.': 'Could not submit the form.'
        };
        const RUSSIAN_LABELS = Object.fromEntries(Object.entries(ENGLISH_LABELS).map(([ru, en]) => [en, ru]));

        const $ = id => document.getElementById(id);
        let currentLocale = localStorage.getItem('jira_locale') === 'en' ? 'en' : 'ru';
        let currentUser = readStoredUser();
        let boards = [];
        let currentBoardId = null;
        let selectedSpaceTemplate = 'KANBAN';
        let spaceWizardStep = 1;
        let spaceKeyTouched = false;
        let developmentWorkGroupByStatus = false;
        let developmentWorkAssignedToMe = false;
        const SPACE_TEMPLATES = {
            KANBAN: {
                name: 'Kanban',
                icon: 'fa-table-columns',
                description: 'Визуализируйте работу по колонкам и перемещайте задачи по этапам.',
                tabs: ['Список', 'Доска', 'Таймлайн', 'Календарь'],
                columns: [
                    {name: 'К выполнению', task: 'Подготовить макеты'},
                    {name: 'В работе', task: 'Проверить интеграцию'},
                    {name: 'Готово', task: null}
                ],
                page: 'board'
            },
            SCRUM: {
                name: 'Scrum',
                icon: 'fa-layer-group',
                description: 'Планируйте работу в backlog и создавайте спринты для команды.',
                tabs: ['Backlog', 'Доска', 'Спринты'],
                columns: [
                    {name: 'Backlog', task: 'Подготовить макеты'},
                    {name: 'Выбрано для спринта', task: 'Запланировать задачи'},
                    {name: 'Готово', task: null}
                ],
                page: 'backlog'
            },
            PERSONAL_PLANNER: {
                name: 'Personal task planner',
                icon: 'fa-list-check',
                description: 'Организуйте личные задачи, сроки и приоритеты в отдельном пространстве.',
                tabs: ['Список', 'Доска', 'Календарь'],
                columns: [
                    {name: 'К выполнению', task: 'Запланировать задачи'},
                    {name: 'Сегодня', task: 'Проверить интеграцию'},
                    {name: 'Готово', task: null}
                ],
                page: 'list'
            },
            GENERAL_SERVICE_MANAGEMENT: {
                name: 'General service management',
                icon: 'fa-headset',
                description: 'Объедините обращения клиентов и сотрудников в единый поток поддержки.',
                tabs: ['Очередь', 'Доска', 'Отчёты'],
                columns: [
                    {name: 'Новые обращения', task: 'Запрос клиента'},
                    {name: 'В обработке', task: 'Проверить проблему'},
                    {name: 'Решено', task: null}
                ],
                page: 'list'
            },
            DEVELOPMENT_REQUESTS: {
                name: 'Development requests',
                icon: 'fa-code',
                description: 'Отслеживайте функции, ошибки и инциденты, связанные с продуктом.',
                tabs: ['Запросы', 'Доска', 'Отчёты'],
                columns: [
                    {name: 'К выполнению', task: 'Новая функция'},
                    {name: 'В разработке', task: 'Исправить ошибку'},
                    {name: 'Готово', task: null}
                ],
                page: 'board'
            },
            PROJECT_MANAGEMENT: {
                name: 'Project management',
                icon: 'fa-diagram-project',
                description: 'Планируйте, структурируйте и выполняйте классические бизнес-проекты.',
                tabs: ['Список', 'Доска', 'Таймлайн', 'Календарь'],
                columns: [
                    {name: 'Запланировано', task: 'Определить этапы проекта'},
                    {name: 'В работе', task: 'Подготовить план'},
                    {name: 'Завершено', task: null}
                ],
                page: 'board'
            }
        };
        let sprints = [];
        let allTasks = [];
        let activeStatusFilter = 'ALL';
        let editingId = null;
        let authMode = 'login';
        let confirmResolve = null;
        let landedId = null;
        const seenCards = new Set();

        function readStoredUser() {
            try {
                return JSON.parse(localStorage.getItem('jira_user')) || null;
            } catch (e) {
                return null;
            }
        }

        function el(tag, cls, text) {
            const n = document.createElement(tag);
            if (cls) n.className = cls;
            if (text != null) n.textContent = localizeText(text);
            return n;
        }

        function localizeText(value) {
            const text = String(value);
            const labels = currentLocale === 'en' ? ENGLISH_LABELS : RUSSIAN_LABELS;
            const trimmed = text.trim();
            if (!Object.prototype.hasOwnProperty.call(labels, trimmed)) return text;
            const leading = text.match(/^\s*/)[0];
            const trailing = text.match(/\s*$/)[0];
            return leading + labels[trimmed] + trailing;
        }

        function applyLocale(root = document.body) {
            document.documentElement.lang = currentLocale;
            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) {
                if (!node.parentElement.closest('script, style')) node.nodeValue = localizeText(node.nodeValue);
            }
            root.querySelectorAll('[placeholder], [title], [aria-label]').forEach(element => {
                ['placeholder', 'title', 'aria-label'].forEach(attribute => {
                    if (element.hasAttribute(attribute)) element.setAttribute(attribute, localizeText(element.getAttribute(attribute)));
                });
            });
        }

        function setLocale(locale) {
            if (locale !== 'ru' && locale !== 'en') return;
            currentLocale = locale;
            localStorage.setItem('jira_locale', locale);
            $('localeSelect').value = locale;
            applyLocale();
            applyFilters();
            if ($('boardModal').classList.contains('open')) updateSpacePreview();
        }

        function setCompactMode(enabled) {
            document.body.classList.toggle('compact-mode', enabled);
            $('compactToggle').checked = enabled;
            localStorage.setItem('jira_compact', String(enabled));
            const densityButton = $('boardDensityButton');
            if (densityButton) densityButton.setAttribute('aria-pressed', String(enabled));
        }

        function toggleBoardDensity() {
            setCompactMode(!document.body.classList.contains('compact-mode'));
        }

        function toggleBoardActionMenu(event) {
            event.stopPropagation();
            const menu = $('boardActionMenu');
            const open = menu.hidden;
            menu.hidden = !open;
            $('boardMoreButton').setAttribute('aria-expanded', String(open));
        }

        function closeBoardActionMenu() {
            const menu = $('boardActionMenu');
            if (!menu) return;
            menu.hidden = true;
            $('boardMoreButton').setAttribute('aria-expanded', 'false');
        }

        function automationStorageKey(kind) {
            return `jira_automation_${kind}_${currentUser.id}_${currentBoardId}`;
        }

        function toggleAutomationPopover(event) {
            event.stopPropagation();
            const popover = $('automationPopover');
            const open = popover.hidden;
            popover.hidden = !open;
            $('automationButton').setAttribute('aria-expanded', String(open));
        }

        function closeAutomationPopover() {
            const popover = $('automationPopover');
            if (!popover) return;
            popover.hidden = true;
            $('automationButton').setAttribute('aria-expanded', 'false');
        }

        function loadAutomationStorage(kind) {
            if (!currentUser || currentBoardId == null) return [];
            try {
                const value = JSON.parse(localStorage.getItem(automationStorageKey(kind)) || '[]');
                if (!Array.isArray(value)) throw new Error('Stored automation data is not a list');
                return value;
            } catch (err) {
                console.error(err);
                showToast('Не удалось прочитать данные автоматизации.', 'error');
                return [];
            }
        }

        function saveAutomationStorage(kind, entries) {
            if (!currentUser || currentBoardId == null) return false;
            try {
                localStorage.setItem(automationStorageKey(kind), JSON.stringify(entries));
                return true;
            } catch (err) {
                console.error(err);
                showToast('Не удалось сохранить данные автоматизации.', 'error');
                return false;
            }
        }

        function openAutomationCreate() {
            closeAutomationPopover();
            if (!currentUser || currentBoardId == null) return showAuth();
            $('automation-create-error').textContent = '';
            $('automation-trigger-status').value = 'DONE';
            $('automation-action-type').value = 'SET_PRIORITY';
            $('automation-action-priority').value = 'HIGH';
            updateAutomationActionField();
            openModal('automationCreateModal');
            applyLocale($('automationCreateModal'));
        }

        function updateAutomationActionField() {
            $('automation-priority-field').hidden = $('automation-action-type').value !== 'SET_PRIORITY';
        }

        function createAutomationRule() {
            const actionType = $('automation-action-type').value;
            const rule = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                triggerStatus: $('automation-trigger-status').value,
                actionType,
                priority: actionType === 'SET_PRIORITY' ? $('automation-action-priority').value : null,
                enabled: true,
                createdAt: new Date().toISOString()
            };
            const rules = loadAutomationStorage('rules');
            rules.push(rule);
            if (!saveAutomationStorage('rules', rules)) {
                $('automation-create-error').textContent = localizeText('Не удалось сохранить правило автоматизации.');
                return;
            }
            closeModal('automationCreateModal');
            showToast('Автоматизация создана');
        }

        function automationRuleDescription(rule) {
            const trigger = STATUS_LABELS[rule.triggerStatus] || rule.triggerStatus;
            if (rule.actionType === 'ASSIGN_TO_ME') {
                return `${localizeText('Когда задача перейдёт в статус')} «${localizeText(trigger)}» — ${localizeText('назначить на меня')}.`;
            }
            const priority = PRIORITY_LABELS[rule.priority] || rule.priority;
            return `${localizeText('Когда задача перейдёт в статус')} «${localizeText(trigger)}» — ${localizeText('изменить приоритет на')} «${localizeText(priority)}».`;
        }

        function openAutomationManage() {
            closeAutomationPopover();
            if (!currentUser || currentBoardId == null) return showAuth();
            const host = $('automationRuleList');
            host.replaceChildren();
            const rules = loadAutomationStorage('rules');
            if (!rules.length) {
                host.appendChild(el('p', 'empty-note', 'Пока нет правил автоматизации.'));
            }
            rules.forEach(rule => {
                const row = el('div', 'automation-rule-item');
                const info = el('div');
                info.append(
                    el('strong', null, rule.enabled ? 'Включено' : 'Выключено'),
                    el('span', null, automationRuleDescription(rule))
                );
                const controls = el('div');
                controls.style.display = 'flex';
                controls.style.gap = '6px';
                const toggle = el('button', 'board-icon-action');
                toggle.type = 'button';
                toggle.title = localizeText(rule.enabled ? 'Выключить' : 'Включить');
                toggle.setAttribute('aria-label', toggle.title);
                toggle.innerHTML = `<i class="fa-solid ${rule.enabled ? 'fa-pause' : 'fa-play'}"></i>`;
                toggle.addEventListener('click', () => setAutomationRuleEnabled(rule.id, !rule.enabled));
                const remove = el('button', 'board-icon-action');
                remove.type = 'button';
                remove.title = localizeText('Удалить');
                remove.setAttribute('aria-label', remove.title);
                remove.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
                remove.addEventListener('click', () => deleteAutomationRule(rule.id));
                controls.append(toggle, remove);
                row.append(info, controls);
                host.appendChild(row);
            });
            openModal('automationManageModal');
            applyLocale($('automationManageModal'));
        }

        function setAutomationRuleEnabled(ruleId, enabled) {
            const rules = loadAutomationStorage('rules').map(rule =>
                rule.id === ruleId ? {...rule, enabled} : rule
            );
            if (!saveAutomationStorage('rules', rules)) return;
            openAutomationManage();
        }

        function deleteAutomationRule(ruleId) {
            const rules = loadAutomationStorage('rules').filter(rule => rule.id !== ruleId);
            if (!saveAutomationStorage('rules', rules)) return;
            openAutomationManage();
        }

        function openAutomationAudit() {
            closeAutomationPopover();
            if (!currentUser || currentBoardId == null) return showAuth();
            const host = $('automationAuditList');
            host.replaceChildren();
            const entries = loadAutomationStorage('audit').slice().reverse();
            if (!entries.length) {
                host.appendChild(el('p', 'empty-note', 'Журнал автоматизации пока пуст.'));
            }
            entries.forEach(entry => {
                const row = el('div', 'automation-audit-item');
                const time = new Date(entry.timestamp);
                const timeLabel = Number.isNaN(time.getTime())
                    ? entry.timestamp
                    : time.toLocaleString(currentLocale === 'en' ? 'en-US' : 'ru-RU');
                row.append(
                    el('strong', null, `TA-${Number(entry.taskId)} · ${localizeText(entry.success ? 'Успешно' : 'Ошибка автоматизации')}`),
                    el('span', null, `${entry.ruleDescription} · ${timeLabel}`),
                    entry.error ? el('span', null, entry.error) : el('span', null, entry.result)
                );
                host.appendChild(row);
            });
            openModal('automationAuditModal');
            applyLocale($('automationAuditModal'));
        }

        function writeAutomationAudit(entry) {
            const entries = loadAutomationStorage('audit');
            entries.push({...entry, timestamp: new Date().toISOString()});
            saveAutomationStorage('audit', entries.slice(-100));
        }

        async function runAutomationRules(task, previousStatus, newStatus) {
            const rules = loadAutomationStorage('rules').filter(rule =>
                rule.enabled && STATUSES.includes(rule.triggerStatus) &&
                rule.triggerStatus === newStatus && previousStatus !== newStatus
            );
            let completed = 0;
            let failed = 0;
            for (const rule of rules) {
                const description = automationRuleDescription(rule);
                const updatedTask = {...task};
                if (rule.actionType === 'SET_PRIORITY' && Object.hasOwn(PRIORITY_LABELS, rule.priority)) {
                    updatedTask.priority = rule.priority;
                }
                else if (rule.actionType === 'ASSIGN_TO_ME') updatedTask.assigneeId = currentUser.id;
                else {
                    writeAutomationAudit({
                        taskId: task.id,
                        ruleDescription: description,
                        success: false,
                        error: 'Неизвестный тип действия.'
                    });
                    failed++;
                    continue;
                }

                if (updatedTask.priority === task.priority && updatedTask.assigneeId === task.assigneeId) {
                    writeAutomationAudit({
                        taskId: task.id,
                        ruleDescription: description,
                        success: true,
                        result: 'Изменения не требуются.'
                    });
                    continue;
                }

                try {
                    const response = await fetch(`${API_TASKS}/${task.id}`, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(updatedTask)
                    });
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    Object.assign(task, updatedTask);
                    writeAutomationAudit({
                        taskId: task.id,
                        ruleDescription: description,
                        success: true,
                        result: 'Действие выполнено.'
                    });
                    completed++;
                } catch (err) {
                    console.error(err);
                    writeAutomationAudit({
                        taskId: task.id,
                        ruleDescription: description,
                        success: false,
                        error: 'Не удалось применить действие.'
                    });
                    failed++;
                }
            }
            if (completed) {
                await loadTasks();
                showToast(completed === 1
                    ? 'Автоматизация выполнила действие'
                    : `${localizeText('Автоматизация выполнила действий:')} ${completed}`);
            }
            if (failed) showToast('Не удалось применить действие автоматизации.', 'error');
        }

        async function shareCurrentBoard() {
            if (currentBoardId == null) return;
            const url = new URL(window.location.href);
            url.searchParams.set('boardId', String(currentBoardId));
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(url.toString());
                } else {
                    const input = document.createElement('textarea');
                    input.value = url.toString();
                    input.style.position = 'fixed';
                    input.style.opacity = '0';
                    document.body.appendChild(input);
                    input.select();
                    const copied = document.execCommand('copy');
                    input.remove();
                    if (!copied) throw new Error('Clipboard copy was rejected');
                }
                showToast('Ссылка на пространство скопирована');
            } catch (err) {
                console.error(err);
                showToast('Не удалось скопировать ссылку.', 'error');
            }
        }

        async function toggleBoardFullscreen() {
            const workspace = document.querySelector('.workspace');
            if (!workspace) return;
            try {
                if (document.fullscreenElement === workspace) {
                    await document.exitFullscreen();
                } else if (document.fullscreenElement) {
                    await document.exitFullscreen();
                    await workspace.requestFullscreen();
                } else {
                    await workspace.requestFullscreen();
                }
            } catch (err) {
                console.error(err);
                showToast('Не удалось развернуть доску.', 'error');
            }
        }

        function syncBoardFullscreenButton() {
            const button = $('boardFullscreenButton');
            const workspace = document.querySelector('.workspace');
            if (!button || !workspace) return;
            const expanded = document.fullscreenElement === workspace;
            button.title = localizeText(expanded ? 'Свернуть доску' : 'Развернуть доску');
            button.setAttribute('aria-label', button.title);
            button.innerHTML = `<i class="fa-solid ${expanded ? 'fa-down-left-and-up-right-to-center' : 'fa-up-right-and-down-left-from-center'}"></i>`;
        }

        function togglePreferences(event) {
            event.stopPropagation();
            $('profileMenu').classList.remove('open');
            $('prefsMenu').classList.toggle('open');
        }

        function exportTasks() {
            if (!allTasks.length) {
                showToast(currentLocale === 'en' ? 'There are no tasks to export.' : 'Нет задач для экспорта.', 'error');
                return;
            }
            const headers = [currentLocale === 'en' ? 'Key' : 'Ключ', currentLocale === 'en' ? 'Title' : 'Название',
                currentLocale === 'en' ? 'Description' : 'Описание', currentLocale === 'en' ? 'Type' : 'Тип',
                currentLocale === 'en' ? 'Priority' : 'Приоритет', currentLocale === 'en' ? 'Assignee' : 'Исполнитель',
                currentLocale === 'en' ? 'Sprint' : 'Спринт', currentLocale === 'en' ? 'Status' : 'Статус',
                currentLocale === 'en' ? 'Start date' : 'Дата начала', currentLocale === 'en' ? 'Due date' : 'Дата окончания'];
            const rows = allTasks.map(task => [
                `TA-${task.id}`, task.title, task.description || '',
                localizeText(TASK_TYPE_LABELS[task.type] || TASK_TYPE_LABELS.TASK),
                localizeText(PRIORITY_LABELS[task.priority] || PRIORITY_LABELS.MEDIUM),
                task.assigneeId ? currentUser.username : '',
                sprints.find(sprint => sprint.id === task.sprintId)?.name || '',
                localizeText(STATUS_LABELS[task.status] || task.status),
                task.startDate || '', task.endDate || ''
            ]);
            const escapeCell = value => {
                let cell = String(value ?? '');
                if (/^[=+\-@]/.test(cell)) cell = "'" + cell;
                return `"${cell.replace(/"/g, '""')}"`;
            };
            const csv = [headers, ...rows].map(row => row.map(escapeCell).join(',')).join('\r\n');
            const url = URL.createObjectURL(new Blob(['\uFEFF' + csv], {type: 'text/csv;charset=utf-8'}));
            const link = el('a');
            link.href = url;
            link.download = 'jira-lite-tasks.csv';
            link.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            showToast(currentLocale === 'en' ? 'Tasks exported.' : 'Задачи экспортированы.');
        }

        // ---------- Dates ----------
        function parseDate(s) {
            if (!s) return null;
            const [y, m, d] = String(s).slice(0, 10).split('-').map(Number);
            return new Date(y, m - 1, d);
        }

        function startOfDay(d) {
            return new Date(d.getFullYear(), d.getMonth(), d.getDate());
        }

        function addDays(d, n) {
            return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
        }

        function daysBetween(a, b) {
            return Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 86400000);
        }

        function fmtShort(d) {
            return d.toLocaleDateString(currentLocale === 'en' ? 'en-US' : 'ru-RU', {
                day: 'numeric',
                month: 'short'
            }).replace(/\.$/, '');
        }

        function taskSpan(t) {
            let s = parseDate(t.startDate),
                e = parseDate(t.endDate);
            if (!s && !e) return null;
            s = s || e;
            e = e || s;
            if (e < s)[s, e] = [e, s];
            return {
                start: s,
                end: e
            };
        }

        function dateLabel(t) {
            const s = parseDate(t.startDate),
                e = parseDate(t.endDate);
            if (s && e) return `${fmtShort(s)} – ${fmtShort(e)}`;
            if (s) return `${currentLocale === 'en' ? 'from' : 'с'} ${fmtShort(s)}`;
            if (e) return `${currentLocale === 'en' ? 'until' : 'до'} ${fmtShort(e)}`;
            return '';
        }

        function isOverdue(t) {
            const e = parseDate(t.endDate);
            return !!e && e < startOfDay(new Date()) && t.status !== 'DONE';
        }

        // ---------- Toasts ----------
        function showToast(message, type = 'info') {
            const toast = el('div', 'toast' + (type === 'error' ? ' error' : ''));
            const icon = el('i', type === 'error' ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-circle-check');
            toast.append(icon, el('span', null, message));
            applyLocale(toast);
            $('toasts').appendChild(toast);
            setTimeout(() => {
                toast.classList.add('out');
                toast.addEventListener('animationend', () => toast.remove(), {
                    once: true
                });
            }, 3200);
        }

        // ---------- Theme ----------
        function applyTheme(theme) {
            document.documentElement.dataset.theme = theme;
            $('themeBtn').innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        }

        function toggleTheme() {
            const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            try {
                localStorage.setItem('jira_theme', next);
            } catch (e) { /* ignore */ }
        }
        (function initTheme() {
            let saved = null;
            try {
                saved = localStorage.getItem('jira_theme');
            } catch (e) { /* ignore */ }
            document.documentElement.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        })();

        // ---------- Modals ----------
        function openModal(id) {
            $(id).classList.add('open');
        }

        function closeModal(id) {
            $(id).classList.remove('open');
        }

        function confirmDialog({
            title,
            text,
            ok = 'Подтвердить',
            danger = false
        }) {
            $('cf-title').textContent = title;
            $('cf-text').textContent = text;
            const btn = $('cf-ok');
            btn.textContent = ok;
            btn.className = 'btn ' + (danger ? 'btn-danger' : 'btn-primary');
            openModal('confirmModal');
            return new Promise(resolve => {
                confirmResolve = resolve;
            });
        }

        function resolveConfirm(value) {
            closeModal('confirmModal');
            if (confirmResolve) {
                confirmResolve(value);
                confirmResolve = null;
            }
        }

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                if ($('confirmModal').classList.contains('open')) resolveConfirm(false);
                else if ($('automationCreateModal').classList.contains('open')) closeModal('automationCreateModal');
                else if ($('automationManageModal').classList.contains('open')) closeModal('automationManageModal');
                else if ($('automationAuditModal').classList.contains('open')) closeModal('automationAuditModal');
                else if ($('taskModal').classList.contains('open')) closeModal('taskModal');
                else if ($('boardModal').classList.contains('open')) closeModal('boardModal');
                else if ($('sprintModal').classList.contains('open')) closeModal('sprintModal');
                closeAutomationPopover();
                closeBoardActionMenu();
                $('profileMenu').classList.remove('open');
                $('prefsMenu').classList.remove('open');
                return;
            }
            const target = e.target;
            const isTyping = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
            if (!currentUser || isTyping || e.ctrlKey || e.metaKey || e.altKey ||
                $('taskModal').classList.contains('open') || $('boardModal').classList.contains('open') ||
                $('sprintModal').classList.contains('open') || $('confirmModal').classList.contains('open') ||
                $('automationCreateModal').classList.contains('open') || $('automationManageModal').classList.contains('open') ||
                $('automationAuditModal').classList.contains('open')) return;
            if (e.key === '/') {
                e.preventDefault();
                $('searchInput').focus();
            } else if (e.key.toLowerCase() === 'n') {
                openTaskModal();
            }
        });

        // ---------- Init ----------
        document.addEventListener('DOMContentLoaded', () => {
            applyTheme(document.documentElement.dataset.theme);
            $('localeSelect').value = currentLocale;
            setCompactMode(localStorage.getItem('jira_compact') === 'true');
            applyLocale();
            syncBoardFullscreenButton();
            if (currentUser) {
                updateUserAvatar();
                loadBoards();
            } else {
                showAuth();
            }
            moveIndicator();
            if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);
            window.addEventListener('resize', () => {
                moveIndicator();
            });
        });

        // ---------- Auth ----------
        function showAuth() {
            $('authError').textContent = '';
            setAuthMode('login');
            $('authScreen').classList.remove('hidden');
            setTimeout(() => $('auth-email').focus(), 300);
        }

        function setAuthMode(mode) {
            authMode = mode;
            const isRegister = mode === 'register';
            $('authCard').classList.toggle('register', isRegister);
            $('segLogin').classList.toggle('on', !isRegister);
            $('segRegister').classList.toggle('on', isRegister);
            $('authTitle').textContent = isRegister ? 'Создайте аккаунт' : 'С возвращением';
            $('authSub').textContent = isRegister ?
                'Придумайте ник и укажите email, чтобы вести свои задачи.' :
                'Войдите по email, чтобы открыть свои задачи.';
            $('authSubmit').textContent = isRegister ? 'Создать аккаунт' : 'Войти';
            $('authError').textContent = '';
            applyLocale($('authScreen'));
        }

        async function submitAuth() {
            const username = $('auth-username').value.trim();
            const email = $('auth-email').value.trim();
            const errorBox = $('authError');
            const button = $('authSubmit');

            if (authMode === 'register' && !username) {
                errorBox.textContent = localizeText('Введите никнейм.');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errorBox.textContent = localizeText('Введите корректный email.');
                return;
            }

            errorBox.textContent = '';
            button.disabled = true;
            try {
                const res = await fetch(`${API_USERS}/${authMode}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(authMode === 'register' ? {
                        username,
                        email
                    } : {
                        email
                    })
                });
                if (res.status === 404) {
                    errorBox.textContent = localizeText('Аккаунт с таким email не найден. Зарегистрируйтесь.');
                    return;
                }
                if (res.status === 409) {
                    errorBox.textContent = localizeText('Этот email уже зарегистрирован. Войдите.');
                    return;
                }
                if (!res.ok) {
                    errorBox.textContent = localizeText('Не получилось. Проверьте данные и попробуйте ещё раз.');
                    return;
                }

                currentUser = await res.json();
                localStorage.setItem('jira_user', JSON.stringify(currentUser));
                $('authScreen').classList.add('hidden');
                updateUserAvatar();
                await loadBoards();
                showToast(currentLocale === 'en' ? `Welcome, ${currentUser.username}!` : `Добро пожаловать, ${currentUser.username}!`);
            } catch (err) {
                console.error(err);
                errorBox.textContent = localizeText('Сервер недоступен. Попробуйте позже.');
            } finally {
                button.disabled = false;
            }
        }

        // ---------- Profile ----------
        function toggleProfileMenu(event) {
            event.stopPropagation();
            const menu = $('profileMenu');
            if (currentUser) {
                $('menu-username').textContent = currentUser.username;
                $('menu-email').textContent = currentUser.email;
            }
            menu.classList.toggle('open');
        }

        function changeUsername() {
            if (!currentUser) return;
            const newName = prompt(localizeText('Новый ник:'), currentUser.username);
            if (!newName || !newName.trim()) return;
            currentUser.username = newName.trim();
            localStorage.setItem('jira_user', JSON.stringify(currentUser));
            updateUserAvatar();
            applyFilters();
            $('menu-username').textContent = currentUser.username;
            $('profileMenu').classList.remove('open');
        }

        async function logout() {
            $('profileMenu').classList.remove('open');
            const ok = await confirmDialog({
                title: localizeText('Выйти из аккаунта?'),
                text: localizeText('Вы сможете войти снова по email.'),
                ok: localizeText('Выйти')
            });
            if (!ok) return;
            localStorage.removeItem('jira_user');
            currentUser = null;
            boards = [];
            currentBoardId = null;
            sprints = [];
            allTasks = [];
            $('aiChat').classList.remove('open');
            $('aiMessages').replaceChildren();
            seenCards.clear();
            $('boardsList').replaceChildren();
            $('boardSelect').replaceChildren();
            $('avatar').textContent = '?';
            applyFilters();
            $('auth-username').value = '';
            $('auth-email').value = '';
            showAuth();
        }

        function updateUserAvatar() {
            if (currentUser && currentUser.username) $('avatar').textContent = currentUser.username.charAt(0).toUpperCase();
        }

        window.addEventListener('click', () => $('profileMenu').classList.remove('open'));
        window.addEventListener('click', () => $('prefsMenu').classList.remove('open'));
        window.addEventListener('click', closeBoardActionMenu);
        window.addEventListener('click', closeAutomationPopover);
        document.addEventListener('fullscreenchange', syncBoardFullscreenButton);

        // ---------- Navigation ----------
        function switchPage(tabName) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
            document.querySelectorAll('.side-link[data-page]').forEach(a => a.classList.toggle('active', a.dataset.page === tabName));
            document.querySelectorAll('.development-space-navigation [data-work-filter]').forEach(link => {
                link.classList.toggle('active', tabName === 'list'
                    && $('developmentWorkStatusFilter').value === link.dataset.workFilter
                    && $('developmentWorkTypeFilter').value === 'ALL');
            });
            document.querySelectorAll('.development-space-navigation [data-work-type]').forEach(link => {
                link.classList.toggle('active', tabName === 'list'
                    && $('developmentWorkTypeFilter').value === link.dataset.workType);
            });
            const page = $(`page-${tabName}`);
            if (page) page.classList.add('active');
            if (tabName === 'list') renderDevelopmentWork(getFilteredTasks());
            moveIndicator();
            applyFilters();
            if (tabName === 'timeline') renderTimeline(true);
        }

        function moveIndicator() {
            const btn = document.querySelector('.tab.active');
            const ind = $('tabIndicator');
            if (!btn || !ind) return;
            ind.style.width = btn.offsetWidth + 'px';
            ind.style.transform = `translateX(${btn.offsetLeft}px)`;
        }

        // ---------- Data ----------
        async function loadBoards() {
            if (!currentUser) return;
            try {
                const res = await fetch(`${API_BOARDS}?userId=${encodeURIComponent(currentUser.id)}`);
                if (!res.ok) throw new Error('HTTP ' + res.status);
                boards = await res.json();
                const requestedBoardId = new URLSearchParams(window.location.search).get('boardId');
                const savedBoardId = localStorage.getItem(`jira_board_${currentUser.id}`);
                const selectedBoard = boards.find(board => String(board.id) === requestedBoardId)
                    || boards.find(board => String(board.id) === savedBoardId);
                currentBoardId = selectedBoard ? selectedBoard.id : boards[0].id;
                updateBoardUrl(currentBoardId);
                renderBoardNavigation();
                await Promise.all([loadTasks(), loadSprints()]);
                if (selectedBoard?.templateKey === 'DEVELOPMENT_REQUESTS') switchPage('list');
            } catch (err) {
                console.error(err);
                showToast('Не удалось загрузить доски.', 'error');
            }
        }

        function renderBoardNavigation() {
            const select = $('boardSelect');
            select.replaceChildren();
            const list = $('boardsList');
            list.replaceChildren();

            boards.forEach(board => {
                const option = document.createElement('option');
                option.value = board.id;
                option.textContent = board.name;
                select.appendChild(option);

                const link = el('button', 'side-link board-link');
                link.type = 'button';
                link.classList.toggle('active', board.id === currentBoardId);
                link.appendChild(el('span', 'proj-icon', board.name.charAt(0).toUpperCase()));
                link.appendChild(el('span', null, board.name));
                link.addEventListener('click', () => selectBoard(board.id));
                list.appendChild(link);
            });

            select.value = String(currentBoardId);
            const selectedBoard = boards.find(board => board.id === currentBoardId);
            $('boardIcon').textContent = selectedBoard ? selectedBoard.name.charAt(0).toUpperCase() : 'T';
            document.body.classList.toggle('development-requests-space', selectedBoard?.templateKey === 'DEVELOPMENT_REQUESTS');
            $('developmentWorkSpaceName').textContent = selectedBoard?.name || 'Development requests';
            const templateName = SPACE_TEMPLATES[selectedBoard?.templateKey || 'KANBAN']?.name || SPACE_TEMPLATES.KANBAN.name;
            $('spaceTemplateBadge').textContent = localizeText(`Шаблон: ${templateName}`);
        }

        async function selectBoard(boardId) {
            const board = boards.find(item => String(item.id) === String(boardId));
            if (!board || board.id === currentBoardId) return;
            currentBoardId = board.id;
            localStorage.setItem(`jira_board_${currentUser.id}`, String(currentBoardId));
            updateBoardUrl(currentBoardId);
            renderBoardNavigation();
            sprints = [];
            await Promise.all([loadTasks(), loadSprints()]);
            switchPage(board.templateKey === 'DEVELOPMENT_REQUESTS' ? 'list' : 'board');
        }

        function updateBoardUrl(boardId) {
            const url = new URL(window.location.href);
            url.searchParams.set('boardId', String(boardId));
            window.history.replaceState({}, '', url);
        }

        function openBoardModal() {
            if (!currentUser) return showAuth();
            $('board-name').value = '';
            $('board-error').textContent = '';
            $('space-management').value = 'TEAM_MANAGED';
            $('space-key').value = '';
            spaceKeyTouched = false;
            selectSpaceTemplate('KANBAN');
            setSpaceWizardStep(1);
            openModal('boardModal');
            applyLocale($('boardModal'));
            updateSpacePreview();
            setTimeout(() => $('board-name').focus(), 120);
        }

        function backToBoard() {
            closeModal('boardModal');
        }

        function selectSpaceTemplate(templateKey) {
            selectedSpaceTemplate = Object.hasOwn(SPACE_TEMPLATES, templateKey) ? templateKey : 'KANBAN';
            const template = SPACE_TEMPLATES[selectedSpaceTemplate];
            $('spaceTemplateIcon').className = `fa-solid ${template.icon}`;
            $('spaceTemplateName').textContent = localizeText(template.name);
            $('spaceTemplateDescription').textContent = localizeText(template.description);
            document.querySelectorAll('.space-template-option').forEach(option => {
                option.classList.toggle('selected', option.dataset.template === selectedSpaceTemplate);
            });
            $('spaceTemplatePicker').classList.remove('open');
            updateSpacePreview(template);
            updateSpaceReview();
        }

        function toggleSpaceTemplatePicker() {
            $('spaceTemplatePicker').classList.toggle('open');
        }

        function updateSpaceKeyFromName() {
            if (spaceKeyTouched) {
                updateSpacePreview();
                return;
            }
            const key = $('board-name').value
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^A-Za-z0-9]/g, '')
                .toUpperCase()
                .slice(0, 10);
            $('space-key').value = key
                ? (/[A-Z]/.test(key[0]) ? key : `S${key}`.slice(0, 10))
                : 'SPACE';
            updateSpacePreview();
        }

        function onSpaceKeyInput() {
            spaceKeyTouched = true;
            const input = $('space-key');
            input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
            updateSpacePreview();
        }

        function updateSpacePreview(template = null) {
            const preview = template || SPACE_TEMPLATES[selectedSpaceTemplate] || SPACE_TEMPLATES.KANBAN;
            const name = $('board-name').value.trim() || localizeText('Название пространства');
            const key = $('space-key').value.trim() || 'SPACE';
            const isPersonal = $('space-management').value === 'PERSONAL';
            $('spacePreviewName').textContent = name;
            $('spacePreviewKey').textContent = key;
            $('spacePreviewManaged').textContent =
                `${localizeText(isPersonal ? 'Личное пространство' : 'Командное пространство')} /`;
            $('spaceAccessNote').textContent = localizeText('Доступ: пространство доступно только вашему аккаунту.');

            const tabs = $('spacePreviewTabs');
            tabs.replaceChildren();
            preview.tabs.forEach((tab, index) => {
                const item = el('span', index === 1 ? 'active' : null, localizeText(tab));
                tabs.appendChild(item);
            });

            const board = $('spacePreviewBoard');
            board.replaceChildren();
            preview.columns.forEach(column => {
                const columnElement = el('div', 'space-preview-column');
                columnElement.appendChild(el('strong', null, localizeText(column.name)));
                if (column.task) {
                    columnElement.appendChild(el('div', 'space-preview-task', localizeText(column.task)));
                }
                board.appendChild(columnElement);
            });
            updateSpaceReview();
        }

        function updateSpaceReview() {
            const management = $('space-management').value === 'PERSONAL'
                ? 'Личное пространство'
                : 'Командное пространство';
            $('spaceReviewName').textContent = $('board-name').value.trim() || localizeText('Название пространства');
            $('spaceReviewKey').textContent = $('space-key').value.trim();
            $('spaceReviewManagement').textContent = localizeText(management);
            $('spaceReviewTemplate').textContent = $('spaceTemplateName').textContent;
        }

        function setSpaceWizardStep(step) {
            spaceWizardStep = step;
            $('spaceWizardDetails').hidden = step !== 1;
            $('spaceWizardReview').classList.toggle('open', step === 2);
            $('spaceWizardTitle').textContent = localizeText(step === 1 ? 'Назовите пространство' : 'Проверьте пространство');
            $('spaceWizardReviewTitle').textContent = localizeText('Проверьте пространство');
            $('spaceWizardSubtitle').hidden = step !== 1;
            $('spaceWizardStepLabel').textContent = localizeText(step === 1 ? 'Шаг 1 из 2' : 'Шаг 2 из 2');
            $('spaceWizardBack').hidden = step === 1;
            $('spaceWizardNext').hidden = step !== 1;
            $('board-submit').hidden = step !== 2;
        }

        function continueSpaceWizard() {
            const name = $('board-name').value.trim();
            const key = $('space-key').value.trim();
            const errorBox = $('board-error');
            if (!name) {
                errorBox.textContent = localizeText('Введите название пространства.');
                $('board-name').focus();
                return;
            }
            if (!/^[A-Z][A-Z0-9]{1,9}$/.test(key)) {
                errorBox.textContent = localizeText('Введите корректный ключ пространства.');
                $('space-key').focus();
                return;
            }
            errorBox.textContent = '';
            updateSpaceReview();
            setSpaceWizardStep(2);
        }

        async function submitBoardModal() {
            const name = $('board-name').value.trim();
            const errorBox = $('board-error');
            if (!name) {
                errorBox.textContent = localizeText('Введите название пространства.');
                setSpaceWizardStep(1);
                return;
            }
            const key = $('space-key').value.trim();
            if (!/^[A-Z][A-Z0-9]{1,9}$/.test(key)) {
                errorBox.textContent = localizeText('Введите корректный ключ пространства.');
                setSpaceWizardStep(1);
                return;
            }

            const button = $('board-submit');
            button.disabled = true;
            try {
                const res = await fetch(API_BOARDS, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        name,
                        userId: currentUser.id,
                        templateKey: selectedSpaceTemplate,
                        spaceKey: key,
                        managementType: $('space-management').value
                    })
                });
                if (!res.ok) {
                    const error = await res.json().catch(() => ({}));
                    if (res.status === 400 && error.error) {
                        errorBox.textContent = localizeText(error.error);
                        setSpaceWizardStep(1);
                        return;
                    }
                    throw new Error('HTTP ' + res.status);
                }
                const board = await res.json();
                boards.push(board);
                currentBoardId = board.id;
                sprints = [];
                localStorage.setItem(`jira_board_${currentUser.id}`, String(currentBoardId));
                updateBoardUrl(currentBoardId);
                renderBoardNavigation();
                closeModal('boardModal');
                showToast('Пространство создано');
                await Promise.all([loadTasks(), loadSprints()]);
                switchPage(SPACE_TEMPLATES[selectedSpaceTemplate]?.page || 'board');
            } catch (err) {
                console.error(err);
                errorBox.textContent = localizeText('Не удалось создать доску. Попробуйте ещё раз.');
            } finally {
                button.disabled = false;
            }
        }

        async function loadTasks() {
            if (!currentUser || currentBoardId == null) return;
            try {
                const res = await fetch(`${API_TASKS}?userId=${encodeURIComponent(currentUser.id)}&boardId=${encodeURIComponent(currentBoardId)}`);
                if (!res.ok) throw new Error('HTTP ' + res.status);
                allTasks = await res.json();
                applyFilters();
            } catch (err) {
                console.error(err);
                showToast('Не удалось загрузить задачи.', 'error');
            }
        }

        async function loadSprints() {
            if (!currentUser || currentBoardId == null) return;
            try {
                const res = await fetch(`${API_SPRINTS}/${currentBoardId}/sprints?userId=${encodeURIComponent(currentUser.id)}`);
                if (!res.ok) throw new Error('HTTP ' + res.status);
                sprints = await res.json();
                renderSprintOptions();
                renderBacklog();
            } catch (err) {
                console.error(err);
                showToast('Не удалось загрузить спринты.', 'error');
            }
        }

        function renderSprintOptions(selectedSprintId = null) {
            const select = $('tm-sprint');
            if (!select) return;
            select.replaceChildren();
            const backlogOption = document.createElement('option');
            backlogOption.value = '';
            backlogOption.textContent = localizeText('Backlog');
            select.appendChild(backlogOption);
            sprints.forEach(sprint => {
                const option = document.createElement('option');
                option.value = sprint.id;
                option.textContent = `${sprint.name} (${localizeText(sprintStatusLabel(sprint.status))})`;
                option.disabled = sprint.status === 'COMPLETED' && String(sprint.id) !== String(selectedSprintId);
                select.appendChild(option);
            });
            select.value = selectedSprintId == null ? '' : String(selectedSprintId);
        }

        function sprintStatusLabel(status) {
            return {
                PLANNED: 'Запланировано',
                ACTIVE: 'Активен',
                COMPLETED: 'Завершён'
            }[status] || status;
        }

        function openSprintModal() {
            if (!currentUser) return showAuth();
            $('sprint-name').value = '';
            $('sprint-goal').value = '';
            $('sprint-start').value = '';
            $('sprint-end').value = '';
            $('sprint-error').textContent = '';
            openModal('sprintModal');
            applyLocale($('sprintModal'));
            setTimeout(() => $('sprint-name').focus(), 120);
        }

        async function submitSprint() {
            const name = $('sprint-name').value.trim();
            const startDate = $('sprint-start').value || null;
            const endDate = $('sprint-end').value || null;
            const errorBox = $('sprint-error');
            if (!name) {
                errorBox.textContent = localizeText('Введите название спринта.');
                return;
            }
            if (startDate && endDate && endDate < startDate) {
                errorBox.textContent = localizeText('Дата окончания не может быть раньше даты начала.');
                return;
            }

            const button = $('sprint-submit');
            button.disabled = true;
            try {
                const res = await fetch(`${API_SPRINTS}/${currentBoardId}/sprints`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        name,
                        goal: $('sprint-goal').value.trim() || null,
                        startDate,
                        endDate,
                        userId: currentUser.id
                    })
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                sprints.push(await res.json());
                closeModal('sprintModal');
                renderSprintOptions();
                renderBacklog();
                showToast('Спринт создан');
            } catch (err) {
                console.error(err);
                errorBox.textContent = localizeText('Не удалось создать спринт. Попробуйте ещё раз.');
            } finally {
                button.disabled = false;
            }
        }

        async function changeSprintStatus(sprint, action) {
            try {
                const res = await fetch(`${API_SPRINTS}/${currentBoardId}/sprints/${sprint.id}/${action}?userId=${encodeURIComponent(currentUser.id)}`, {
                    method: 'POST'
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const updated = await res.json();
                sprints = sprints.map(item => item.id === updated.id ? updated : item);
                renderSprintOptions();
                renderBacklog();
                showToast(action === 'start' ? 'Спринт запущен' : 'Спринт завершён');
            } catch (err) {
                console.error(err);
                showToast('Не удалось изменить состояние спринта.', 'error');
            }
        }

        function renderBacklog() {
            const backlog = allTasks.filter(task => task.sprintId == null);
            $('backlog-count').textContent = backlog.length;
            const backlogHost = $('backlog-list');
            backlogHost.replaceChildren();
            if (!backlog.length) backlogHost.appendChild(el('div', 'empty-note', 'Backlog пуст'));
            backlog.forEach(task => backlogHost.appendChild(createBacklogTask(task)));

            const host = $('sprints-list');
            host.replaceChildren();
            if (!sprints.length) host.appendChild(el('div', 'empty-note', 'Спринтов пока нет'));
            sprints.forEach(sprint => {
                const card = el('div', 'sprint-card');
                const head = el('div', 'sprint-card-head');
                head.appendChild(el('strong', null, sprint.name));
                head.appendChild(el('span', 'pill', sprintStatusLabel(sprint.status)));
                if (sprint.status === 'PLANNED' || sprint.status === 'ACTIVE') {
                    const button = el('button', 'btn btn-outline',
                        sprint.status === 'PLANNED' ? 'Старт' : 'Завершить');
                    button.type = 'button';
                    button.addEventListener('click', () =>
                        changeSprintStatus(sprint, sprint.status === 'PLANNED' ? 'start' : 'complete'));
                    head.appendChild(button);
                }
                card.appendChild(head);
                if (sprint.goal) card.appendChild(el('p', 'page-sub', sprint.goal));
                const sprintTasks = allTasks.filter(task => String(task.sprintId) === String(sprint.id));
                card.appendChild(el('div', 'comment-meta', `${localizeText('Задач в спринте')}: ${sprintTasks.length}`));
                sprintTasks.forEach(task => card.appendChild(createBacklogTask(task)));
                host.appendChild(card);
            });
        }

        function createBacklogTask(task) {
            const item = el('div', 'backlog-task');
            item.textContent = `TA-${Number(task.id)} · ${task.title}`;
            item.addEventListener('click', () => openTaskModal(task));
            return item;
        }

        async function saveTask(task) {
            let saved = false;
            try {
                const res = await fetch(`${API_TASKS}/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                saved = true;
            } catch (err) {
                console.error(err);
                showToast('Не удалось сохранить изменения.', 'error');
            }
            await loadTasks();
            return saved;
        }

        // ---------- Filters ----------
        function onSearchInput(source) {
            const other = source.id === 'searchInput' ? $('boardSearchInput') : $('searchInput');
            other.value = source.value;
            applyFilters();
        }

        function filterByStatus(status) {
            activeStatusFilter = status;
            document.querySelectorAll('.chip[data-status]').forEach(btn => btn.classList.toggle('active', btn.dataset.status === status));
            applyFilters();
        }

        function getFilteredTasks() {
            const query = $('searchInput').value.trim().toLowerCase();
            let list = allTasks.filter(t => (t.title || '').toLowerCase().includes(query));
            if (activeStatusFilter !== 'ALL') list = list.filter(t => t.status === activeStatusFilter);
            return list;
        }

        function applyFilters() {
            const tasks = getFilteredTasks();
            renderKanban(tasks);
            renderList(tasks);
            renderTimeline(false);
            updateStats();
            renderBacklog();
            applyLocale();
        }

        // ---------- Kanban ----------
        function setCount(node, n) {
            if (node.textContent === String(n)) return;
            node.textContent = n;
            node.classList.remove('bump');
            void node.offsetWidth;
            node.classList.add('bump');
        }

        function renderKanban(tasks) {
            const counts = {
                TODO: 0,
                IN_PROGRESS: 0,
                IN_REVIEW: 0,
                DONE: 0
            };
            STATUSES.forEach(s => $(`col-${s}`).replaceChildren());

            tasks.forEach((task, i) => {
                const col = $(`col-${task.status}`);
                if (!col) return;
                counts[task.status]++;
                const card = createCard(task);
                if (!seenCards.has(task.id)) {
                    card.classList.add('enter');
                    card.style.animationDelay = `${Math.min(i, 12) * 45}ms`;
                } else if (task.id === landedId) {
                    card.classList.add('landed');
                }
                col.appendChild(card);
            });
            tasks.forEach(t => seenCards.add(t.id));
            landedId = null;

            STATUSES.forEach(s => {
                setCount($(`count-${s}`), counts[s]);
                if (counts[s] === 0) $(`col-${s}`).appendChild(el('div', 'col-empty', 'Перетащите задачу сюда'));
            });
        }

        function createCard(task) {
            const card = el('div', `card s-${task.status}`);
            card.draggable = true;
            card.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', String(task.id));
                e.dataTransfer.effectAllowed = 'move';
                setTimeout(() => card.classList.add('dragging'), 0);
            });
            card.addEventListener('dragend', () => card.classList.remove('dragging'));
            card.addEventListener('click', () => openTaskModal(task));

            card.appendChild(el('div', 'card-title', task.title));
            if (task.description) card.appendChild(el('div', 'card-desc', task.description));
            const details = el('div', 'task-type-priority');
            details.append(
                el('span', null, TASK_TYPE_LABELS[task.type] || TASK_TYPE_LABELS.TASK),
                el('span', null, PRIORITY_LABELS[task.priority] || PRIORITY_LABELS.MEDIUM)
            );
            card.appendChild(details);

            const del = el('button', 'card-del');
            del.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
            del.title = 'Удалить';
            del.addEventListener('click', e => {
                e.stopPropagation();
                deleteTask(task.id);
            });
            card.appendChild(del);

            const foot = el('div', 'card-foot');
            const key = el('span', 'key');
            key.innerHTML = '<i class="fa-solid fa-bolt" style="font-size:10px;"></i>';
            key.append(` TA-${Number(task.id)}`);
            foot.appendChild(key);

            const label = dateLabel(task);
            if (label) {
                const chip = el('span', 'date-chip' + (isOverdue(task) ? ' late' : ''));
                chip.innerHTML = '<i class="fa-regular fa-calendar"></i>';
                chip.append(label);
                foot.appendChild(chip);
            }
            const initial = currentUser && currentUser.username ? currentUser.username.charAt(0).toUpperCase() : '?';
            foot.appendChild(el('span', 'mini-avatar', initial));
            card.appendChild(foot);
            return card;
        }

        // ---------- Drag & drop ----------
        function allowDrop(e) {
            e.preventDefault();
            e.currentTarget.classList.add('drag-over');
        }

        function removeDropStyle(e) {
            e.currentTarget.classList.remove('drag-over');
        }

        async function dropTask(e, newStatus) {
            e.preventDefault();
            e.currentTarget.classList.remove('drag-over');
            const taskId = e.dataTransfer.getData('text/plain');
            const task = allTasks.find(t => String(t.id) === taskId);
            if (!task || task.status === newStatus) return;

            // Move the card right away so the board feels instant, then sync with the server
            const previousStatus = task.status;
            task.status = newStatus;
            landedId = task.id;
            applyFilters();
            const saved = await saveTask({...task,
                status: newStatus
            });
            if (saved) await runAutomationRules(task, previousStatus, newStatus);
        }

        // ---------- List ----------
        function renderList(tasks) {
            if (boards.find(board => board.id === currentBoardId)?.templateKey === 'DEVELOPMENT_REQUESTS') {
                renderDevelopmentWork(tasks);
                return;
            }
            const tbody = $('list-tbody');
            tbody.replaceChildren();
            if (tasks.length === 0) {
                const tr = el('tr');
                const td = el('td', 'empty-note', 'Задач пока нет. Нажмите «Создать», чтобы добавить первую.');
                td.colSpan = 7;
                tr.appendChild(td);
                tbody.appendChild(tr);
                return;
            }
            tasks.forEach(t => {
                const tr = el('tr');
                const keyTd = el('td');
                keyTd.appendChild(el('span', 'key', `TA-${Number(t.id)}`));
                const titleTd = el('td');
                const strong = el('strong', null, t.title);
                titleTd.appendChild(strong);
                const statusTd = el('td');
                statusTd.appendChild(el('span', `pill s-${t.status}`, STATUS_LABELS[t.status] || t.status));
                const s = parseDate(t.startDate),
                    e = parseDate(t.endDate);
                const startTd = el('td', null, s ? fmtShort(s) : '—');
                const endTd = el('td', null, e ? fmtShort(e) : '—');
                if (isOverdue(t)) endTd.style.color = 'var(--danger)';
                const assignee = t.assigneeId && currentUser && t.assigneeId === currentUser.id ?
                    currentUser.username : '—';
                const userTd = el('td', null, assignee);
                const actionsTd = el('td');
                const actions = el('div', 'row-actions');
                const edit = el('button', 'icon-btn');
                edit.innerHTML = '<i class="fa-solid fa-pen"></i>';
                edit.title = 'Изменить';
                edit.addEventListener('click', () => openTaskModal(t));
                const del = el('button', 'icon-btn');
                del.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
                del.title = 'Удалить';
                del.addEventListener('click', () => deleteTask(t.id));
                actions.append(edit, del);
                actionsTd.appendChild(actions);
                tr.append(keyTd, titleTd, statusTd, startTd, endTd, userTd, actionsTd);
                tbody.appendChild(tr);
            });
        }

        function setDevelopmentWorkFilter(status) {
            $('developmentWorkStatusFilter').value = status;
            $('developmentWorkTypeFilter').value = 'ALL';
            document.querySelectorAll('.development-space-navigation [data-work-filter]').forEach(link => {
                link.classList.toggle('active', link.dataset.workFilter === status);
            });
            switchPage('list');
        }

        function setDevelopmentWorkType(type) {
            $('developmentWorkStatusFilter').value = 'ALL';
            $('developmentWorkTypeFilter').value = type;
            document.querySelectorAll('.development-space-navigation [data-work-filter]').forEach(link => {
                link.classList.toggle('active', link.dataset.workFilter === 'ALL');
            });
            switchPage('list');
        }

        function toggleDevelopmentWorkFilters() {
            const menu = $('developmentWorkFilterMenu');
            const open = menu.classList.toggle('open');
            $('developmentWorkFilterButton').setAttribute('aria-expanded', String(open));
        }

        function toggleDevelopmentWorkGrouping() {
            developmentWorkGroupByStatus = !developmentWorkGroupByStatus;
            $('developmentWorkGroupButton').setAttribute('aria-pressed', String(developmentWorkGroupByStatus));
            renderDevelopmentWork(getFilteredTasks());
        }

        function toggleDevelopmentWorkAssignee() {
            developmentWorkAssignedToMe = !developmentWorkAssignedToMe;
            $('developmentWorkAssignee').setAttribute('aria-pressed', String(developmentWorkAssignedToMe));
            renderDevelopmentWork(getFilteredTasks());
        }

        function renderDevelopmentWork(tasks) {
            const tbody = $('developmentWorkTableBody');
            if (!tbody) return;
            tbody.replaceChildren();
            const query = $('developmentWorkSearch').value.trim().toLocaleLowerCase();
            const statusFilter = $('developmentWorkStatusFilter').value;
            const typeFilter = $('developmentWorkTypeFilter').value;
            const visibleTasks = tasks.filter(task => {
                if (statusFilter !== 'ALL' && task.status !== statusFilter) return false;
                if (typeFilter !== 'ALL' && task.type !== typeFilter) return false;
                if (developmentWorkAssignedToMe && String(task.assigneeId) !== String(currentUser?.id)) return false;
                if (!query) return true;
                return [task.title, task.description, task.id, task.type]
                    .some(value => String(value || '').toLocaleLowerCase().includes(query));
            });
            $('developmentWorkCount').textContent = String(visibleTasks.length);

            if (!visibleTasks.length) {
                const row = el('tr');
                const cell = el('td', 'development-work-empty');
                cell.colSpan = 9;
                cell.appendChild(el('strong', null, 'Здесь пока нет рабочих элементов'));
                cell.appendChild(el('span', null, 'Нет подходящих элементов или они не соответствуют текущим фильтрам.'));
                row.appendChild(cell);
                tbody.appendChild(row);
                return;
            }

            const groups = developmentWorkGroupByStatus
                ? STATUSES.map(status => [status, visibleTasks.filter(task => task.status === status)]).filter(([, items]) => items.length)
                : [['ALL', visibleTasks]];
            groups.forEach(([status, items]) => {
                if (developmentWorkGroupByStatus) {
                    const groupRow = el('tr', 'development-work-group');
                    const groupCell = el('td', null, STATUS_LABELS[status] || status);
                    groupCell.colSpan = 9;
                    groupRow.appendChild(groupCell);
                    tbody.appendChild(groupRow);
                }
                items.forEach(task => {
                    const row = el('tr');
                    const checkboxCell = el('td');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.setAttribute('aria-label', `Выбрать ${task.title}`);
                    checkboxCell.appendChild(checkbox);

                    const workCell = el('td');
                    const workButton = el('button', 'development-work-item');
                    workButton.type = 'button';
                    workButton.addEventListener('click', () => openTaskModal(task));
                    const typeIcons = {BUG: 'fa-bug', STORY: 'fa-bookmark', EPIC: 'fa-bolt', SUBTASK: 'fa-list-check'};
                    workButton.appendChild(el('i', `fa-solid ${typeIcons[task.type] || 'fa-square-check'}`));
                    workButton.appendChild(el('span', 'key', `${boards.find(board => board.id === currentBoardId)?.spaceKey || 'DR'}-${task.id}`));
                    workButton.appendChild(el('span', null, task.title));
                    workCell.appendChild(workButton);

                    const owner = task.assigneeId && currentUser && String(task.assigneeId) === String(currentUser.id)
                        ? currentUser.username
                        : '—';
                    const reporter = currentUser && String(task.userId) === String(currentUser.id)
                        ? currentUser.username
                        : '—';
                    const priority = el('span', 'development-work-priority',
                        localizeText(PRIORITY_LABELS[task.priority] || PRIORITY_LABELS.MEDIUM));
                    const statusPill = el('span', `pill s-${task.status}`, localizeText(STATUS_LABELS[task.status] || task.status));
                    const priorityCell = el('td');
                    priorityCell.appendChild(priority);
                    const statusCell = el('td');
                    statusCell.appendChild(statusPill);
                    row.append(
                        checkboxCell,
                        workCell,
                        el('td', null, owner),
                        el('td', null, reporter),
                        priorityCell,
                        statusCell,
                        el('td', null, task.status === 'DONE' ? 'Решено' : '—'),
                        el('td', null, '—'),
                        el('td', null, '—')
                    );
                    tbody.appendChild(row);
                });
            });
        }

        // ---------- Timeline ----------
        let tlTodayOffset = 0;
        const TL_DAY = 38;

        function renderTimeline(animate) {
            const host = $('timeline-host');
            const prev = host.querySelector('.tl-scroll');
            const prevLeft = prev ? prev.scrollLeft : 0;
            const prevTop = prev ? prev.scrollTop : 0;
            host.replaceChildren();

            const tasks = getFilteredTasks();
            if (tasks.length === 0) {
                host.appendChild(el('div', 'empty-note', 'Задач пока нет. Создайте задачу и поставьте ей сроки.'));
                return;
            }

            const LEFT = window.innerWidth <= 700 ? 170 : 300;
            const today = startOfDay(new Date());
            const spans = tasks.map(taskSpan);

            let min = today,
                max = today;
            spans.forEach(sp => {
                if (!sp) return;
                if (sp.start < min) min = sp.start;
                if (sp.end > max) max = sp.end;
            });
            const rangeStart = addDays(min, -7);
            let total = daysBetween(rangeStart, addDays(max, 21)) + 1;
            if (total < 42) total = 42;
            const trackWidth = total * TL_DAY;
            tlTodayOffset = daysBetween(rangeStart, today) * TL_DAY;

            const scroll = el('div', 'tl-scroll');
            const inner = el('div', 'tl-inner');
            inner.style.setProperty('--left', LEFT + 'px');
            inner.style.setProperty('--day', TL_DAY + 'px');
            inner.style.width = (LEFT + trackWidth) + 'px';

            // Header: months + days
            const head = el('div', 'tl-head');
            head.appendChild(el('div', 'tl-corner', 'Задачи'));
            const timeHead = el('div');
            const months = el('div', 'tl-months');
            const days = el('div', 'tl-days');
            let segDays = 0,
                segLabel = '';
            const flushMonth = () => {
                if (!segDays) return;
                const m = el('div', 'tl-month', segLabel);
                m.style.width = (segDays * TL_DAY) + 'px';
                months.appendChild(m);
            };
            const weekdays = currentLocale === 'en' ?
                ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] :
                ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
            const bg = el('div', 'tl-bg');
            bg.style.left = LEFT + 'px';
            bg.style.width = trackWidth + 'px';

            for (let i = 0; i < total; i++) {
                const d = addDays(rangeStart, i);
                const label = d.toLocaleDateString(currentLocale === 'en' ? 'en-US' : 'ru-RU', {
                    month: 'long',
                    year: 'numeric'
                });
                if (label !== segLabel) {
                    flushMonth();
                    segLabel = label;
                    segDays = 0;
                }
                segDays++;

                const dow = d.getDay();
                const weekend = dow === 0 || dow === 6;
                const isToday = d.getTime() === today.getTime();
                const cell = el('div', 'tl-day' + (weekend ? ' weekend' : '') + (isToday ? ' today' : ''));
                cell.append(el('span', null, weekdays[dow]), el('b', null, String(d.getDate())));
                days.appendChild(cell);

                if (weekend) {
                    const w = el('div', 'tl-weekend');
                    w.style.left = (i * TL_DAY) + 'px';
                    w.style.width = TL_DAY + 'px';
                    bg.appendChild(w);
                }
            }
            flushMonth();
            timeHead.append(months, days);
            head.appendChild(timeHead);
            inner.appendChild(head);

            // Body
            const body = el('div', 'tl-body');
            const todayLine = el('div', 'tl-today-line');
            todayLine.style.left = tlTodayOffset + 'px';
            bg.appendChild(todayLine);
            body.appendChild(bg);

            tasks.forEach((t, idx) => {
                const row = el('div', 'tl-row');
                const name = el('div', 'tl-name');
                name.append(el('span', 'key', `TA-${Number(t.id)}`), el('span', 't', t.title));
                name.title = t.title;
                const track = el('div', 'tl-track');
                track.style.width = trackWidth + 'px';

                const sp = spans[idx];
                if (sp) {
                    const off = daysBetween(rangeStart, sp.start);
                    const len = daysBetween(sp.start, sp.end) + 1;
                    const bar = el('button', `tl-bar s-${t.status}` + (isOverdue(t) ? ' late' : ''));
                    bar.style.left = (off * TL_DAY + 2) + 'px';
                    bar.style.width = (len * TL_DAY - 4) + 'px';
                    bar.append(el('span', 'tl-bar-title', t.title), el('span', 'tl-bar-dates', dateLabel(t)));
                    bar.title = `${t.title}\n${dateLabel(t)}`;
                    bar.addEventListener('click', () => openTaskModal(t));
                    if (animate) {
                        bar.classList.add('grow');
                        bar.style.animationDelay = `${Math.min(idx, 14) * 60}ms`;
                    }
                    track.appendChild(bar);
                } else {
                    const ghost = el('button', 'tl-ghost', '+ Добавить даты');
                    ghost.style.left = Math.max(tlTodayOffset, 8) + 'px';
                    ghost.addEventListener('click', () => openTaskModal(t));
                    track.appendChild(ghost);
                }
                row.append(name, track);
                body.appendChild(row);
            });

            inner.appendChild(body);
            scroll.appendChild(inner);
            host.appendChild(scroll);

            if (animate) {
                requestAnimationFrame(scrollTimelineToToday);
            } else {
                scroll.scrollLeft = prevLeft;
                scroll.scrollTop = prevTop;
            }
        }

        function scrollTimelineToToday() {
            const scroll = document.querySelector('.tl-scroll');
            if (!scroll) return;
            scroll.scrollTo({
                left: Math.max(0, tlTodayOffset - 160),
                behavior: 'smooth'
            });
        }

        // ---------- Stats ----------
        function animateNumber(node, to) {
            const from = Number(node.dataset.v || 0);
            node.dataset.v = to;
            if (from === to) {
                node.textContent = to;
                return;
            }
            const t0 = performance.now(),
                dur = 550;

            function step(now) {
                const p = Math.min(1, (now - t0) / dur);
                node.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }

        function updateStats() {
            const total = allTasks.length;
            const count = s => allTasks.filter(t => t.status === s).length;
            animateNumber($('stat-total'), total);
            animateNumber($('stat-progress'), count('IN_PROGRESS'));
            animateNumber($('stat-done'), count('DONE'));
            animateNumber($('stat-late'), allTasks.filter(isOverdue).length);
            STATUSES.forEach(s => {
                $(`seg-${s}`).style.width = total ? (count(s) / total * 100) + '%' : '0';
            });
        }

        // ---------- Create / edit / delete ----------
        function openTaskModal(task = null, presetStatus = 'TODO') {
            if (!currentUser) return showAuth();
            editingId = task ? task.id : null;
            $('tm-heading').textContent = task ? `${localizeText('Задача')} TA-${Number(task.id)}` : localizeText('Новая задача');
            $('tm-submit').textContent = task ? localizeText('Сохранить') : localizeText('Создать');
            $('tm-delete').style.display = task ? '' : 'none';
            $('tm-title').value = task ? task.title : '';
            $('tm-desc').value = task && task.description ? task.description : '';
            $('tm-status').value = task ? task.status : presetStatus;
            $('tm-type').value = task ? (task.type || 'TASK') : 'TASK';
            $('tm-priority').value = task ? (task.priority || 'MEDIUM') : 'MEDIUM';
            const assignee = $('tm-assignee');
            assignee.replaceChildren();
            const unassigned = el('option', null, 'Не назначено');
            unassigned.value = '';
            assignee.appendChild(unassigned);
            const ownerOption = el('option', null, currentUser.username);
            ownerOption.value = currentUser.id;
            assignee.appendChild(ownerOption);
            assignee.value = task && task.assigneeId ? String(task.assigneeId) : '';
            renderSprintOptions(task ? task.sprintId : null);
            $('tm-start').value = task && task.startDate ? String(task.startDate).slice(0, 10) : '';
            $('tm-end').value = task && task.endDate ? String(task.endDate).slice(0, 10) : '';
            $('tm-error').textContent = '';
            $('taskDetails').hidden = !task;
            $('comments-list').replaceChildren();
            $('attachments-list').replaceChildren();
            $('comment-input').value = '';
            $('attachment-input').value = '';
            openModal('taskModal');
            applyLocale($('taskModal'));
            if (task) loadTaskDetails(task.id);
            setTimeout(() => $('tm-title').focus(), 120);
        }

        async function submitTaskModal() {
            const title = $('tm-title').value.trim();
            const start = $('tm-start').value || null;
            const end = $('tm-end').value || null;
            const errorBox = $('tm-error');

            if (!title) {
                errorBox.textContent = localizeText('Введите название задачи.');
                return;
            }
            if (start && end && end < start) {
                errorBox.textContent = localizeText('Дата окончания не может быть раньше даты начала.');
                return;
            }

            const payload = {
                title,
                description: $('tm-desc').value.trim() || null,
                status: $('tm-status').value,
                type: $('tm-type').value,
                priority: $('tm-priority').value,
                assigneeId: $('tm-assignee').value ? Number($('tm-assignee').value) : null,
                sprintId: $('tm-sprint').value ? Number($('tm-sprint').value) : null,
                startDate: start,
                endDate: end,
                userId: currentUser.id,
                boardId: currentBoardId
            };
            const previousTask = editingId
                ? allTasks.find(task => String(task.id) === String(editingId))
                : null;

            const button = $('tm-submit');
            button.disabled = true;
            try {
                const res = editingId ?
                    await fetch(`${API_TASKS}/${editingId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    }) :
                    await fetch(API_TASKS, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                closeModal('taskModal');
                showToast(editingId ? 'Задача сохранена' : 'Задача создана');
                await loadTasks();
                if (previousTask && previousTask.status !== payload.status) {
                    const savedTask = allTasks.find(task => String(task.id) === String(editingId));
                    if (savedTask) await runAutomationRules(savedTask, previousTask.status, payload.status);
                }
            } catch (err) {
                console.error(err);
                errorBox.textContent = localizeText('Не удалось сохранить задачу. Попробуйте ещё раз.');
            } finally {
                button.disabled = false;
            }
        }

        async function loadTaskDetails(taskId) {
            try {
                const query = `userId=${encodeURIComponent(currentUser.id)}`;
                const [commentsResponse, attachmentsResponse] = await Promise.all([
                    fetch(`${API_TASKS}/${taskId}/comments?${query}`),
                    fetch(`${API_TASKS}/${taskId}/attachments?${query}`)
                ]);
                if (!commentsResponse.ok || !attachmentsResponse.ok) {
                    throw new Error(`HTTP ${commentsResponse.status}/${attachmentsResponse.status}`);
                }
                const [comments, attachments] = await Promise.all([
                    commentsResponse.json(),
                    attachmentsResponse.json()
                ]);
                if (editingId !== taskId) return;
                renderComments(comments);
                renderAttachments(taskId, attachments);
            } catch (err) {
                console.error(err);
                showToast('Не удалось загрузить комментарии и вложения.', 'error');
            }
        }

        function renderComments(comments) {
            const host = $('comments-list');
            host.replaceChildren();
            if (!comments.length) {
                host.appendChild(el('div', 'comment-meta', 'Нет комментариев'));
                return;
            }
            comments.forEach(comment => {
                const item = el('div', 'comment-item');
                const date = new Date(comment.createdAt).toLocaleString(currentLocale === 'en' ? 'en-US' : 'ru-RU');
                item.appendChild(el('div', 'comment-meta', `${currentUser.username} · ${date}`));
                item.appendChild(el('div', null, comment.body));
                host.appendChild(item);
            });
        }

        async function submitComment() {
            if (!editingId) return;
            const body = $('comment-input').value.trim();
            if (!body) return;
            try {
                const res = await fetch(`${API_TASKS}/${editingId}/comments`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({userId: currentUser.id, body})
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                $('comment-input').value = '';
                await loadTaskDetails(editingId);
            } catch (err) {
                console.error(err);
                showToast('Не удалось добавить комментарий.', 'error');
            }
        }

        function renderAttachments(taskId, attachments) {
            const host = $('attachments-list');
            host.replaceChildren();
            if (!attachments.length) {
                host.appendChild(el('div', 'comment-meta', 'Вложений пока нет'));
                return;
            }
            attachments.forEach(attachment => {
                const item = el('div', 'detail-item');
                const link = el('a', null, `${attachment.originalName} (${formatFileSize(attachment.size)})`);
                link.href = `${API_TASKS}/${taskId}/attachments/${attachment.id}?userId=${encodeURIComponent(currentUser.id)}`;
                link.download = attachment.originalName;
                const remove = el('button', 'btn btn-danger-ghost', 'Удалить');
                remove.type = 'button';
                remove.addEventListener('click', () => deleteAttachment(taskId, attachment.id));
                item.append(link, remove);
                host.appendChild(item);
            });
        }

        function formatFileSize(size) {
            if (size < 1024) return `${size} B`;
            if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
            return `${(size / (1024 * 1024)).toFixed(1)} MB`;
        }

        async function uploadTaskAttachment(input) {
            const file = input.files[0];
            if (!file || !editingId) return;
            if (file.size > 10 * 1024 * 1024) {
                showToast('Размер файла не должен превышать 10 МБ.', 'error');
                input.value = '';
                return;
            }
            const form = new FormData();
            form.append('file', file);
            try {
                const res = await fetch(`${API_TASKS}/${editingId}/attachments?userId=${encodeURIComponent(currentUser.id)}`, {
                    method: 'POST',
                    body: form
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                await loadTaskDetails(editingId);
                showToast('Файл прикреплён');
            } catch (err) {
                console.error(err);
                showToast('Не удалось прикрепить файл.', 'error');
            } finally {
                input.value = '';
            }
        }

        async function deleteAttachment(taskId, attachmentId) {
            try {
                const res = await fetch(`${API_TASKS}/${taskId}/attachments/${attachmentId}?userId=${encodeURIComponent(currentUser.id)}`, {
                    method: 'DELETE'
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                await loadTaskDetails(taskId);
            } catch (err) {
                console.error(err);
                showToast('Не удалось удалить вложение.', 'error');
            }
        }

        async function deleteFromModal() {
            const id = editingId;
            closeModal('taskModal');
            if (id) await deleteTask(id);
        }

        async function deleteTask(id) {
            const ok = await confirmDialog({
                title: localizeText('Удалить задачу?'),
                text: currentLocale === 'en' ? `Task TA-${Number(id)} will be permanently deleted.` : `Задача TA-${Number(id)} будет удалена без возможности восстановления.`,
                ok: localizeText('Удалить'),
                danger: true
            });
            if (!ok) return;
            try {
                const res = await fetch(`${API_TASKS}/${id}`, {
                    method: 'DELETE'
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                showToast('Задача удалена');
            } catch (err) {
                console.error(err);
                showToast('Не удалось удалить задачу.', 'error');
            }
            await loadTasks();
        }

        // ---------- AI assistant ----------
        async function toggleAiChat(open) {
            if (open && !currentUser) return showAuth();
            $('aiChat').classList.toggle('open', open);
            if (open) {
                await loadAiHistory();
                $('aiPromptInput').focus();
            }
        }

        async function loadAiHistory() {
            if (!currentUser) return;
            const host = $('aiMessages');
            host.replaceChildren();
            try {
                const res = await fetch(`${API_AI_HISTORY}?userId=${encodeURIComponent(currentUser.id)}`);
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const messages = await res.json();
                if (!messages.length) {
                    appendAiMessage('assistant', 'Здравствуйте! Я могу помочь с досками, задачами и спринтами.');
                    return;
                }
                messages.forEach(message => appendAiMessage(message.role, message.content));
            } catch (err) {
                console.error(err);
                appendAiMessage('assistant', 'Не удалось загрузить историю чата.');
                showToast('Не удалось загрузить историю чата.', 'error');
            }
        }

        function appendAiMessage(role, text, pending = false) {
            const message = el('div', `ai-chat-message ${role}${pending ? ' pending' : ''}`, text);
            $('aiMessages').appendChild(message);
            $('aiMessages').scrollTop = $('aiMessages').scrollHeight;
            return message;
        }

        async function clearAiHistory() {
            if (!currentUser) return;
            const ok = await confirmDialog({
                title: localizeText('Очистить историю чата?'),
                text: localizeText('История переписки с ИИ будет удалена.'),
                ok: localizeText('Очистить'),
                danger: true
            });
            if (!ok) return;
            try {
                const res = await fetch(`${API_AI_HISTORY}?userId=${encodeURIComponent(currentUser.id)}`, {
                    method: 'DELETE'
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                $('aiMessages').replaceChildren();
                appendAiMessage('assistant', 'Здравствуйте! Я могу помочь с досками, задачами и спринтами.');
                showToast('История чата очищена.');
            } catch (err) {
                console.error(err);
                showToast('Не удалось очистить историю чата.', 'error');
            }
        }

        async function sendAiCommand() {
            if (!currentUser) return showAuth();

            const input = $('aiPromptInput');
            const button = $('aiSendBtn');
            const prompt = input.value.trim();
            if (!prompt) return;

            button.disabled = true;
            appendAiMessage('user', prompt);
            input.value = '';
            const pending = appendAiMessage('assistant', 'ИИ думает...', true);

            try {
                const res = await fetch(API_AI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt,
                        userId: String(currentUser.id),
                        boardId: String(currentBoardId)
                    })
                });
                const data = await res.json().catch(() => ({}));
                pending.classList.remove('pending');
                pending.textContent = localizeText(data.message || (res.ok ? 'Готово.' : 'Ошибка запроса к ИИ.'));
                if (res.ok) {
                    if (data.refreshBoards) {
                        if (data.boardId) {
                            localStorage.setItem(`jira_board_${currentUser.id}`, String(data.boardId));
                        }
                        await loadBoards();
                    } else {
                        if (data.boardId && boards.some(board => String(board.id) === String(data.boardId))) {
                            currentBoardId = Number(data.boardId);
                            localStorage.setItem(`jira_board_${currentUser.id}`, String(currentBoardId));
                            updateBoardUrl(currentBoardId);
                            renderBoardNavigation();
                        }
                        await Promise.all([loadTasks(), loadSprints()]);
                    }
                } else {
                    pending.classList.remove('pending');
                }
            } catch (err) {
                console.error(err);
                pending.classList.remove('pending');
                pending.textContent = localizeText('Сервер недоступен. Попробуйте позже.');
            } finally {
                button.disabled = false;
                input.focus();
            }
        }

        // ---------- Bug report form ----------
        async function submitBugForm() {
            if (!currentUser) return showAuth();
            const description = $('bug-description');
            const steps = $('bug-steps');
            if (!description.value.trim()) {
                showToast(localizeText('Опишите ошибку.'), 'error');
                return;
            }

            try {
                const res = await fetch(API_TASKS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: ((currentLocale === 'en' ? 'Bug: ' : 'Баг: ') + description.value.trim()).slice(0, 255),
                        description: steps.value.trim() || null,
                        status: 'TODO',
                        type: 'BUG',
                        priority: 'HIGH',
                        userId: currentUser.id,
                        boardId: currentBoardId
                    })
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                description.value = '';
                steps.value = '';
                showToast('Отчёт отправлен, задача создана');
                await loadTasks();
            } catch (err) {
                console.error(err);
                showToast('Не удалось отправить форму.', 'error');
            }
        }
