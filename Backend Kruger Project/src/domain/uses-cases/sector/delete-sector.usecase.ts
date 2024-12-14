import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { SectorEntity } from "../../entities/sector.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";
import { AbsLogRepository } from "../../repositories/log.repository";

export interface IDeleteSectorUseCase {
  exceute(id: number): Promise<SectorEntity>;
}

export class DeleteSector implements IDeleteSectorUseCase {
  private origin: string = "delete-sector.usecase";

  constructor(
    public readonly repository: AbsInterruptionRepository,
    private readonly logRepository: AbsLogRepository
  ) {}

  async exceute(id: number): Promise<SectorEntity> {
    const logEntity = new LogEntity({
      level: LogSeverityLevel.high,
      message: `Delete Sector whit ${id} successfully`,
      origin: this.origin,
    });
    this.logRepository.saveLog(logEntity);
    return await this.repository.deleteSector(id);
  }
}
