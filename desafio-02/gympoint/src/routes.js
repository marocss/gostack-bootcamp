import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// autenticação (email e senha)
routes.post('/sessions', SessionController.store);

// middleware de auth
routes.use(authMiddleware);

// cadastro de aluno
routes.post('/students', StudentController.store);
// update de aluno
routes.put('/students/:id', StudentController.update);

export default routes;
