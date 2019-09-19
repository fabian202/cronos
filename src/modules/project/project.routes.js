import { Router } from 'express';
import { get, create, put, del, getById } from './project.controller'

const routes = Router();

routes.get('/', get);
routes.get('/:id', getById);
routes.post('/', create);
routes.put('/:id', put);
routes.delete('/:id', del);

export default routes;