import { CreateSectorDto } from "../../dtos/sector/create-sector.dto";
import { SectorEntity } from "../../entities/sector.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";

export interface ICreateSectorUseCase {
  exceute(createSectorDto: CreateSectorDto): Promise<SectorEntity>;
}

export class CreateSector implements ICreateSectorUseCase {
  constructor(public readonly repository: AbsInterruptionRepository) {}

  async exceute(createSectorDto: CreateSectorDto): Promise<SectorEntity> {
    console.log("EN EL CASO DE USO");
    return await this.repository.createSector(createSectorDto);
  }
}
