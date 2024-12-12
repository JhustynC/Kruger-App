import { UserEntity } from "../../entities/user.entity";
import { AbsUserRepository } from "../../repositories/user.repository";

export interface IDeleteUserUseCase {
  exceute(id: number): Promise<UserEntity>;
}

export class DeleteUser implements IDeleteUserUseCase {
  constructor(public readonly repository: AbsUserRepository) {}

  async exceute(id: number): Promise<UserEntity> {
    return await this.repository.delete(id);
  }
}
