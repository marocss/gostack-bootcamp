# Iniciando back-end do GoBarber

### Aulas

- [x] Configurando estrutura
- [x] Nodemon & Sucrase
- [x] Conceitos do Docker
- [x] Configurando Docker
- [x] Sequelize & MVC
- [x] ESLint, Prettier & EditorConfig
- [x] Configurando Sequelize
- [x] Migration de usuário
- [x] Model de usuário
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

https://docs.docker.com/docker-for-mac/

- Instalar (https://docs.docker.com/docker-for-mac/install/)
- Criar serviço de db postgres (https://hub.docker.com/_/postgres)
```
docker run --name <dbname> -e POSTGRES_PASSWORD=<mysecretpassword> -p 5432:5432 -d postgres
```
- ```-p``` p/ redirecionamento de porta
- Verificar se container esta executando ```docker ps```
- Instalar Postbird p/ visualizar dados do postgres (https://electronjs.org/apps/postbird)
- Parar containers ```docker stop <dbname>```
- ```docker ps -a``` p/ visualizar todos os containers na maquina
- Iniciar container ```docker start <dbname>```
- ```docker logs <dbname>``` p/ visualizar logs caso erro ocorra

## Sequelize & MVC

Sequelize - ORM pra node.js (relational dbs)

- ORM
- Manipulação dos dados
- Migrations
- Seeds
- Arquitetura MVC
- A face de um controller

## ESLint, Prettier & EditorConfig

Padronizar escrita do código. 
- Adicionar eslint
```
yarn add eslint -D
```
- Iniciar
```
yarn eslint --init
```
- Style guide airbnb
- ```rm package-lock.json```
- ```yarn```
- Fazer fix on save
- Adicionar configuraçoes do vs code ```settings.json```
- Adicionar rules
```
rules: {
  "prettier/prettier": "error",
}
```
- Instalar Prettier
```
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```
- Adicionar prettier ao ```extends```
```
extends: [..., 'prettier']
```
- Adicionar ```plugins```
```
plugins: ['prettier']
```
- Criar ```.prettierrc```
```
{
  "singleQuote: true,
  "trailingComma": "es5"
}
```
- ```yarn eslint --fix <FOLDERTOFIX> --ext .js``` realizar fix automatico
- Adicionar EditorConfig (equipe que utiliza editores diferentes)
- ```.editorconfig```
```
trim_trailing_whitespace = true
insert_final_newline = true
```

## Configurando Sequelize

- Configurar estrutura de pastas
```
src
 |- config
 |  |- database.js
 |- database
 |  |- migrations
 |  |- seeds
 |- app
 |  |- controllers
 |  |- models
```
- Adicionar sequelize
```
yarn add sequelize
```
- Adicionar sequelize-cli
```
yarn add sequelize-cli -D
```
- ```touch .sequelizerc``` - exporta caminho dos arquivos e pastas. utilizar sintaxe antiga. (não usar import)
```
const { resolve } = require('path')

module.exports = {
  config: resolve(__dirname, 'src', 'config', 'database.js'),
  'models-path': resolve(__dirname, 'src', 'app', 'models'),
  'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
  'seeders-path': resolve(__dirname, 'src', 'database', 'seeds')
}
```
- Criar ```database.js```
```
module.exports = {
  dialect: '',
  host: '',
  username: '',
  password: '',
  database: '',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
```
- Adicionar dependencias para dialect postgres
```
yarn add pg pg-hstore
```

## Migration de usuário

- Criar primeira migration com sequelize-cli
```
yarn sequelize migration:create --name=<MYMIGRATIONNAME>
```
- Editar aquivo criado dentro de `migrations`
```
up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('<tableName>', { 
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  })
},

down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('<tableName>')
}
```
- Rodar primeira migration para criar tabela no db
```
yarn sequelize db:migrate
```
- `sequelize db:migrate:undo` Para efetuar correções antes de compartilhar ou publicar codigo. desfaz ultima migration feita.
- `sequelize db:migrate:undo:all` Desfaz todas as migrations feitas.

## Model de usuário

- Criar model de usuario para manipular os dados. Criar, alterar, deletar usuarios
- `models/User.js`
```
import Sequelize, { Model } from 'sequelize'

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password_hash: Sequelize.STRING,
      provider: Sequelize.BOOLEAN,
    }, {
      sequelize,
    })
  }
}

export default User
```

## Criando loader de models