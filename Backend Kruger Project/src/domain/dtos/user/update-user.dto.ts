import { UserRol } from "../../entities/user.entity";

export class UpdateUserDto {
  private constructor(
    public readonly idCard: string,
    public readonly coordinates?: [number, number],
    public readonly names?: string,
    public readonly surnames?: string,
    public readonly mail?: string,
    public readonly role?: UserRol,
    public readonly username?: string,
    public readonly password?: string
  ) {}

  public get values() {
    const values: { [key: string]: any } = {};

    if (this.idCard) {
      values.idCard = this.idCard;
    }
    if (this.names) {
      values.names = this.names;
    }
    if (this.surnames) {
      values.surnames = this.surnames;
    }
    if (this.mail) {
      values.mail = this.mail;
    }
    if (this.role) {
      values.role = this.role;
    }
    if (this.username) {
      values.username = this.username;
    }
    if (this.password) {
      values.password = this.password;
    }

    return values;
  }

  static create(props: { [key: string]: any }): [string?, UpdateUserDto?] {
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

    if (!idCard || isNaN(idCard)) {
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

    if (mail) {
      if (typeof mail !== "string") {
        return ["Mail must be a string", undefined];
      }
      if (!/^\S+@\S+\.\S+$/.test(mail)) {
        return ["Invalid email format", undefined];
      }
    }

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

    return [
      undefined,
      new UpdateUserDto(
        idCard,
        coordinates,
        names,
        surnames,
        mail,
        role,
        username,
        password
      ),
    ];
  }
}
