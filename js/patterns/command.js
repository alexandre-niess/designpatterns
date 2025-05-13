class Command {
  execute() {}
  undo() {}
}

class AddTaskCommand extends Command {
  constructor(controller, task) {
    super();
    this.controller = controller;
    this.task = task;
  }

  execute() {
    this.controller.tasks.push(this.task);
    this.controller.renderTasks();
  }

  undo() {
    this.controller.tasks = this.controller.tasks.filter(
      (t) => t.getId() !== this.task.getId()
    );
    this.controller.renderTasks();
  }
}
