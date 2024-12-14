export class CreateInterruptionDto {
  private constructor(
    public readonly startTime: Date,
    public readonly endTime: Date,
    public readonly sectorId: number,
    public readonly id?: number
  ) {}

  static parseTimeToTimestamp(hour: string): Date {
    const today = new Date(); // Obtiene la fecha actual
    const [hours, minutes] = hour.split(":").map(Number); // Divide la hora y convierte a números

    today.setHours(hours, minutes, 0, 0); // Ajusta horas, minutos, segundos y milisegundos
    return today; // Devuelve el objeto Date
  }

  static create(props: {
    [key: string]: any;
  }): [string?, CreateInterruptionDto?] {
    try {
      let { startTime, endTime, sectorId } = props;
      console.log(props);

      let starTimeDate: Date = new Date();
      let endTimeDate: Date = new Date();

      if (!startTime) {
        return ["StartTime is required", undefined];
      } else {
        starTimeDate = this.parseTimeToTimestamp(startTime);
      }

      if (!endTime) {
        return ["EndTime is required", undefined];
      } else {
        endTimeDate = this.parseTimeToTimestamp(endTime);
        if (starTimeDate >= endTimeDate) {
          return ["EndTime must be after StartTime", undefined];
        }
      }

      if (!sectorId) {
        return ["SectorId is required", undefined];
      } else {
        if (typeof sectorId !== "number" || sectorId <= 0) {
          try {
            sectorId = parseInt(sectorId);
          } catch (e) {
            return ["Erro parsing sectorId or range not valid", undefined];
          }
        }
      }

      return [
        undefined,
        new CreateInterruptionDto(starTimeDate, endTimeDate, sectorId),
      ];
    } catch (e) {
      console.error(e);
      return [(e as any).toString(), undefined];
    }
  }
}
