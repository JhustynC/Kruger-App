import { AbsInterruptionDatasource } from "../../domain/datasources/interruption.datasource";
import { CreateInterruptionDto } from "../../domain/dtos/interruption/create-interruption.dto";
import { UpdateInterruptionDto } from "../../domain/dtos/interruption/update-interruption.dto";
import { CreateSectorDto } from "../../domain/dtos/sector/create-sector.dto";
import { UpdateSectorDto } from "../../domain/dtos/sector/update-sector.dto";
import { InterruptionEntity } from "../../domain/entities/interruption.entity";
import { SectorEntity } from "../../domain/entities/sector.entity";
import { AbsInterruptionRepository } from "../../domain/repositories/interruption.repository";

export class InterruptionRepositoryImp implements AbsInterruptionRepository {
  constructor(private readonly datasource: AbsInterruptionDatasource) {}

  createSector(createSectorDto: CreateSectorDto): Promise<SectorEntity> {
    return this.datasource.createSector(createSectorDto);
  }
  updateSector(updateSectorDto: UpdateSectorDto): Promise<SectorEntity> {
    return this.datasource.updateSector(updateSectorDto);
  }
  deleteSector(id: number): Promise<SectorEntity> {
    return this.datasource.deleteSector(id);
  }
  createInterruption(
    createInterruptionDto: CreateInterruptionDto
  ): Promise<InterruptionEntity> {
    return this.datasource.createInterruption(createInterruptionDto);
  }
  updateInterruption(
    updateInterruptionDto: UpdateInterruptionDto
  ): Promise<InterruptionEntity> {
    return this.datasource.updateInterruption(updateInterruptionDto);
  }
  deleteInterruption(id: number): Promise<InterruptionEntity> {
    return this.datasource.deleteInterruption(id);
  }

  getByCoordinates(
    coordinates: [number, number]
  ): Promise<InterruptionEntity | undefined> {
    //implementation of ray casting algorithm
    return this.datasource.getByCoordinates(coordinates);
  }

  //? Para sectores
  getAllSectors(): Promise<SectorEntity[]> {
    return this.datasource.getAllSectors();
  }

  //? Para interrupciones
  getAllInterruptions(): Promise<InterruptionEntity[]> {
    return this.datasource.getAllInterruptions();
  }
}
