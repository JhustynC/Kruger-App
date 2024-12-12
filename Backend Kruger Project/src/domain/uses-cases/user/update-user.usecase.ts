import { UpdateUserDto } from "../../dtos/user/update-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { AbsUserRepository } from "../../repositories/user.repository";

export interface IUpdateUserUseCase {
  exceute(dto: UpdateUserDto): Promise<UserEntity | undefined>;
}

export class UpdateUser implements IUpdateUserUseCase {
  constructor(public readonly repository: AbsUserRepository) {}

  async exceute(dto: UpdateUserDto): Promise<UserEntity | undefined> {
    return await this.repository.update(dto);
  }
}
