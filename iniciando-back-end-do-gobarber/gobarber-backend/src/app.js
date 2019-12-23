const express = require('express')
const routes = require('./routes')

// constructor - metodo chamado automaticamente toda vez que classe for 
//  instanciada
class App {
  constructor() {
    // definir variavel server
    this.server = express()

    // chamar metodos
    this.middlewares()
    this.routes()
  }

  // metodo middlewares
  middlewares() {
    this.server.use(express.json())
  }

  // metodo routes
  routes() {
    // utilizar rotas de outro arquivo
    this.server.use(routes)
  }

}

// exportar nova instancia de App
module.exports = new App().server // exportando server diretamente