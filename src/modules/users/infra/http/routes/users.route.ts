import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../../config/auth';
import userAuthenticate from '../../../../../shared/infra/http/middlewares/UserIsAuthenticate';
import UserControlller from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.get('/', UserControlller.index);
userRouter.post('/', UserControlller.create);
userRouter.patch(
  '/avatar',
  userAuthenticate,
  upload.single('avatar'),
  UserAvatarController.update,
);
userRouter.delete('/:id', UserControlller.delete);
export default userRouter;
