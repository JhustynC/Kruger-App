import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { UserEntity } from "../../entities/user.entity";
import { AbsLogRepository } from "../../repositories/log.repository";
import { AbsUserRepository } from "../../repositories/user.repository";

export interface IDeleteUserUseCase {
  exceute(idCard: string): Promise<UserEntity>;
}

export class DeleteUser implements IDeleteUserUseCase {
  private origin: string = "delete-user.usecas.ts";
  constructor(
    public readonly repository: AbsUserRepository,
    private readonly logRepository: AbsLogRepository
  ) {}

  async exceute(idCard: string): Promise<UserEntity> {
    const logEntity = new LogEntity({
      level: LogSeverityLevel.high,
      message: `User with ${idCard} deleted successfully`,
      origin: this.origin,
    });
    this.logRepository.saveLog(logEntity);
    return await this.repository.delete(idCard);
  }
}
