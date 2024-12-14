export class SectorEntity {
  constructor(
    public readonly name: string,
    public readonly polygon: [number, number][] = [],
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

  static fromObject = (object: { [key: string]: any }): SectorEntity => {
    console.log("CAMBIO EN SECTOR ENTITY CON EL ID");
    const { id, name, polygon } = object;

    let polygonArray: [number, number][] = [];

    if (!name || typeof name !== "string")
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

    const sector = new SectorEntity(name, polygonArray, id);
    return sector;
  };
}
