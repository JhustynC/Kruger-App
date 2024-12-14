export class InterruptionEntity {
  constructor(
    public readonly id: number,
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly sectorId: number
  ) {}

  static formatTimeToHHMM(dateString: string) {
    const date = new Date(dateString); // Convertir la cadena ISO a un objeto Date
    const hours = String(date.getHours()).padStart(2, "0"); // Obtener horas y asegurarse de que tenga 2 dígitos
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Obtener minutos y asegurarse de que tenga 2 dígitos
    return `${hours}:${minutes}`; // Retornar el formato "HH:mm"
  }

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
