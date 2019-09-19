import { Router } from 'express';
import { UserRoutes } from '../modules/user'

const routes = Router();

routes.use('/user', UserRoutes);

export default routes;