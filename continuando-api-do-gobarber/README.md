<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>


Continuando API do GoBarber
===============================

---

Conteúdo
----

- [x] [Configurando Multer](#configurando-multer)
- [x] [Avatar do usuário](#avatar-do-usuário)
- [ ] [Listagem de prestadores de serviço](#listagem-de-prestadores-de-serviço)
- [ ] [Migration e model de agendamento](#)
- [ ] [Agendamento de serviço](#)
- [ ] [Validações de agendamento](#)
- [ ] [Listando agendamentos do usuário](#)
- [ ] [Aplicando paginação](#)
- [ ] [Listando agenda do prestador](#)
- [ ] [Configurando MongoDB](#)
- [ ] [Notificando novos agendamentos](#)
- [ ] [Listando notificações do usuário](#)
- [ ] [Marcar notificações como lidas](#)
- [ ] [Cancelamento de agendamento](#)
- [ ] [Configurando Nodemailer](#)
- [ ] [Configurando templates de e-mail](#)
- [ ] [Configurando fila com Redis](#)
- [ ] [Monitorando falhas na fila](#)
- [ ] [Listando horários disponíveis](#)
- [ ] [Campos virtuais no agendamento](#)
- [ ] [Tratamento de exceções](#)
- [ ] [Variáveis ambiente](#)

---

Configurando Multer
----

Upload de arquivos da aplicação. Prestadores de serviço podem ter um avatar.

Forma tradicional de tratar uploads de arquivos: enviar a imagem junto com os outros dados no processo de registro. Backend trata de todo o upload.

Upload de arquivos isolado: na hora que ele seleciona a imagem o upload ja é feito e o servidor retorna um id da imagem. Na hora que for enviar os outros dados de registro apenas o id da imagem é enviado.

- JSON nao suporta upload de arquivos.
- Utilizar Multipart form data.
- Adicionar multer para trabalhar com Multipart form data.
  `yarn add multer`
- Criar pasta `tmp/uploads` na raiz do projeto.
- Criar `src/config/multer.js`: toda configuração da parte de upload de arquivos.
```
import multer from 'multer'
import crypto from 'crypto'
import {extname, resolve } from 'path'

export default {
  // como o multer guarda os arquivos (CDN, etc...)
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'), 
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err)

        return cb(null, res.toString('hex') + extname(file.originalname))
      })
    },
  })
}
```
- Importar `multer` e `multerConfig` em `routes.js`:
```
const upload = multer(multerConfig);

// criar nova rota
// adicionar middleware upload de um arquivo com o nome do campo
routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ok: true})
})
```
- Adicionar token para enviar avatar pois usuário só poderá enviar um avatar quando for atualizar o perfil e não quando estiver efetuando o registro.

Avatar do usuário
----

Salvar informações do arquivo na base de dados.
- Quando o multer esta em uma rota ele adiciona a variavel `req.file(s)`:
```
routes.post('/files', upload.single('file'), (req, res) => {
  return res.json(req.file);
});
```
- Criar `FileController.js`:
```
class FileController {
  async store(req, res) {
    return res.json(req.file);
  }
}

export default new FileController()
```
- Criar nova tabela no db para armazenar os arquivos:
  `yarn sequelize migration:create --name=create-files`
```
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
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
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('files');
  },
};
```
- Rodar a migration: 
  `yarn sequelize db:migrate`
- Criar model `File.js`:
```
import Sequelize, { Model } from 'sequelize';

class File extends Model {
  // sequelize = conexão com o db
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

}

export default File;
```
- Adicionar model ao loader de models `database/index.js`:
```
import File from '../app/models/File';

const models = [User, File];
```
- Configurar `FileController.js`:
```
import File from '../models/File'

...

async store(req, res) {
  const {originalname: name, filename: path} = req.file

  const file = await File.create({
    name,
    path
  })

  return res.json(file)
}
```
- Criar uma nova migration para relacionar os usuarios da tabela users aos arquivos de avatar na tabela files:
  `yarn sequelize migration:create --name=add-avatar-field-to-users`
```
// migration adiciona coluna de avatar em users
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'avatar_id',
      {
        type: Sequelize.INTEGER,
        references: {model: 'files', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,  
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'avatar_id')
}
```
- Rodar migration: 
  `yarn sequelize db:migrate`
- Atualizar model `User.js` para aceitar `avatar_id`. Relacionar model de `User` com model de `File`:
```
static associate(models) {
  // salvar referencia. model de usuario pertence ao model de file. passar coluna que armazena referencia p/ o arquivo
  this.belongsTo(models.File, { foreignKey: 'avatar_id'})
}
```
- Atualizar `database/index.js` para chamar método `associate`:
```
    // chamar metodo passando models apenas se ele existir
    models.map(model => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models))
```
- Adicionar campo `avatar_id` na requisição de update

Listagem de prestadores de serviço
----