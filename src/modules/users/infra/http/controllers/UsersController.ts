import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListenUserService from '../../../services/ListenUserService';
import CreateUserService from '../../../services/CreateUserService';
import DeleteUserService from '../../../services/DeleteUserForId';

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

  public async index(request: Request, response: Response): Promise<Response> {
    const listenUsers = container.resolve(ListenUserService);
    const users = await listenUsers.execute();
    return response.json(users);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user = container.resolve(DeleteUserService);

    const deleteUser = await user.execute(id);
    return response.json(deleteUser);
  }
}

export default new UsersController();
