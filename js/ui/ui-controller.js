/**
 * Controlador da interface do usuário
 * Gerencia as interações entre os padrões e a interface
 */
class UIController {
  constructor() {
    this.tasks = [];
    this.taskFactory = new TaskFactory();
    this.taskSubject = new TaskSubject();
    this.notifications = [];

    // Inicializar observadores
    this.initObservers();

    // Configurar manipuladores de eventos
    this.setupEventListeners();
  }

  // Inicializar os observadores com base nas configurações do usuário
  initObservers() {
    // Adicionar observadores iniciais com base nas caixas de seleção
    if (document.getElementById("screen-observer").checked) {
      this.taskSubject.addObserver(
        new ScreenObserver(this.addNotification.bind(this))
      );
    }

    if (document.getElementById("email-observer").checked) {
      this.taskSubject.addObserver(
        new EmailObserver(this.addNotification.bind(this))
      );
    }

    if (document.getElementById("log-observer").checked) {
      this.taskSubject.addObserver(
        new LogObserver(this.addNotification.bind(this))
      );
    }
  }

  // Configurar manipuladores de eventos para a interface do usuário
  setupEventListeners() {
    // Manipular envio do formulário de tarefa
    document.getElementById("task-form").addEventListener("submit", (e) => {
      e.preventDefault();
      this.createTask();
    });

    // Manipular cliques nos botões de status de tarefa (usando delegação de eventos)
    document
      .getElementById("tasks-container")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("status-btn")) {
          const taskId = parseInt(e.target.getAttribute("data-task-id"));
          const status = e.target.getAttribute("data-status");
          this.updateTaskStatus(taskId, status);
        }
        if (e.target.classList.contains("delete-btn")) {
          const taskId = parseInt(e.target.getAttribute("data-task-id"));
          this.deleteTask(taskId);
        }
      });

    // Manipular aplicação de decoradores
    document
      .getElementById("apply-decorators")
      .addEventListener("click", () => {
        this.applyDecorators();
      });

    // Atualizar observadores quando as caixas de seleção forem alteradas
    document
      .getElementById("screen-observer")
      .addEventListener("change", this.updateObservers.bind(this));
    document
      .getElementById("email-observer")
      .addEventListener("change", this.updateObservers.bind(this));
    document
      .getElementById("log-observer")
      .addEventListener("change", this.updateObservers.bind(this));
    document.getElementById("toggle-logger").addEventListener("click", () => {
      this.taskSubject.addObserver(
        new LoggerObserver(this.addNotification.bind(this))
      );
      alert("Logger ativado com sucesso!");
    });
  }

  // Criar uma nova tarefa usando o Factory Method
  createTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const taskType = document.getElementById("task-type").value;

    if (!title) {
      alert("Por favor, insira um título para a tarefa.");
      return;
    }

    // Usar o Factory Method para criar a tarefa
    const task = this.taskFactory.createTask(taskType, title, description);
    this.tasks.push(task);

    // Atualizar a interface
    this.renderTasks();

    // Limpar o formulário
    document.getElementById("task-form").reset();
  }

  // Atualizar o status de uma tarefa e notificar os observadores
  updateTaskStatus(taskId, status) {
    const task = this.findTaskById(taskId);
    if (task) {
      task.setStatus(status);

      // Notificar observadores sobre a mudança de status
      this.taskSubject.notifyObservers(task, status);

      // Atualizar a interface
      this.renderTasks();
    }
  }

  // Excluir uma tarefa
  deleteTask(taskId) {
    const index = this.tasks.findIndex((task) => task.getId() === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.renderTasks();
    }
  }

  // Aplicar decoradores à tarefa selecionada
  applyDecorators() {
    const selectElement = document.getElementById("decorate-task-select");
    const taskId = parseInt(selectElement.value);

    if (!taskId) {
      alert("Por favor, selecione uma tarefa para aplicar os decoradores.");
      return;
    }

    let task = this.findTaskById(taskId);
    if (!task) return;

    // Aplicar decorador de alta prioridade
    if (document.getElementById("high-priority").checked) {
      task = new HighPriorityDecorator(task);
    }

    // Aplicar etiqueta colorida
    if (document.getElementById("color-label").checked) {
      const color = document.getElementById("color-select").value;
      task = new ColorLabelDecorator(task, color);
    }

    // Aplicar data de vencimento
    if (document.getElementById("due-date").checked) {
      const dueDate = document.getElementById("due-date-input").value;
      if (dueDate) {
        task = new DueDateDecorator(task, dueDate);
      }
    }

    // Aplicar decorador de prazo (task-deadline) — botão extra
    const deadline = document.getElementById("task-deadline").value;
    if (deadline) {
      task = new DeadlineDecorator(task, deadline);
    }

    const index = this.tasks.findIndex((t) => t.getId() === taskId);
    if (index !== -1) {
      this.tasks[index] = task;
      this.renderTasks();
    }
  }

  // Atualizar os observadores com base nas caixas de seleção
  updateObservers() {
    this.taskSubject = new TaskSubject();
    this.initObservers();
  }

  // Adicionar uma notificação à lista
  addNotification(notification) {
    this.notifications.push(notification);
    this.renderNotifications();
  }

  // Renderizar a lista de tarefas na interface do usuário
  renderTasks() {
    const container = document.getElementById("tasks-container");

    if (this.tasks.length === 0) {
      container.innerHTML = `
                <div class="list-group-item text-center text-muted">
                    Nenhuma tarefa criada ainda
                </div>
            `;
      document.getElementById("decorate-task-select").innerHTML = `
                <option value="">Selecione uma tarefa...</option>
            `;
      return;
    }

    container.innerHTML = "";
    let selectOptions = '<option value="">Selecione uma tarefa...</option>';

    this.tasks.forEach((task) => {
      container.innerHTML += task.getHtmlRepresentation();
      selectOptions += `<option value="${task.getId()}">${task.getTitle()}</option>`;
    });

    // Atualizar o select de decoração
    document.getElementById("decorate-task-select").innerHTML = selectOptions;
  }

  // Renderizar notificações na interface do usuário
  renderNotifications() {
    const container = document.getElementById("notifications-container");

    if (this.notifications.length === 0) {
      container.innerHTML = `
                <div class="list-group-item text-center text-muted">
                    Nenhuma notificação ainda
                </div>
            `;
      return;
    }

    container.innerHTML = "";

    // Mostrar as notificações mais recentes primeiro (limite de 10)
    const recentNotifications = [...this.notifications].reverse().slice(0, 10);

    recentNotifications.forEach((notification) => {
      container.innerHTML += notification.getHtmlRepresentation();
    });
  }

  // Encontrar uma tarefa pelo ID
  findTaskById(id) {
    return this.tasks.find((task) => task.getId() === id);
  }
}
