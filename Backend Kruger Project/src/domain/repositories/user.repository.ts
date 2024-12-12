import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AbsUserRepository {
  abstract create(createTodoDto: CreateUserDto): Promise<UserEntity>;

  //Todo: paginación
  abstract getAll(): Promise<UserEntity[]>;

  abstract getById(id: number): Promise<UserEntity | undefined>;

  abstract update(
    updateTodoDto: UpdateUserDto
  ): Promise<UserEntity | undefined>;

  abstract delete(id: number): Promise<UserEntity>;
}
