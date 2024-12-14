import { InterruptionEntity } from "../../entities/interruption.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";

export interface IDeleteInterruptionSectorUseCase {
  exceute(id: number): Promise<InterruptionEntity>;
}

export class DeleteInterruption implements IDeleteInterruptionSectorUseCase {
  constructor(public readonly repository: AbsInterruptionRepository) {}

  async exceute(id: number): Promise<InterruptionEntity> {
    return await this.repository.deleteInterruption(id);
  }
}
