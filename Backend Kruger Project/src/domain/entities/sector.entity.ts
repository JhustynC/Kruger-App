export class SectorEntity {
  constructor(
    private readonly name: string,
    private readonly polygon: [number, number][]
  ) {}

  static polygonStringToArray(texto: string): [number, number][] {
    // Utilizamos una expresión regular para extraer las tuplas
    const regex = /\((\d+\.\d+),(\d+\.\d+)\)/g;
    let resultado: [number, number][] = [];
    let match;

    // Buscamos todas las coincidencias de la expresión regular
    while ((match = regex.exec(texto)) !== null) {
      // match[1] y match[2] son las partes que corresponden a los números
      const num1 = parseFloat(match[1]);
      const num2 = parseFloat(match[2]);

      // Agregamos la tupla de números al array resultado
      resultado.push([num1, num2]);
    }

    return resultado;
  }

  static fromObject = (object: { [key: string]: any }): SectorEntity => {
    const { name, polygon } = object;
    let polygonArray: [number, number][] = [];

    if (!name || typeof name === "string")
      throw new Error("Sector name is required");
    if (!polygon) throw new Error("Polygon are required");

    // Validación de que coordinates sea un array de números
    if (typeof polygon === "string") {
      try {
        polygonArray = this.polygonStringToArray(polygon);
      } catch (error) {
        throw new Error("Coordinates to array fail");
      }
    } else if (!Array.isArray(polygon))
      throw new Error("Coordinates must be an array of numbers");

    const sector = new SectorEntity(name, polygonArray);
    return sector;
  };
}
  