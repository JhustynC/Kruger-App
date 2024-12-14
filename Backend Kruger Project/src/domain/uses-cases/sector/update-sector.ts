import { UpdateSectorDto } from "../../dtos/sector/update-sector.dto";
import { SectorEntity } from "../../entities/sector.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";

export interface IUpdateSectorUseCase {
  exceute(updateSectorDto: UpdateSectorDto): Promise<SectorEntity>;
}

export class UpdateSector implements IUpdateSectorUseCase {
  constructor(public readonly repository: AbsInterruptionRepository) {}

  async exceute(updateSectorDto: UpdateSectorDto): Promise<SectorEntity> {
    return await this.repository.updateSector(updateSectorDto);
  }
}
