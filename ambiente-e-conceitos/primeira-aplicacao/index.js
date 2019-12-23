/* importar o express */ 
const express = require('express')
/* verificar que express foi importado de maneira correta */ 
// console.log(express)


/* iniciar aplicação. chamar função do express */ 
const server = express()

/* Rota GET de exemplo */ 
// http://localhost:3000/teste
server.get('/teste', (req, res) => {
  // console.log('teste')
  /* req, res - parametros recebidos pela função. 
      req = dados da requisição
      res = informações pra resposta pro cliente
  */
  // return res.send('Hello World!')
  return res.json({ message: 'Hello World!' })
})


/* porta para o servidor ser chamado */
server.listen(3000)