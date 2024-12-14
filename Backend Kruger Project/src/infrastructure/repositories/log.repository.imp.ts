import { AbsLogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { AbsLogRepository } from "../../domain/repositories/log.repository";

export class LogRepositoryImpl implements AbsLogRepository {
  constructor(private logDatasource: AbsLogDatasource) {}

  saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }

  getLog(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLog(serverityLevel);
  }

  getAllLogs(): Promise<LogEntity[]> {
    return this.logDatasource.getAllLogs();
  }
}
