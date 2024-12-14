import { CreateInterruptionDto } from "../../dtos/interruption/create-interruption.dto";
import { InterruptionEntity } from "../../entities/interruption.entity";
import { AbsInterruptionRepository } from "../../repositories/interruption.repository";

export interface ICreateInterruptionSectorUseCase {
  exceute(
    createInterruptionDto: CreateInterruptionDto
  ): Promise<InterruptionEntity>;
}

export class CreateInterruption implements ICreateInterruptionSectorUseCase {
  constructor(public readonly repository: AbsInterruptionRepository) {}

  async exceute(
    createInterruptionDto: CreateInterruptionDto
  ): Promise<InterruptionEntity> {
    return await this.repository.createInterruption(createInterruptionDto);
  }
}
