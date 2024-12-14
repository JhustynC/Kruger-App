import { UserRol } from "@prisma/client";
import { prisma } from "../../config/data/postgres";
import { AbsUserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import bcrypt from "bcrypt";

const rolesDB = {
  ADMIN: UserRol.ADMIN,
  CLIENT: UserRol.CLIENT,
};

export class UserDatasourceImp implements AbsUserDatasource {

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { coordinates, role } = createUserDto;
    const coordinatesToString = `${coordinates[0]}, ${coordinates[1]}`;
    const roleDB = rolesDB[role as keyof typeof rolesDB];

    //Verficamos si el usuario ya existe en la base de datos
    const fetchUser = await prisma.user.findFirst({
      where: {
        OR: [{ idCard: createUserDto.idCard }, { mail: createUserDto.mail }],
      },
    });

    if (fetchUser) {
      if (fetchUser.idCard === createUserDto.idCard) {
        throw new Error("A user with this idCard already exists");
      }
      if (fetchUser.mail === createUserDto.mail) {
        throw new Error("A user with this email already exists");
      }
    }

    //Encriptación de la contraseña
    const passwordHashed = await bcrypt.hash(createUserDto.password, 10);

    const user = await prisma.user.create({
      data: {
        idCard: createUserDto.idCard,
        coordinates: coordinatesToString,
        names: createUserDto.names,
        surnames: createUserDto.surnames,
        mail: createUserDto.mail,
        role: roleDB,
        username: createUserDto.mail,
        password: passwordHashed,
      },
    });

    return UserEntity.fromObject(user);
  }
  async getAll(): Promise<UserEntity[]> {
    const todos = await prisma.user.findMany();
    return todos.map((user) => UserEntity.fromObject(user));
  }
  async getById(idCard: string): Promise<UserEntity | undefined> {
    const userObject = await prisma.user.findUnique({
      where: {
        idCard: idCard,
      },
    });
    if (userObject) return UserEntity.fromObject(userObject!);
    throw `Todo with idCard ${idCard} not found`;
  }

  async update(updateUsesrDto: UpdateUserDto): Promise<UserEntity | undefined> {
    const { idCard } = updateUsesrDto;

    await this.getById(idCard);

    const updateUser = await prisma.user.update({
      where: {
        idCard: idCard,
      },
      data: {
        ...updateUsesrDto.values,
      },
    });

    if (updateUser) return UserEntity.fromObject(updateUser);
  }

  async delete(idCard: string): Promise<UserEntity> {
    await this.getById(idCard);

    const user = await prisma.user.delete({
      where: {
        idCard,
      },
    });

    if (user) return UserEntity.fromObject(user);
    throw `Error deleting user with idCard); ${idCard}`;
  }
}
