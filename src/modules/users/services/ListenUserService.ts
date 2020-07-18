import { inject, injectable } from 'tsyringe';
import UserModel from '../infra/typeorm/entities/User';
import UserRepository from '../infra/repositories/UserRepository';

@injectable()
class ListenUserService {
  private repository: UserRepository;

  constructor(@inject('UsersRepository') repository: UserRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<UserModel[] | undefined> {
    const users = await this.repository.find();

    return users;
  }
}
export default ListenUserService;
