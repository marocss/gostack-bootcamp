const express = require('express')

const server = express()

/*
Query params = ?teste=1
Route params =  /users/1
Request body =  { "nome": "Marcos", "email": "marcos@email.com" }
*/

// exemplo de banco de dados
const users = ['User 1', 'Rogerio', 'User 3']

// http://localhost:3000/users/2
server.get('/users/:index', (req, res) => {
  const { index } = req.params

  return res.json(users[index])
})

server.listen(3000)