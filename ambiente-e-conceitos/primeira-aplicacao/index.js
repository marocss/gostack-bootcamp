const express = require('express')

const server = express()

// informar que o corpo da requisição sera json
server.use(express.json())

/* CRUD */
const users = ['Richard', 'Rogerio', 'Rafael']

// rota para listar todos usuarios
server.get('/users', (req, res) => {
  return res.json(users)
})

server.get('/users/:index', (req, res) => {
  const { index } = req.params

  return res.json(users[index])
})

// criar novo usuario
server.post('/users', (req, res) => {
  const { name } = req.body

  users.push(name)

  return res.json(users)
})

// editar usuario
server.put('/users/:index', (req, res) => {
  const { index } = req.params;
  const { name } = req.body

  users[index] = name

  return res.json(users)
})

// excluir usuario
server.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index, 1)

  // return res.json(users)
  return res.send()
})


server.listen(3000)