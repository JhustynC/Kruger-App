import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { UserEntity } from "../../entities/user.entity";
import { AbsLogRepository } from "../../repositories/log.repository";
import { AbsUserRepository } from "../../repositories/user.repository";

export interface IUserUserUseCase {
  exceute(dto: CreateUserDto): Promise<UserEntity>;
}

export class CreateUser implements IUserUserUseCase {
  private origin: string = "create-user.usecas.ts";
  constructor(
    public readonly repository: AbsUserRepository,
    private readonly logRepository: AbsLogRepository
  ) {}

  async exceute(dto: CreateUserDto): Promise<UserEntity> {
    const logEntity = new LogEntity({
      level: LogSeverityLevel.high,
      message: `Create ${dto.idCard} successfully`,
      origin: this.origin,
    });
    this.logRepository.saveLog(logEntity);
    return await this.repository.create(dto);
  }
}
