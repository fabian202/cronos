import { Router } from 'express';
import { authenticate, create} from './user.controller'

const routes = Router();

//api/user/authenticate
routes.post('/authenticate', authenticate);

// api/user/
routes.post('/', create);


export default routes;