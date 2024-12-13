import { AbsUserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { AbsUserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImp implements AbsUserRepository {
  constructor(private readonly datasource: AbsUserDatasource) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.datasource.create(createUserDto);
  }
  getAll(): Promise<UserEntity[]> {
    return this.datasource.getAll();
  }
  getById(idCard: string): Promise<UserEntity | undefined> {
    return this.datasource.getById(idCard);
  }
  update(updateUserDto: UpdateUserDto): Promise<UserEntity | undefined> {
    return this.datasource.update(updateUserDto);
  }
  delete(idCard: string): Promise<UserEntity> {
    return this.datasource.delete(idCard);
  }
}
