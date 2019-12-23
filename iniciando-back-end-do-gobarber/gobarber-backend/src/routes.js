// Router - forma separar roteamento do express em outro arquivo
import { Router } from 'express';

// utilizar routes para definir rotas
const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ hello: 'world!' });
});

export default routes;

/*
  TESTE
    criar um usuario no db
*/
// import User from './app/models/User';

// const routes = new Router();

// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Marcos',
//     email: 'm@e.com',
//     password_hash: '123456789',
//   });

//   return res.json(user);
// });

// export default routes;
