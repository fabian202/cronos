import { Router } from 'express';
import { ProjectRoutes } from '../modules/project'
import { EntryRoutes } from '../modules/entry'

const routes = Router();

routes.use('/project', ProjectRoutes);
routes.use('/entry', EntryRoutes);

export default routes;