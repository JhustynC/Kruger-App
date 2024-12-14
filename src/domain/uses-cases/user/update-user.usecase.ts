import { UpdateUserDto } from "../../dtos/user/update-user.dto";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { UserEntity } from "../../entities/user.entity";
import { AbsLogRepository } from "../../repositories/log.repository";
import { AbsUserRepository } from "../../repositories/user.repository";

export interface IUpdateUserUseCase {
  exceute(dto: UpdateUserDto): Promise<UserEntity | undefined>;
}

export class UpdateUser implements IUpdateUserUseCase {
  private origin: string = "update-user.usecase.ts";
  constructor(
    public readonly repository: AbsUserRepository,
    private readonly logRepository: AbsLogRepository
  ) {}

  async exceute(dto: UpdateUserDto): Promise<UserEntity | undefined> {
    const logEntity = new LogEntity({
      level: LogSeverityLevel.high,
      message: `Update user with idCard ${dto.idCard} successfully`,
      origin: this.origin,
    });
    this.logRepository.saveLog(logEntity);
    return await this.repository.update(dto);
  }
}
