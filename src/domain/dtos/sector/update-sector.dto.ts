export class UpdateSectorDto {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly polygon: string
  ) {}

  public get values() {
    const values: { [key: string]: any } = {};

    if (this.id) {
      values.id = this.id;
    }
    if (this.name) {
      values.name = this.name;
    }
    if (this.polygon.length > 0) {
      values.polygon = this.polygon;
    }

    return values;
  }

  static create(props: { [key: string]: any }): [string?, UpdateSectorDto?] {
    let { id, name, polygon } = props;
    let polygonArray: [number, number][] = [];

    // Validación del id
    if (id) {
      try {
        id = parseInt(id);
      } catch (e) {
        return ["ID must be a valid number", undefined];
      }
    }
    if (!id || typeof id !== "number") {
      return ["ID must be a valid number", undefined];
    }

    // Validación del nombre
    if (!name || typeof name !== "string") {
      return ["Name must be a valid string", undefined];
    }
    if (name.length < 2 || name.length > 50) {
      return ["Name must be between 2 and 50 characters", undefined];
    }

    // Validación del polígono
    if (!polygon) {
      return ["Polygon is required", undefined];
    }

    if (typeof polygon === "string") {
      try {
        polygonArray = this.polygonStringToArray(polygon);
      } catch (error) {
        return ["Coordinates string to array conversion failed", undefined];
      }
    } else if (
      !Array.isArray(polygon) ||
      polygon.some(
        (p) =>
          !Array.isArray(p) ||
          p.length !== 2 ||
          typeof p[0] !== "number" ||
          typeof p[1] !== "number"
      )
    ) {
      return [
        "Polygon must be an array of coordinate pairs (number, number)",
        undefined,
      ];
    } else {
    }

    return [undefined, new UpdateSectorDto(id, name, polygon.toString())];
  }

  // Método de conversión de coordenadas (se puede reutilizar del modelo original)
  static polygonStringToArray(texto: string): [number, number][] {
    const regex = /\((\d+\.\d+),(\d+\.\d+)\)/g;
    let resultado: [number, number][] = [];
    let match;

    while ((match = regex.exec(texto)) !== null) {
      const num1 = parseFloat(match[1]);
      const num2 = parseFloat(match[2]);
      resultado.push([num1, num2]);
    }

    return resultado;
  }
}
