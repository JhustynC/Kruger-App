import fs from "fs";

import { AbsLogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements AbsLogDatasource {
  private readonly logPath: string = "logs/";

  //Se puede crear un mapa para tener cada path y agregar uno de forma mas facil
  private readonly logsPaths = new Map<LogSeverityLevel, string>([
    [LogSeverityLevel.low, "logs/logs-all.log"],
    [LogSeverityLevel.medium, "logs/logs-medium.log"],
    [LogSeverityLevel.high, "logs/logs-high.log"],
    [LogSeverityLevel.mailer, "logs/logs-mailer.log"],
  ]);

  constructor() {
    this.createLogsFiles();
  }

  //Creacion de el direcctorio y los ficheros para los logs
  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    // Aplicando el principio: Don't repeat yourself (DRY)
    this.logsPaths.forEach((path, level) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "", { flag: "w" });
      }
    });
  };

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJSON = `${JSON.stringify(log)}\n`;

    //Save all logs
    fs.appendFileSync(this.logsPaths.get(LogSeverityLevel.low)!, logAsJSON);
    // console.log("Saved logs in File System");
    //Save only medium and high severity logs
    if (log.level !== LogSeverityLevel.low) {
      fs.appendFileSync(this.logsPaths.get(log.level)!, logAsJSON);
      return;
    }

    return;
  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, "utf8");
    const logs = content
      .split("\n")
      .filter((line) => line && line.trim() !== "")
      .map((line) => {
        const log = LogEntity.fromJSON(line);
        if (!log) throw new Error(`Error parsing log: ${line}`);
        return log;
      });
    return logs;
  }

  async getLog(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    if (!this.logsPaths.has(serverityLevel)) {
      throw new Error("Severity level not supported");
    }
    const logs = this.getLogsFromFile(this.logsPaths.get(serverityLevel)!);
    return logs;
  }

  async getAllLogs(): Promise<LogEntity[]> {
    return this.getLogsFromFile(this.logsPaths.get(LogSeverityLevel.low)!);
  }
}
