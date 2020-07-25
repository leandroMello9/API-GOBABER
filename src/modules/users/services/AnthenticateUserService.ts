import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import UserModel from '../infra/typeorm/entities/User';
import authConfig from '../../../config/auth';
import IUserRepository from '../repositoriesInterface/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
interface IRequest {
  email: string;
  password: string;
}
interface IReponse {
  user: UserModel;
  token: string;
}
@injectable()
class AuthemticateUserService {

  constructor(
    @inject('UsersRepository')
    private repository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {
  }

  public async execute({ email, password }: IRequest): Promise<IReponse> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error('Incorrect email/password, check your data');
    }
    // user.password = senha criptografada
    // password = senha não criptografada

    // Comparando
    const passwordMathecd = await this.hashProvider.compareHash(password, user.password);
    // Validando senha
    if (!passwordMathecd) {
      throw new Error('Incorrect email/password, check your data');
    }
    delete user.password;

    // Gerando token

    const { secret, expiresIn } = authConfig.jwt;
    // Primeiro paremetro = payload, fica dentro do token e não é seguro
    const token = sign({}, secret, {
      // Id do usuario que gerou o token
      subject: user.id,
      // Tempo de duração do token
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
export default AuthemticateUserService;
