import { SectorEntity } from "../../entities/sector.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";

export interface IGetSectorsSectorsUseCase {
  exceute(): Promise<SectorEntity[]>;
}

export class GetSectors implements IGetSectorsSectorsUseCase {
  constructor(public readonly repository: AbsInterruptionRepository) {}

  async exceute(): Promise<SectorEntity[]> {
    return await this.repository.getAllSectors();
  }
}
