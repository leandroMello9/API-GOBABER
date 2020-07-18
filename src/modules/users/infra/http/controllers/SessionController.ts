import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ValidateUserService from '../../../services/ValidadeUserSession';
import AuthenticateService from '../../../services/AnthenticateUserService';

class SessionController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const validadeUser = new ValidateUserService();
      const { email, password } = request.body;
      const user = await validadeUser.execute(request.body);
      if (user) {
        const authenticateUser = container.resolve(AuthenticateService);
        const {
          user: userAuthenticate,
          token,
        } = await authenticateUser.execute({
          email,
          password,
        });
        return response.json({ userAuthenticate, token });
      }
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}
export default new SessionController();
