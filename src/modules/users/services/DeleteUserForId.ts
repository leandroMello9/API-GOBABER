import { inject, injectable } from 'tsyringe';
import UserModel from '../infra/typeorm/entities/User';
import UserRepository from '../infra/repositories/UserRepository';

@injectable()
class DeleteUser {
  private repository: UserRepository;

  constructor(@inject('UsersRepository') repository: UserRepository) {
    this.repository = repository;
  }

  public async execute(id: string): Promise<UserModel | undefined> {
    const user = await this.repository.delete(id);

    return user;
  }
}
export default DeleteUser;
