class ExternalTaskAdapter {
  constructor(externalTask) {
    this.externalTask = externalTask;
  }

  toInternalTask() {
    return {
      title: this.externalTask.name,
      description: this.externalTask.details,
      type: this.externalTask.category || "normal",
    };
  }
}
