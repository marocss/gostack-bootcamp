<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>


Iniciando back-end do GoBarber
=================================

---

Conteúdo
----

- [x] [Configurando estrutura](#configurando-estrutura)
- [x] [Nodemon & Sucrase](#nodemon--sucrase)
- [x] [Conceitos do Docker](#conceitos-do-docker)
- [x] [Configurando Docker](#configurando-docker)
- [x] [Sequelize & MVC](#sequelize--mvc)
- [x] [ESLint, Prettier & EditorConfig](#eslint-prettier--editorconfig)
- [x] [Configurando Sequelize](#configurando-sequelize)
- [x] [Migration de usuário](#migration-de-usuário)
- [x] [Model de usuário](#model-de-usuário)
- [x] [Criando loader de models](#criando-loader-de-models)
- [x] [Cadastro de usuários](#cadastro-de-usuários)
- [x] [Gerando hash da senha](#gerando-hash-da-senha)
- [x] [Conceitos de JWT](#conceitos-jwt)
- [x] [Autenticação JWT](#autenticação-jwt)
- [x] [Middleware de autenticação](#middleware-de-autenticação)
- [x] [Update do usuário](#update-do-usuário)
- [x] [Validando dados de entrada](#validando-dados-de-entrada)

Configurando estrutura
----

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

Nodemon & Sucrase
----

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

Conceitos do Docker
----

- Como funciona?
  - Criação de ambientes isolados (container);
  - Containers expõe portas para comunicação;
- Principais conceitos.
  - Imagem;
  - Container;
  - Docker Registry (Docker Hub);
  - Dockerfile;

Configurando Docker
----

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

Sequelize & MVC
----

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

ESLint, Prettier & EditorConfig
----

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

Configurando Sequelize
----

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

Migration de usuário
----

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

Model de usuário
----

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

Criando loader de models
----

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

Cadastro de usuários
----

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

Gerando hash da senha
----

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

Conceitos JWT
----

- Autenticação JWT
- Token JWT
- Headers
- Payload
- Assinatura

Autenticação JWT
----

- Criar `SessionController.js`.
```
async store(req, res) {
  const {email, password} = req.body
  // verificar email
  const user = await User.findOne({
    where: {
       email
    }
  })

  if(!user) {
    return res.status(401).json({ error: 'User not found.' })
  }
}
```
- Não fazer isso no `UserController.js` pois se trata de uma entidade diferente.
- Apenas 5 métodos no controller. 
- Adicionar extensão `jsonwebtoken`:
`yarn add jsonwebtoken`
- Criar verificação de senha dentro do model `User.js`:
```
checkPassword(paassowrd) {
  return bcrypt.compare(password, this.password_hash)
}
```
- Adicionar verificação ao `SessionController.js`: 
```
if(!(await user.checkPassword(password))) {
  return res.status(401).json({ error: 'Password does not match' })
}

const { id } = user
return res.json({
  user,
  token: jwt.sign({id }, <textoUnicoEmTodasAplicaçõesDoUniverso>, {
    expiresIn: '7d'
  })
})
```
- Criar string segura: [MD5 Online](https://www.md5online.org/)
- Adicionar rota em `routes.js`:
```
routes.post('/sessions', SessionController.store)
```
- Separar informações sensiveis em um arquivo `config/auth.js`:
```
export default {
  secret: <textoUnicoEmTodasAplicaçõesDoUniverso>,
  expiresIn: '7d'
}
```
- Alterar `SessionController.js`:
```
token: jwt.sign({id }, authConfig.secret , {
  expiresIn: authConfig.expiresIn
})
```

Middleware de autenticação
----

Bloquear o usuário a acessar alguma rota caso não esteja logado.

- Adicionar método update ao `UserController.js`:
```
async update(req, res) {
  console.log(req.userId)

  return res.json({ ok: true })
}
```
- Criar rota.
- Criar um middleware de autenticação `app/middlewares/auth.js`:
```
export default async (req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    // decoded contem informações do payload do token
    // incluir id do user no req
    req.userId = decoded.id

    return next()

  } catch(err) {
    return res.status(401).json({error: 'Token invalid'})
  }
}
```
- `promisify`: função do `util` que transforma função de callback em async/await.
- Adicionar middleware ao arquivo `routes.js`:
```
routes.use(authMiddleware)
```
- Pode ser adicionado como middleware local ou middleware global, funcionando para todas as rotas que forem definidas depois dele.

Update do usuário
----

- Adicionar campo de `oldPassword` no corpo da requisição para usuário alterar senha.
- Configurar método update do `UserController.js`
```
async update(req, res) {
  const {email, oldPassword} = req.body

  const user = await User.findByPk(req.userId);
  
  if(email !== user.email) {
    const userExists = await User.findOne({
      where: {
         email
      }
    })

    if(userExists) {
      return res.status(400).json({ error: 'User already exists.' })
    }
  }

  // apenas verificar se senhas batem caso senha antiga tenha sido informada
  if(oldPassword && !(await user.checkPassword(oldPassword))) {
    return res.status(401).json({ error: 'Password does not match' })
  }

  const user = await user.update(req.body)

  return res.json(user)
}
```

Validando dados de entrada
----

Validação dos dados de entrada do backend. Adicionar validação no cadastro, update de usuario, criação de sessão.
- Adicionar `yup`.
- Yup: biblioteca de schema validation.
- Editar método `store` do `UserController.js`:
```
// yup n possui export default
import * as Yup from 'yup'

async store(req, res) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6)
  })

  if(!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation failed.' })
  }

  const userExists = await User.findOne({ where: {email: req.body.email}})
}
```
- Editar método `update`:
```
async store(req, res) {
  // senha é obrigatoria caso usuário deseje alterar sua senha
  // confirmação de senha é obrigatoria caso usuário deseje alterar sua senha
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string().min(6),
    password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => 
      oldPassword ? field.required() : field
    ),
    confirmPassword: Yup.string().when('password', (password, field) => 
      password ? field.required().oneOf([Yup.ref('password')]) : field
    )
  })

  if(!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation failed.' })
  }

  const {email, oldPassword} = req.body
}
```
- Editar `store` de `SessionController.js`: 
```
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  })

  if(!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation failed.' })
  }

```
