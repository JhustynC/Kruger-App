import { CreateSectorDto } from "../../dtos/sector/create-sector.dto";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { SectorEntity } from "../../entities/sector.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";
import { AbsLogRepository } from "../../repositories/log.repository";

export interface ICreateSectorUseCase {
  exceute(createSectorDto: CreateSectorDto): Promise<SectorEntity>;
}

export class CreateSector implements ICreateSectorUseCase {
  private origin: string = "create-sector.useCase";
  constructor(
    public readonly repository: AbsInterruptionRepository,
    private readonly logRepository: AbsLogRepository
  ) {}

  async exceute(createSectorDto: CreateSectorDto): Promise<SectorEntity> {
    const logEntity = new LogEntity({
      level: LogSeverityLevel.high,
      message: `Create ${createSectorDto.name} successfully`,
      origin: this.origin,
    });
    this.logRepository.saveLog(logEntity);
    return await this.repository.createSector(createSectorDto);
  }
}
