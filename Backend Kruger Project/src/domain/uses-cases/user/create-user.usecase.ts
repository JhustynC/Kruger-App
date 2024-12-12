import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { AbsUserRepository } from "../../repositories/user.repository";

export interface IUserUserUseCase {
  exceute(dto: CreateUserDto): Promise<UserEntity>;
}

export class CreateUser implements IUserUserUseCase {
  constructor(public readonly repository: AbsUserRepository) {}

  async exceute(dto: CreateUserDto): Promise<UserEntity> {
    return await this.repository.create(dto);
  }
}
