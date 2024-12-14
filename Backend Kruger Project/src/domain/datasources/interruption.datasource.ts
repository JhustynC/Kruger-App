import { CreateInterruptionDto } from "../dtos/interruption/create-interruption.dto";
import { UpdateInterruptionDto } from "../dtos/interruption/update-interruption.dto";
import { CreateSectorDto } from "../dtos/sector/create-sector.dto";
import { UpdateSectorDto } from "../dtos/sector/update-sector.dto";
import { InterruptionEntity } from "../entities/interruption.entity";
import { SectorEntity } from "../entities/sector.entity";

export abstract class AbsInterruptionDatasource {
  abstract getByCoordinates(
    coordinates: [number, number]
  ): Promise<InterruptionEntity | undefined>;

  abstract getAllSectors(): Promise<SectorEntity[]>;
  abstract createSector(
    createSectorDto: CreateSectorDto
  ): Promise<SectorEntity>;
  abstract updateSector(
    updateSectorDto: UpdateSectorDto
  ): Promise<SectorEntity>;
  abstract deleteSector(id: number): Promise<SectorEntity>;

  abstract getAllInterruptions(): Promise<InterruptionEntity[]>;
  abstract createInterruption(
    createInterruptionDto: CreateInterruptionDto
  ): Promise<InterruptionEntity>;
  abstract updateInterruption(
    updateInterruptionDto: UpdateInterruptionDto
  ): Promise<InterruptionEntity>;
  abstract deleteInterruption(id: number): Promise<InterruptionEntity>;
}
