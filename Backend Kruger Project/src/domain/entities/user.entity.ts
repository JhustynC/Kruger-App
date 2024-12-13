export enum UserRol {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}

export class UserEntity {
  constructor(
    public readonly idCard: string,
    public readonly coordinates: [number, number],
    public readonly names: string,
    public readonly surnames: string,
    public readonly mail: string,
    public readonly role: UserRol,
    public readonly username: string,
    public readonly password: string
  ) {}

  static mapDbUserRolToUserRol = (dbRol: string): UserRol => {
    switch (dbRol) {
      case "ADMIN":
        return UserRol.ADMIN;
      case "CLIENT":
        return UserRol.CLIENT;
      default:
        throw new Error(`Unhandled user role: ${dbRol}`);
    }
  };

  static fromObject = (object: { [key: string]: any }): UserEntity => {
    const {
      idCard,
      coordinates,
      names,
      surnames,
      mail,
      role,
      username,
      password,
    } = object;

    if (!idCard) throw new Error("idCard is required");
    if (!coordinates) throw new Error("coordinates are required");
    if (!names) throw new Error("firstName is required");
    if (!surnames) throw new Error("lastName is required");
    if (!mail) throw new Error("mail is required");
    if (!role) throw new Error("role is required");
    if (!password) throw new Error("password is required");

    // Validación de que coordinates sea un array de números
    if (
      !(
        coordinates.length === 2 &&
        typeof coordinates[0] === "number" &&
        typeof coordinates[1] === "number"
      )
    ) {
      throw new Error("Coordinates must be an array of numbers");
    }

    // Map the database level to your project enum
    const entityRole = Object.values(UserRol).includes(role)
      ? (role as UserRol) // Si pertenece, usa el valor directamente
      : UserEntity.mapDbUserRolToUserRol(role); // Si no, usa el mapeo

    const user = new UserEntity(
      idCard,
      coordinates,
      names,
      surnames,
      mail,
      entityRole,
      username,
      password
    );
    return user;
  };
}
