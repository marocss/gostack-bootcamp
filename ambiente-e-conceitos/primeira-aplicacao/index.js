/* importar o express */ 
const express = require('express')
/* verificar que express foi importado de maneira correta */ 
// console.log(express)


/* iniciar aplicação. chamar função do express */ 
const server = express()

/* Rota GET de exemplo */ 
// http://localhost:3000/teste
// server.get('/teste', (req, res) => {
//   // console.log('teste')
//   /* req, res - parametros recebidos pela função. 
//       req = dados da requisição
//       res = informações pra resposta pro cliente
//   */
//   // return res.send('Hello World!')
//   return res.json({ message: 'Hello World!' })
// })


/*
Query params = ?teste=1
Route params =  /users/1
Request body =  { "nome": "Marcos", "email": "marcos@email.com" }
*/
// Query params
// http://localhost:3000/teste?nome=Marcos
// server.get('/teste', (req, res) => {
//   const nome = req.query.nome

//   return res.json({ message: `Hello ${nome}!` })
// })

// Route params
// http://localhost:3000/users/3
server.get('/users/:id', (req, res) => {
  // const id = req.params.id
  const { id } = req.params

  return res.json({ message: `Buscando usuario ${id}...` })
})


/* porta para o servidor ser chamado */
server.listen(3000)