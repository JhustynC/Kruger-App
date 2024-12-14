import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AbsUserDatasource {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;

  //Todo: paginación
  abstract getAll(): Promise<UserEntity[]>;

  abstract getById(id: string): Promise<UserEntity | undefined>;

  abstract update(
    updateUserDto: UpdateUserDto
  ): Promise<UserEntity | undefined>;

  abstract delete(idCard: string): Promise<UserEntity>;
}
