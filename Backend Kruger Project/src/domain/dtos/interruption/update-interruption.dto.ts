export class UpdateInterruptionDto {
  private constructor(
    public readonly id: number,
    public readonly startTime?: string,
    public readonly endTime?: string,
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

  static create(props: {
    [key: string]: any;
  }): [string?, UpdateInterruptionDto?] {
    const { id, startTime, endTime, sectorId } = props;

    if (id !== undefined) {
      if (typeof id !== "number" || id <= 0) {
        return ["ID must be a positive number", undefined];
      }
    }

    if (startTime) {
      if (typeof startTime !== "string" || isNaN(Date.parse(startTime))) {
        return ["StartTime must be a valid date string", undefined];
      }
    }

    if (endTime) {
      if (typeof endTime !== "string" || isNaN(Date.parse(endTime))) {
        return ["EndTime must be a valid date string", undefined];
      }
      if (startTime && new Date(startTime) >= new Date(endTime)) {
        return ["EndTime must be after StartTime", undefined];
      }
    }

    if (sectorId !== undefined) {
      if (typeof sectorId !== "number" || sectorId <= 0) {
        return ["SectorId must be a positive number", undefined];
      }
    }

    return [
      undefined,
      new UpdateInterruptionDto(id, startTime, endTime, sectorId),
    ];
  }
}
