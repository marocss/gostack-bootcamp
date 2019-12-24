<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

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
- [x] Criando loader de models
- [x] Cadastro de usuários
- [x] Gerando hash da senha
- [x] Conceitos de JWT
- [ ] Autenticação JWT
- [ ] Middleware de autenticação
- [ ] Update do usuário
- [ ] Validando dados de entrada

## Configurando estrutura

- Criar projeto.  
`mkdir <projName>; cd <projName>; yarn init -y`
- Instalar express.
- Configurar estrutura.
  - app: configuração do servidor express.
  - routes: rotas da aplicação.
  - server: cria o servidor.
  ```
  - src
    |- app.js
    |- routes.js
    |- server.js
  ```
- Separar arquivos facilita testes.
- <a href="https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh
">JSON Viwer</a>: Extensão p/ visualizar JSON.

## Nodemon & Sucrase

- Nodemon: detecta alterações no código e reinicia o servidor.
- Sucrase: possibilita utilizar a nova sintaxe do JS no node. (```import``` ao invés de ```require```).  
`yarn add sucrase nodemon -D`
- Executar pelo sucrase diretamente:  
`yarn sucrase-node src/server.js`
- Ou executar com script:  
  ```
  "scripts": {
    "dev": "nodemon src/server.js"
  }
  ```
  - Criar `nodemon.json`:
  ```
  {
    "execMap": {
      "js": "node -r sucrase/register"
    }
  }
  ```
- Alterar processo de debug do VSCode.
  ```
  "scripts": {
  ...
      "dev.debug": "nodemon --inspect src/server.js"
    }
  ```
  `yarn dev:debug`
- Alterar `launch.json`:
  ```
  "request": "attach",
  "restart": true,
  "protocol": "inspector"
  "program": "${workspaceFolder}/index.js" // delete this line
  ```

## Conceitos do Docker

- Como funciona?
  - Criação de ambientes isolados (container);
  - Containers expõe portas para comunicação;
- Principais conceitos.
  - Imagem;
  - Container;
  - Docker Registry (Docker Hub);
  - Dockerfile;

## Configurando Docker

<a href="https://docs.docker.com/docker-for-mac/">Docker Docs</a>.

- <a href="https://docs.docker.com/docker-for-mac/install/">Instalar (Mac)</a>.
- Criar serviço de db postgres. (https://hub.docker.com/_/postgres).  
  `docker run --name <containerName> -e POSTGRES_PASSWORD=<mysecretpassword> -p 5432:5432 -d postgres`  
    - `-p` p/ redirecionamento de porta
    - Verificar se container esta executando:  
      `docker ps`
    - Instalar <a href="https://electronjs.org/apps/postbird">Postbird</a> para visualizar dados do postgres.  
    - Parar containers:  
      `docker stop <containerName>`
    - Visualizar todos os containers na maquina:  
      `docker ps -a`
    - Iniciar container:  
      `docker start <containerName>`
    -  Visualizar logs (caso erro ocorra):  
      `docker logs <containerName>`

## Sequelize & MVC

Sequelize - ORM pra Node.js. (Relational Databases)

- ORM.
  - Abstração do banco de dados;
  - Tabelas viram models;
- Manipulação dos dados.
  - Sem SQL
  - Apenas JavaScript;
- Migrations.
  - Controle de versão para base de dados;
  - Instruçoes para criar, alterar ou remover tabelas ou colunas;
  - Mantém a base atualizada entre desenvolvedores e ambiente de produção;
  - Cada arquivo é uma migration e sua ordenação ocorre por data;
  - É possivel desfazer migração durante desenvolvimento da feature;
  - Migration não pode ser alterada caso tenha sido compartilhada ou esteja em produção;
  - Cada migration deve alterar apenas uma tabela;
  - Podem ser criadas várias migrations para alterações maiores;
- Seeds.
  - População da base de dados para desenvolvimento;
  - Muito utilizado para testes;
  - Executável apenas por código;
  - Jamais usar em produção;
  - Caso sejam dados que precisem ir para produção, utilizar migrations para manipular os dados das tabelas.
- Arquitetura MVC.
  - Model: abstração do banco;
  - Controller: ponto de entrada das requisições;
  - View: retorno ao cliente;
- A face de um controller.
  - Classes;
  - Sempre retorna um JSON;
  - Não chama outro controller/método;
  - Quando criar um novo controller?
  - Os 5 métodos do controller;
  - Entidade;

## ESLint, Prettier & EditorConfig

Padronizar escrita do código. 
- Adicionar eslint:  
  `yarn add eslint -D`
- Iniciar:  
  `yarn eslint --init`
- Style guide Airbnb.
- Remover arquivo gerado pelo NPM:  
  `rm package-lock.json; yarn`
- Para fazer fix on save adicionar configurações no VSCode `settings.json`.  
- Adicionar rules ao `.eslintrc.js`:  
  ```
  rules: {
    "prettier/prettier": "error",
  }
  ```
- Instalar Prettier:  
  `yarn add prettier eslint-config-prettier eslint-plugin-prettier -D`
- Adicionar prettier ao `extends`:  
  `extends: [..., 'prettier']`
- Adicionar `plugins`:  
  `plugins: ['prettier']`
- Criar `.prettierrc` pra sobrescrever regras desejadas:  
  ```
  {
    "singleQuote: true,
    "trailingComma": "es5"
  }
  ```
- Para realizar um fix automatico:  
  `yarn eslint --fix <folderToFix> --ext .js` 
- Gerar o EditorConfig (para equipes que utilizam editores de texto diferentes) `.editorconfig`:  
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

Realizar conexão com db definido em `config/database.js`. Carregar todos os models da aplicação.   
- Criar `database/index.js`. Realiza conexão e carrega models
```
import Sequelize from 'sequelize'
import User from '../app/models/User'
import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection))
  }
}

export default new Database()
```
- Chamar `index.js` em algum lugar. Adicionar ao app.js
```
import './database'
```

## Cadastro de usuários

Registro de usuarios dentro da API.  

- Criar controller `controllers/UserController.js`
- Estrutura de todo controller
```
import User from '../models/User'

class UserController {

}

export default new UserController()
```
```
async store(req, res) {
  // verificar email
  const userExists = await User.findOne({
    where: {
      email: req.body.email
    }
  })

  if(userExists) {
    return res.status(400).json()
  }

  const user = await User.create(req.body)

  return res.json(user)
}
```
- Importar controller e adicionar metodo na rota
```
import UserController...

routes.post('/users', UserController.store)
```
- Filtrar campos necessarios p/ frontend
```
const { id, name... } = await User.create(req.body)
```

## Gerando hash da senha

- Adicionar `bcryptjs` p/ gerar hash
```
yarn add bcryptjs
```
- Importar bcrypt no model `User.js`
- Criar campo virtual `password` e adicionar um hook p/ criar password_hash
```
this.addHook('beforeSave', async (user) => {
  if(user.password) {
    user.password_hash = await bcrypt.hash(user.password, 12)
  }
})

// retornar model que acabou de ser inicializado
return this
```

## Conceitos JWT

- Autenticação JWT
- Token JWT
- Headers
- Payload
- Assinatura

## Autenticação JWT