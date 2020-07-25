import { inject, injectable } from 'tsyringe';
import UserModel from '../infra/typeorm/entities/User';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import IUserRepository from '../repositoriesInterface/IUserRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
 

  constructor(
    @inject('UsersRepository') 
    private repository: IUserRepository,
    
    @inject('HashProvider')
    private hashProvider : IHashProvider

    ) {
  
  }

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<UserModel> {
    const findEmail = await this.repository.findByEmail(email);

    if (findEmail) {
      throw Error('Email is already being used');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
export default CreateUserService;
