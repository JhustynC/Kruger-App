export class InterruptionEntity {
  constructor(
    public readonly id: number,
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly sectorId: number
  ) {}

  static fromObject = (object: { [key: string]: any }): InterruptionEntity => {
    const { id, startTime, endTime, sectorId } = object;
    if (!startTime) throw new Error("startTime is required");
    if (!endTime) throw new Error("endTime is required");
    if (!sectorId) throw new Error("sectorId is required");

    const interruption = new InterruptionEntity(
      id,
      startTime,
      endTime,
      sectorId
    );
    return interruption;
  };
}
