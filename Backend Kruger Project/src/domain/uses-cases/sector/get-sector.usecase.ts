import { SectorEntity } from "../../entities/sector.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";

export interface IGetSectorUseCase {
  exceute(name: string): Promise<SectorEntity>;
}

export class GetSector implements IGetSectorUseCase {
  constructor(public readonly repository: AbsInterruptionRepository) {}

  async exceute(name: string): Promise<SectorEntity> {
    throw new Error("Method not implemented.");
  }
}
