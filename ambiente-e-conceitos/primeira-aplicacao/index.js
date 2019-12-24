const express = require('express')

const server = express()

server.use(express.json())

/* db (example) */
const users = ['Richard', 'Rogerio', 'Rafael']

// Log middleware
server.use((req, res, next) => {
  console.time('Request time')
  console.log('Método: ', req.method)
  console.log('URL: ', req.url)
  
  next()
  
  console.log('Next finalizou.')
  console.timeEnd('Request time')
})

// Local middleware
function checkUserExists(req, res, next) {
  /* Checks if name was inserted */
  if(!req.body.name) {
    return res.status(400).json({ error: 'Name is required.'})
  }

  return next()
}

function checkUserInArray(req, res, next) {
  /* Checks if user at index exists */
  const user = users[req.params.index]

  if(!user) {
    return res.status(400).json({ error: 'User does not exist.'})
  }

  // add user variable to req
  req.user = user

  return next()
}

// list all users
server.get('/users', (req, res) => {
  return res.json(users)
})

// list user
server.get('/users/:index', checkUserInArray, (req, res) => {
  // user already in req. (added by the middleware)
  return res.json(req.user)
})

// create user
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body

  users.push(name)

  return res.json(users)
})

// update user
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body

  users[index] = name

  return res.json(users)
})

// delete user
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1)

  return res.send()
})


server.listen(3000)