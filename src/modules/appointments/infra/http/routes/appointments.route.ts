import { Router } from 'express';

import UserIsAuthenticate from '../../../../../shared/infra/http/middlewares/UserIsAuthenticate';
import AppointmentController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

// DTO = Data transer object = Transferindo um objeto de um arquivo para o outro

appointmentsRouter.use(UserIsAuthenticate);

appointmentsRouter.post('/', AppointmentController.create);

export default appointmentsRouter;
