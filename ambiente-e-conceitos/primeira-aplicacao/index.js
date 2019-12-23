const express = require('express')

const server = express()

// informar que o corpo da requisição sera json
server.use(express.json())

/* CRUD */
const users = ['Richard', 'Rogerio', 'Rafael']

/* Middlewares */
/* Middleware global */ 
// server.use((req, res, next) => {
//   console.log('Requisição solicitada.')

//   // continuar executando aplicação
//   return next()
// })

/* Exemplo: Middleware de log */
server.use((req, res, next) => {
  console.time('Request time')
  console.log('Método: ', req.method)
  console.log('URL: ', req.url)
  
  // return next()
  next()
  
  console.log('Next finalizou.')
  console.timeEnd('Request time')
})

/* Middleware local */ 
function checkUserExists(req, res, next) {
  // verificar se informação name esta no corpo
  if(!req.body.name) {
    return res.status(400).json({ error: 'Name is required.'})
  }

  return next()
}

// verificar se existe usuario no index
function checkUserInArray(req, res, next) {
  const user = users[req.params.index]
  // verificar se informação name esta no corpo
  // if(!users[req.params.index]) {
  //   return res.status(400).json({ error: 'User does not exists.'})
  // }
  if(!user) {
    return res.status(400).json({ error: 'User does not exist.'})
  }

  // criar nova variavel no req com o user encontrado
  req.user = user

  return next()
}

// rota para listar todos usuarios
server.get('/users', (req, res) => {
  return res.json(users)
})

server.get('/users/:index', checkUserInArray, (req, res) => {
  // const { index } = req.params

  // return res.json(users[index])
  // middleware adiciona user no req
  return res.json(req.user)
})

// criar novo usuario
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body

  users.push(name)

  return res.json(users)
})

// editar usuario
// adicionando middleware local 
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body

  users[index] = name

  return res.json(users)
})

// excluir usuario
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1)

  // return res.json(users)
  return res.send()
})


server.listen(3000)