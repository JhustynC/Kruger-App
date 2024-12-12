import { UserEntity } from "../../entities/user.entity";
import { AbsUserRepository } from "../../repositories/user.repository";

export interface IGetUserUseCase {
  exceute(id: number): Promise<UserEntity | undefined>;
}

export class GetUser implements IGetUserUseCase {
  constructor(public readonly repository: AbsUserRepository) {}

  async exceute(id: number): Promise<UserEntity | undefined> {
    return await this.repository.getById(id);
  }
}
