import { $Enums } from "@prisma/client";

export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
  mailer = "mailer",
}

export interface ILogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createAt?: Date;
  origin: string;
}

export interface ILogPostgres {
  id: number;
  message: string;
  origin: string;
  level: $Enums.SeverityLevel;
  createAt: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;
  public origin: string;

  constructor({ level, message, origin, createAt }: ILogEntityOptions) {
    this.level = level;
    this.message = message;
    this.createAt = createAt ?? new Date();
    this.origin = origin;
  }

  static mapDbSeverityLevelToLogSeverityLevel = (
    dbLevel: string
  ): LogSeverityLevel => {
    switch (dbLevel) {
      case "LOW":
        return LogSeverityLevel.low;
      case "MEDIUM":
        return LogSeverityLevel.medium;
      case "HIGH":
        return LogSeverityLevel.high;
      default:
        throw new Error(`Unhandled severity level: ${dbLevel}`);
    }
  };

  static fromJSON = (jsonObject: string): LogEntity | null => {
    // if (!jsonObject || jsonObject.trim() === "") jsonObject = "{}";
    try {
      const { message, level, createAt, origin } = JSON.parse(jsonObject);
      if (!message || !level || !createAt || !origin) return null;
      const log = new LogEntity({
        level: level,
        message: message,
        createAt: new Date(createAt),
        origin: origin,
      });
      return log;
    } catch {
      return null;
    }
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { level, message, origin, createAt } = object;

    // Map the database level to your project enum
    const logLevel = Object.values(LogSeverityLevel).includes(level)
      ? (level as LogSeverityLevel) // Si pertenece, usa el valor directamente
      : LogEntity.mapDbSeverityLevelToLogSeverityLevel(level); // Si no, usa el mapeo

    const log = new LogEntity({
      level: logLevel,
      message,
      createAt,
      origin,
    });
    return log;
  };
}
