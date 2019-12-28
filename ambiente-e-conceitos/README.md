<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>


Ambiente e conceitos
======================

---

Conteúdo
----

- [x] [Instalando Node & NPM](#instalando-node--npm)
- [x] [Instalação do Yarn](#instalação-do-yarn)
- [x] [Conceitos do Node.js](#conceitos-do-nodejs)
- [x] [Conceitos de API REST](#conceitos-de-api-rest")
- [x] [Criando aplicação](#criando-aplicação)
- [x] [Query & Route params](#query--route-params)
- [x] [Utilizando Insomnia](#utilizando-insomnia)
- [x] [Utilizando Nodemon](#utilizando-nodemon)
- [x] [CRUD](#crud)
- [x] [Middlewares](#middlewares)
- [x] [Debugando aplicação](#debugando-aplicação)

---

Instalando Node & NPM
----

- Instalar <a href="https://github.com/nvm-sh/nvm">NVM</a>: Node Version Manager.
- Instalar Node com NVM. (De preferência instalar a versão estável do node).
```
nvm install <NODEVERSIONNUM>
nvm alias default <NODEVERSIONNUM>
```

Instalação do Yarn
----

Gerenciador de pacotes como o NPM. Necessário ter Homebrew instalado.
- Instalar <a href="https://yarnpkg.com/en/docs/install#mac-stable">Yarn</a>.  
`brew install yarn --without-node`

Conceitos do Node.js
----

- O que é Node.js?  
  - JavaScript no back-end;  
  - Plataforma;  
  - V8;  
- O que é o NPM?  
  - Instalar bibliotecas de terceiros;  
  - Fornecer bibliotecas;  
  - Por que Yarn?  
- Características do Node.
  - Arquitetura Event-loop;
  - Node single-thread;
  - Non-blocking I/O;
- Frameworks.
  - ExpressJS como base;
  - Frameworks opinados;

Conceitos de API REST
----

- Como funciona?
  - Requisição e resposta;
  - Rotas utilizam métodos HTTP;
- Benefícios.
  - Múltiplos clientes, mesmo back-end;
  - Protoclo de comunicação padronizado;
- JSON: JavaScript Object Notation.
- Conteúdo da requisição.
  - Route; Route Params; Query Params;
  - Headers; Body;
- HTTP codes.
  - 1xx: Informational;
  - 2xx: Success;
  - 3xx: Redirection;
  - 4xx: Client Error;
  - 5xx: Server Error;

Criando aplicação
----

- Criar o `package.json`.  
`yarn init -y`
- Adicionar express.  
`yarn add express`
- Criar `index.js`.
```
const express = require('express');

const server = express();

server.listen(3000)
```

Query & Route params
----

- Query Params: `?=teste=1`.
  - `req.query`
- Route Params: `/users/1`.
  - `req.params`
- Request Body: `{ "name": "Marcos" }`.

Utilizando Insomnia
----

<a href="https://insomnia.rest/">Insomnia</a>. Software para testar as rotas da aplicação.  
- <a href="https://support.insomnia.rest/article/11-getting-started">Getting started</a>.  

Utilizando Nodemon
----

<a href="https://github.com/remy/nodemon">Nodemon</a>: Reinicia o servidor de forma automática.  
- Instalar Nodemon.  
`yarn add nodemon -D`
- Executar.
  - Opção 1:  
    `yarn nodemon index.js`
  - Opção 2:
    - Criar script em `package.json`.
    ```
    "scripts": {
      "dev": "nodemon index.js"
    }
    ```
    - Executar.  
      `yarn dev`

CRUD
----

- Create.
  - POST;
  - `req.body`;
- Update.
  - PUT;
  - `req.params`;
  - `req.body`;
- Read.
  - GET;
- Delete.
  - DELETE
  - `req.params`;

Middlewares
----

- Função. 
- Base de toda aplicação Express. 
- Recebe e manipula `req` e `res`. Também pode receber `next` como parâmetro.
- Interceptador. 
- Alterar variáveis `req` e `res`. 
- Middleware global.
- Middleware local.

Debugando aplicação
----

Debug utilizando debugger do VSCode.
- Iniciar.
  - Debug > `launch.json`
- Adicionar breakpoint.
- Monitorar valor de variáveis.