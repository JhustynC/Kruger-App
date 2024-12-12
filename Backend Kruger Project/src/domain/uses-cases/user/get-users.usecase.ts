import { UserEntity } from "../../entities/user.entity";
import { AbsUserRepository } from "../../repositories/user.repository";

export interface IGetUsersUseCase {
  exceute(): Promise<UserEntity[]>;
}

export class GetUsers implements IGetUsersUseCase {
  constructor(public readonly repository: AbsUserRepository) {}

  async exceute(): Promise<UserEntity[]> {
    return await this.repository.getAll();
  }
}
