// Router - forma separar roteamento do express em outro arquivo
import { Router } from 'express';

// utilizar routes para definir rotas
const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ hello: 'world!' });
});

export default routes;
