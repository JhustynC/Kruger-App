import { UpdateInterruptionDto } from "../../dtos/interruption/update-interruption.dto";
import { InterruptionEntity } from "../../entities/interruption.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";

export interface IUpdateInterruptionUseCase {
  exceute(
    updateInterruptionDto: UpdateInterruptionDto
  ): Promise<InterruptionEntity>;
}

export class GetSectorSector implements IUpdateInterruptionUseCase {
  constructor(public readonly repository: AbsInterruptionRepository) {}

  async exceute(
    updateInterruptionDto: UpdateInterruptionDto
  ): Promise<InterruptionEntity> {
    return await this.repository.updateInterruption(updateInterruptionDto);
  }
}
