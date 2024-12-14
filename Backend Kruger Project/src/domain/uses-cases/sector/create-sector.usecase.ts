import { CreateSectorDto } from "../../dtos/sector/create-sector.dto";
import { SectorEntity } from "../../entities/sector.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";

export interface ICreateSectorSectorUseCase {
  exceute(createSectorDto: CreateSectorDto): Promise<SectorEntity>;
}

export class GetSectorSector implements ICreateSectorSectorUseCase {
  constructor(public readonly repository: AbsInterruptionRepository) {}

  async exceute(createSectorDto: CreateSectorDto): Promise<SectorEntity> {
    return await this.repository.createSector(createSectorDto);
  }
}
