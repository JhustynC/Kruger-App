export class InterruptionEntity {
  constructor(
    public readonly start_time: string,
    public readonly end_time: string,
    public readonly name_sector: string,
    public readonly coordinate_polygon: [number, number][] = []
  ) {}

  static fromObject = (object: { [key: string]: any }): InterruptionEntity => {
    const { start_time, end_time, name_sector, coordinate_polygon } = object;
    if (!start_time) throw new Error("start_time is required");
    if (!end_time) throw new Error("end_time is required");
    if (!name_sector) throw new Error("name_sector is required");
    if (!coordinate_polygon) throw new Error("coordinate_polygon is required");

    const interruption = new InterruptionEntity(
      start_time,
      end_time,
      name_sector,
      coordinate_polygon
    );
    return interruption;
  };
}
