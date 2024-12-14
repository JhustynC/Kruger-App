export class CreateInterruptionDto {
  private constructor(
    public readonly id: number,
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly sectorId: number
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, CreateInterruptionDto?] {
    const { id, startTime, endTime, sectorId } = props;

    if (!startTime) {
      return ["StartTime is required", undefined];
    } else {
      if (typeof startTime !== "string" || isNaN(Date.parse(startTime))) {
        return ["StartTime must be a valid date string", undefined];
      }
    }

    if (!endTime) {
      return ["EndTime is required", undefined];
    } else {
      if (typeof endTime !== "string" || isNaN(Date.parse(endTime))) {
        return ["EndTime must be a valid date string", undefined];
      }
      if (new Date(startTime) >= new Date(endTime)) {
        return ["EndTime must be after StartTime", undefined];
      }
    }

    if (!sectorId) {
      return ["SectorId is required", undefined];
    } else {
      if (typeof sectorId !== "number" || sectorId <= 0) {
        return ["SectorId must be a positive number", undefined];
      }
    }

    return [undefined, new CreateInterruptionDto(id, startTime, endTime, sectorId)];
  }
}
