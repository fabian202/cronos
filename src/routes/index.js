import { Router } from 'express';
import PrivateRoutes from './private.routes'
import PublicRoutes from './public.routes'
import { validateUser } from '../services/auth'

const routes = Router();

//Public routes
routes.use('/', PublicRoutes);

//Main api routes (secure)
routes.use('/', validateUser, PrivateRoutes);

export default routes;