import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password, name } = request.body;
      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({ email, name, password });
      return response.json(user);
    } catch (err) {
      return response.json({ erro: err });
    }
  }

  
}

export default new UsersController();
