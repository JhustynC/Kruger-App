export class CreateSectorDto {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly polygon: [number, number][]
  ) {}

  static polygonStringToArray(polygon: string): [number, number][] {
    const regex = /\((\d+\.\d+),(\d+\.\d+)\)/g;
    const result: [number, number][] = [];
    let match;

    while ((match = regex.exec(polygon)) !== null) {
      result.push([parseFloat(match[1]), parseFloat(match[2])]);
    }

    return result;
  }

  static create(props: { [key: string]: any }): [string?, CreateSectorDto?] {
    const { id, name, polygon } = props;

    if (!id) {
      return ["Id is required", undefined];
    }
    if (typeof id !== "number" || isNaN(id)) {
      return ["Id must be a valid number", undefined];
    }

    if (!name) {
      return ["Name is required", undefined];
    }
    if (typeof name !== "string" || name.trim().length === 0) {
      return ["Name must be a non-empty string", undefined];
    }
    if (name.length < 2 || name.length > 100) {
      return ["Name must be between 2 and 100 characters", undefined];
    }

    let polygonArray: [number, number][] = [];

    if (!polygon) {
      return ["Polygon is required", undefined];
    }

    if (typeof polygon === "string") {
      try {
        polygonArray = this.polygonStringToArray(polygon);
      } catch {
        return ["Error parsing polygon string", undefined];
      }
    } else if (Array.isArray(polygon)) {
      if (
        !polygon.every(
          (pair) =>
            Array.isArray(pair) &&
            pair.length === 2 &&
            pair.every((coord) => typeof coord === "number" && !isNaN(coord))
        )
      ) {
        return [
          "Polygon must be an array of [number, number] pairs",
          undefined,
        ];
      }
      polygonArray = polygon;
    } else {
      return ["Polygon must be a string or an array", undefined];
    }

    return [undefined, new CreateSectorDto(id, name, polygonArray)];
  }
}
