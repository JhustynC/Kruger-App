import { AbsInterruptionDatasource } from "../../domain/datasources/interruption.datasource";
import { InterruptionEntity } from "../../domain/entities/interruption.entity";
import { SectorEntity } from "../../domain/entities/sector.entity";
import { prisma } from "../../config/data/postgres";
import { CreateInterruptionDto } from "../../domain/dtos/interruption/create-interruption.dto";
import { UpdateInterruptionDto } from "../../domain/dtos/interruption/update-interruption.dto";
import { CreateSectorDto } from "../../domain/dtos/sector/create-sector.dto";
import { UpdateSectorDto } from "../../domain/dtos/sector/update-sector.dto";

export class InterruptionDatasourceImp implements AbsInterruptionDatasource {
  async createSector(createSectorDto: CreateSectorDto): Promise<SectorEntity> {
    console.log("EN EL DATASOURCE");
    console.log(createSectorDto);
    const { id, name, polygon } = createSectorDto;

    const polygonString = polygon.map(([x, y]) => `(${x},${y})`).join(",");
    console.log(polygonString);

    const sector = await prisma.sector.create({
      data: { name: createSectorDto.name, polygon: polygonString },
    });

    if (sector) {
      return SectorEntity.fromObject(sector);
    }
    throw new Error("Error creating sector");
  }

  async getById(id: number): Promise<SectorEntity> {
    const sectorObject = await prisma.sector.findUnique({
      where: {
        id: id,
      },
    });
    if (sectorObject) return SectorEntity.fromObject(sectorObject!);
    throw `Sector with id ${id} not found`;
  }

  async updateSector(updateSectorDto: UpdateSectorDto): Promise<SectorEntity> {
    const { id } = updateSectorDto;

    await this.getById(id);

    const updateSector = await prisma.sector.update({
      where: {
        id: id,
      },
      data: {
        ...updateSectorDto.values,
      },
    });

    if (updateSector) return SectorEntity.fromObject(updateSector);
    throw new Error("Problem updating sector");
  }
  async deleteSector(id: number): Promise<SectorEntity> {
    const sectorToDelete = await prisma.sector.delete({
      where: {
        id: id,
      },
    });

    if (sectorToDelete) return SectorEntity.fromObject(sectorToDelete);
    throw `Error deleting sector with id ${id}`;
  }
  async createInterruption(
    createInterruptionDtp: CreateInterruptionDto
  ): Promise<InterruptionEntity> {
    const { id, startTime, endTime, sectorId } = createInterruptionDtp;
    const interruption = await prisma.interruption.create({
      data: { startTime, endTime, sectorId },
    });
    return InterruptionEntity.fromObject(interruption);
  }
  async updateInterruption(
    updateInterruptionDto: UpdateInterruptionDto
  ): Promise<InterruptionEntity> {
    const { id } = updateInterruptionDto;
    // await this.getById(id);
    console.log(updateInterruptionDto);
    const updatedInterruption = await prisma.interruption.update({
      where: {
        id: id,
      },
      data: {
        ...updateInterruptionDto.values,
      },
    });
    return InterruptionEntity.fromObject(updatedInterruption);
  }
  async deleteInterruption(id: number): Promise<InterruptionEntity> {
    const interruption = await prisma.interruption.delete({
      where: {
        id: id,
      },
    });
    if (interruption) return InterruptionEntity.fromObject(interruption);
    throw new Error("Error deleting interruption");
  }
  async getAllInterruptions(): Promise<InterruptionEntity[]> {
    const allInterruptions = (await prisma.interruption.findMany()).map(
      (interruption) => InterruptionEntity.fromObject(interruption)
    );

    return allInterruptions;
  }
  async getAllSectors(): Promise<SectorEntity[]> {
    const allSectors = (await prisma.sector.findMany()).map((sector) =>
      SectorEntity.fromObject(sector)
    );

    return allSectors;
  }

  private isInside(edges: [number, number][], xp: number, yp: number): boolean {
    let cnt = 0;
    const n = edges.length;

    for (let i = 0; i < n; i++) {
      const [x1, y1] = edges[i];
      const [x2, y2] = edges[(i + 1) % n]; // Conectar el último punto con el primero

      if (
        yp < y1 !== yp < y2 &&
        xp < x1 + ((yp - y1) / (y2 - y1)) * (x2 - x1)
      ) {
        cnt += 1;
      }
    }

    return cnt % 2 === 1;
  }

  async getByCoordinates(
    coordinates: [number, number]
  ): Promise<InterruptionEntity | undefined> {
    console.log("CORDENADAS");
    console.log(coordinates);

    const allSector = await this.getAllSectors();
    const sector = allSector.find((s) =>
      this.isInside(s.polygon, coordinates[0], coordinates[1])
    );

    console.log("ESTE ES EL SECTOR");
    console.log(sector);

    const allIntterruptions = await this.getAllInterruptions();
    const interruption = allIntterruptions.find(
      (i) => i.sectorId === sector?.id
    );

    console.log("ESTE ES LA INTERRUPCION");
    console.log(interruption);

    if (interruption) {
      return interruption;
    } else {
      console.log("NO SE ENCOTRO CORTES PARA ESTAS COORDENADAS");
      return undefined;
    }
  }
}
