import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

// constructor - metodo chamado automaticamente toda vez que classe for
//  instanciada
class App {
  constructor() {
    // definir variavel server
    this.server = express();

    // chamar metodos
    this.middlewares();
    this.routes();
  }

  // metodo middlewares
  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // metodo routes
  routes() {
    // utilizar rotas de outro arquivo
    this.server.use(routes);
  }
}

// exportar nova instancia de App
export default new App().server; // exportando server diretamente
