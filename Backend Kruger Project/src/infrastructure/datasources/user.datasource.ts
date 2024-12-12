import { UserRol } from "@prisma/client";
import { prisma } from "../../config/data/postgres";
import { AbsUserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";

const rolesDB = {
  ADMIN: UserRol.ADMIN,
  CLIENT: UserRol.CLIENT,
};

export class UserDatasourceImp implements AbsUserDatasource {
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { coordinates, role } = createUserDto;
    const coordinatesToString = `${coordinates[0]}, ${coordinates[1]}`;
    const roleDB = rolesDB[role as keyof typeof rolesDB];

    const fetchUser = await prisma.user.findFirst({
      where: {
        idCard: createUserDto.idCard,
      },
    });

    if (fetchUser) {
      throw new Error("User with this idCard already exists");
    }

    const user = await prisma.user.create({
      data: {
        idCard: createUserDto.idCard,
        coordinates: coordinatesToString,
        names: createUserDto.names,
        surnames: createUserDto.surnames,
        mail: createUserDto.mail,
        role: roleDB,
        username: createUserDto.username,
        password: createUserDto.password,
      },
    });

    return UserEntity.fromObject(user);
  }
  getAll(): Promise<UserEntity[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: number): Promise<UserEntity | undefined> {
    throw new Error("Method not implemented.");
  }

  update(updateTodoDto: UpdateUserDto): Promise<UserEntity | undefined> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}
