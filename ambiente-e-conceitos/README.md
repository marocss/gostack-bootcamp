# Ambiente e conceitos

### Aulas

- [x] Instalando Node & NPM
- [x] Instalação do Yarn
- [x] Conceitos do Node.js
- [x] Conceitos de API REST
- [x] Criando aplicação
- [x] Query & Route params
- [x] Utilizando Insomnia
- [x] Utilizando Nodemon
- [x] CRUD
- [x] Middlewares
- [x] Debugando aplicação

## Instalando Node & NPM

- Preferência por versão estável
- NVM (https://github.com/nvm-sh/nvm)
- Instalar Node com nvm

```
nvm install <NODEVERSIONNUM>
nvm alias default <NODEVERSIONNUM>
```

## Instalação do Yarn

Gerenciador de pacotes.

- Instalar Yarn (https://yarnpkg.com/en/docs/install#mac-stable)

```
brew install yarn --without-node
```

## Conceitos do Node.js

- O que é Node.js?
- O que é o NPM?
- Características do Node
- Frameworks

## Conceitos de API REST

- Como funciona?
- Benefícios
- JSON (JavaScript Obeject Notation)
- Conteúdo da requisição
- HTTP codes

## Criando aplicação

- Criar package.json

```
yarn init -y
```

- Adicionar express

```
yarn add express
```

- Criar index.js

## Query & Route params

- Query / Route params and request body

## Utilizando Insomnia

Aplicação para testar rotas

- https://insomnia.rest/
- Getting started: https://support.insomnia.rest/article/11-getting-started

## Utilizando Nodemon

Reinicia servidor de forma automática.  
https://github.com/remy/nodemon

- Instalar
```
yarn add nodemon -D
```
- Executar 
```
yarn nodemon index.js
```
ou criar script
```
"scripts": {
  "dev": "nodemon index.js"
}
```
```
yarn dev
```

## CRUD

- Create, Read, Update, Delete

## Middlewares

Base de toda aplicação express. Recebe req e res e manipula de alguma forma. Interceptador. Alterar variaveis req e res.

- Middleware global
- Middleware local

## Debugando aplicação

Debug utilizando debugger do vscode

- debug > launch.json
- breakpoint
- monitorar valor de variáveis