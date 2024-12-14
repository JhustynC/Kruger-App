import { InterruptionEntity } from "../../entities/interruption.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";

export interface IGetInterruptionsUseCase {
  exceute(): Promise<InterruptionEntity[]>;
}

export class GetInterruptions implements IGetInterruptionsUseCase {
  constructor(public readonly repository: AbsInterruptionRepository) {}

  async exceute(): Promise<InterruptionEntity[]> {
    return await this.repository.getAllInterruptions();
  }
}
