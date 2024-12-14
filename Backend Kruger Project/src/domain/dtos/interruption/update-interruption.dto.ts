export class UpdateInterruptionDto {
  private constructor(
    public readonly id: number,
    public readonly startTime?: Date,
    public readonly endTime?: Date,
    public readonly sectorId?: number
  ) {}

  public get values() {
    const values: { [key: string]: any } = {};

    if (this.id !== undefined) {
      values.id = this.id;
    }
    if (this.startTime) {
      values.startTime = this.startTime;
    }
    if (this.endTime) {
      values.endTime = this.endTime;
    }
    if (this.sectorId !== undefined) {
      values.sectorId = this.sectorId;
    }

    return values;
  }

  static parseTimeToTimestamp(hour: string): Date {
    const today = new Date(); // Obtiene la fecha actual
    const [hours, minutes] = hour.split(":").map(Number); // Divide la hora y convierte a números

    today.setHours(hours, minutes, 0, 0); // Ajusta horas, minutos, segundos y milisegundos
    return today; // Devuelve el objeto Date
  }

  static create(props: {
    [key: string]: any;
  }): [string?, UpdateInterruptionDto?] {
    let { id, startTime, endTime, sectorId } = props;
    let startTimeDate: Date = new Date();
    let endTimeDate: Date = new Date();

    if (id) {
      if (typeof id !== "number" || id <= 0) {
        try {
          id = parseInt(id);
        } catch (e) {
          return ["ID must be a positive number", undefined];
        }
      }
    }

    if (startTime) {
      if (typeof startTime === "string") {
        try {
          startTimeDate = this.parseTimeToTimestamp(startTime);
        } catch (e) {
          return ["StartTime must be a valid date string", undefined];
        }
      }
    }

    if (endTime) {
      if (typeof endTime === "string") {
        try {
          endTimeDate = this.parseTimeToTimestamp(endTime);
        } catch (e) {
          return ["EndTime must be a valid date string", undefined];
        }
      }
      if (startTime && new Date(startTime) >= new Date(endTime)) {
        return ["EndTime must be after StartTime", undefined];
      }
    }

    if (sectorId) {
      if (typeof sectorId !== "number" || sectorId <= 0) {
        try {
          sectorId = parseInt(sectorId);
        } catch (e) {
          return ["SectorId must be a positive number", undefined];
        }
      }
    }

    return [
      undefined,
      new UpdateInterruptionDto(id, startTimeDate, endTimeDate, sectorId),
    ];
  }
}
