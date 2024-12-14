export class CreateSectorDto {
  private constructor(
    public readonly name: string,
    public readonly polygon: [number, number][],
    public readonly id?: number
  ) {}

  static polygonStringToArray(texto: string): [number, number][] {
    // Expresión regular para capturar números decimales o enteros dentro de paréntesis
    const regex = /\((\d+(?:\.\d+)?),(\d+(?:\.\d+)?)\)/g;
    let resultado: [number, number][] = [];
    let match;

    // Extraemos todas las coincidencias de la expresión regular
    while ((match = regex.exec(texto)) !== null) {
      // Convertimos las cadenas extraídas en números
      const num1 = parseFloat(match[1]);
      const num2 = parseFloat(match[2]);

      // Agregamos la tupla de números al array resultado
      resultado.push([num1, num2]);
    }

    return resultado;
  }

  static create(props: { [key: string]: any }): [string?, CreateSectorDto?] {
    const { name, polygon } = props;
    console.log(polygon);
    const polygonArray = this.polygonStringToArray(polygon);
    console.log("EN EL DTO POLYGON");
    console.log(polygonArray);

    if (!name) {
      return ["Name is required", undefined];
    }
    if (typeof name !== "string" || name.trim().length === 0) {
      return ["Name must be a non-empty string", undefined];
    }
    if (name.length < 2 || name.length > 100) {
      return ["Name must be between 2 and 100 characters", undefined];
    }

    if (!polygon) {
      return ["Polygon is required", undefined];
    }

    return [undefined, new CreateSectorDto(name, polygonArray)];
  }
}
