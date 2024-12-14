import { UserEntity } from "../../entities/user.entity";
import { AbsUserRepository } from "../../repositories/user.repository";

export interface IGetUserUseCase {
  exceute(idCard: string): Promise<UserEntity | undefined>;
}

export class GetUser implements IGetUserUseCase {
  constructor(public readonly repository: AbsUserRepository) {}

  async exceute(idCard: string): Promise<UserEntity | undefined> {
    return await this.repository.getById(idCard);
  }
}
