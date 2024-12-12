import { AbsUserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { AbsUserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImp implements AbsUserRepository {
  constructor(private readonly datasource: AbsUserDatasource) {}

  create(createTodoDto: CreateUserDto): Promise<UserEntity> {
    return this.datasource.create(createTodoDto);
  }
  getAll(): Promise<UserEntity[]> {
    return this.datasource.getAll();
  }
  getById(id: number): Promise<UserEntity | undefined> {
    return this.datasource.getById(id);
  }
  update(updateTodoDto: UpdateUserDto): Promise<UserEntity | undefined> {
    return this.datasource.update(updateTodoDto);
  }
  delete(id: number): Promise<UserEntity> {
    return this.datasource.delete(id);
  }
}
