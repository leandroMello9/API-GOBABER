import { Router } from 'express';
import appointmentRoute from '../../../../modules/appointments/infra/http/routes/appointments.route';
import userRoutes from '../../../../modules/users/infra/http/routes/users.route';
import sessionRoutes from '../../../../modules/users/infra/http/routes/session.route';

const router = Router();

router.use('/appointments', appointmentRoute);
router.use('/users', userRoutes);
router.use('/session', sessionRoutes);

export default router;
