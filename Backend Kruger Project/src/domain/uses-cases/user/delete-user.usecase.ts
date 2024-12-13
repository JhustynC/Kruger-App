import { UserEntity } from "../../entities/user.entity";
import { AbsUserRepository } from "../../repositories/user.repository";

export interface IDeleteUserUseCase {
  exceute(idCard: string): Promise<UserEntity>;
}

export class DeleteUser implements IDeleteUserUseCase {
  constructor(public readonly repository: AbsUserRepository) {}

  async exceute(idCard: string): Promise<UserEntity> {
    return await this.repository.delete(idCard);
  }
}
