import { InterruptionEntity } from "../../entities/interruption.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";

export interface IGetInterruptionUseCase {
  exceute(
    coordinates: [number, number]
  ): Promise<InterruptionEntity | undefined>;
}

export class GetInterruptioByCoordinates implements IGetInterruptionUseCase {
  constructor(public readonly repository: AbsInterruptionRepository) {}

  async exceute(
    coordinates: [number, number]
  ): Promise<InterruptionEntity | undefined> {
    return await this.repository.getByCoordinates(coordinates);
  }
}
