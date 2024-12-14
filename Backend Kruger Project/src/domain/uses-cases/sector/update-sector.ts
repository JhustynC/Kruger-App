import { UpdateSectorDto } from "../../dtos/sector/update-sector.dto";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { SectorEntity } from "../../entities/sector.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";
import { AbsLogRepository } from "../../repositories/log.repository";

export interface IUpdateSectorUseCase {
  exceute(updateSectorDto: UpdateSectorDto): Promise<SectorEntity>;
}

export class UpdateSector implements IUpdateSectorUseCase {
  private origin = "update-sector.usecase.ts";
  constructor(
    public readonly repository: AbsInterruptionRepository,
    private readonly logRepository: AbsLogRepository
  ) {}

  async exceute(updateSectorDto: UpdateSectorDto): Promise<SectorEntity> {
    const logEntity = new LogEntity({
      level: LogSeverityLevel.high,
      message: `Delete Sector whit ${updateSectorDto.name} successfully`,
      origin: this.origin,
    });
    this.logRepository.saveLog(logEntity);
    return await this.repository.updateSector(updateSectorDto);
  }
}
