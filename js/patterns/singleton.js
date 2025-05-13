class Logger {
  constructor() {
    if (Logger.instance) return Logger.instance;
    this.logs = [];
    Logger.instance = this;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  getLogs() {
    return this.logs;
  }
}

const logger = new Logger();
Object.freeze(logger);
export default logger;
