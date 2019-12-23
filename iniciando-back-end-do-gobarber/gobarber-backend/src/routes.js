// Router - forma separar roteamento do express em outro arquivo
const { Router } = require('express')

// utilizar routes para definir rotas
const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ hello: 'world!' })
})

module.exports = routes