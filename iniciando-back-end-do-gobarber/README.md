# Iniciando back-end do GoBarber

### Aulas

- [x] Configurando estrutura
- [x] Nodemon & Sucrase
- [x] Conceitos do Docker
- [ ] Configurando Docker
- [ ] Sequelize & MVC
- [ ] ESLint, Prettier & EditorConfig
- [ ] Configurando Sequelize
- [ ] Migration de usuário
- [ ] Model de usuário
- [ ] Criando loader de models
- [ ] Cadastro de usuários
- [ ] Gerando hash da senha
- [ ] Conceitos de JWT
- [ ] Autenticação JWT
- [ ] Middleware de autenticação
- [ ] Update do usuário
- [ ] Validando dados de entrada

## Configurando estrutura

- Criar projeto
- Instalar express
- Criar src com server, app e routes
  - app: configuração do servidor express
  - routes: rotas da aplicação
  - server: cria o servidor
- JSON Viwer. Extensão chrome p/ json: https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh

## Nodemon & Sucrase

- Nodemon. Detecta alterações no código e reinicia o servidor.
- Sucrase. Utilizar nova sintaxe do JS no node (```import``` ao invés de ```require```)
```
yarn add sucrase nodemon -D
```
- Executar pelo sucrase diretamente
```
yarn sucrase-node src/server.js
```
ou criar script
```
"scripts": {
  "dev": "nodemon src/server.js"
}
```
e ```nodemon.json```
```
{
  "execMap": {
    "js": "node -r sucrase/register"
  }
}
```
- Alterar processo de debug do vscode
```
"scripts": {
...
    "dev.debug": "nodemon --inspect src/server.js"
  }
```
```
yarn dev:debug
```
- Alterar launch.json
```
"request": "attach",
"restart": true,
"protocol": "inspector"
"program": "${workspaceFolder}/index.js" // delete
```

## Conceitos do Docker

- Como funciona?
- Principais conceitos

## Configurando Docker