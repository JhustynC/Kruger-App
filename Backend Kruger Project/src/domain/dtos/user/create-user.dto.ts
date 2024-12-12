import { UserRol } from "../../entities/user.entity";

export class CreateUserDto {
  private constructor(
    public readonly idCard: string,
    public readonly coordinates: [number, number],
    public readonly names: string,
    public readonly surnames: string,
    public readonly mail: string,
    public readonly role: UserRol,
    public readonly username: string,
    public readonly password: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
    const {
      idCard,
      coordinates,
      names,
      surnames,
      mail,
      role,
      username,
      password,
    } = props;

    if (!idCard) {
      return ["Id must be a number", undefined];
    }
    if (isNaN(idCard)) {
      return ["Id must be a number", undefined];
    }

    if (!coordinates) ["Address Coordinates is required", undefined];
    else {
      if (!Array.isArray(coordinates)) {
        return ["Address Coordinates must be an array", undefined];
      }
      if (coordinates.length !== 2) {
        return [
          "Address Coordinates must contain exactly 2 numbers",
          undefined,
        ];
      }
    }

    if (!names) return ["Names is required", undefined];
    if (names) {
      if (typeof names !== "string") {
        return ["Names must be a string", undefined];
      }
      if (names.length < 2 || names.length > 50) {
        return ["Names must be between 2 and 50 characters", undefined];
      }
      if (!/^[a-zA-Z\s]+$/.test(names)) {
        return [
          "Names can only contain alphabetic characters and spaces",
          undefined,
        ];
      }
    }

    if (!surnames) return ["Surnames is required", undefined];
    if (surnames) {
      if (typeof surnames !== "string") {
        return ["Names must be a string", undefined];
      }
      if (surnames.length < 2 || surnames.length > 50) {
        return ["Names must be between 2 and 50 characters", undefined];
      }
      if (!/^[a-zA-Z\s]+$/.test(surnames)) {
        return [
          "Surnames can only contain alphabetic characters and spaces",
          undefined,
        ];
      }
    }

    if (!mail) return ["mail is required", undefined];
    if (mail) {
      if (typeof mail !== "string") {
        return ["Mail must be a string", undefined];
      }
      if (!/^\S+@\S+\.\S+$/.test(mail)) {
        return ["Invalid email format", undefined];
      }
    }

    if (!role) return ["Role is required", undefined]; // Check if role exists in UserRol enum
    if (role && typeof role === "string") {
      if (!Object.values(UserRol).includes(role as UserRol)) {
        return ["Invalid role", undefined];
      }
    }

    if (!username || typeof username !== "string") {
      return ["Username must be a string", undefined];
    }

    if (!password || typeof password !== "string") {
      return ["Password must be a string", undefined];
    }

    //Transformation body rol to UserRol
    const roleEntity = role as UserRol;

    return [
      undefined,
      new CreateUserDto(
        idCard,
        coordinates,
        names,
        surnames,
        mail,
        roleEntity,
        username,
        password
      ),
    ];
  }
}
