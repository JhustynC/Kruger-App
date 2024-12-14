import { SectorEntity } from "../../entities/sector.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";

export interface IDeleteSectorUseCase {
  exceute(id: number): Promise<SectorEntity>;
}

export class DeleteSector implements IDeleteSectorUseCase {
  constructor(public readonly repository: AbsInterruptionRepository) {}

  async exceute(id: number): Promise<SectorEntity> {
    return await this.repository.deleteSector(id);
  }
}
