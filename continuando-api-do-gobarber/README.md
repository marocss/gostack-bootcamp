<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>


Continuando API do GoBarber
===============================

---

Conteúdo
----

- [x] [Configurando Multer](#configurando-multer)
- [ ] [Avatar do usuário](#avatar-do-usuário)
- [ ] [Listagem de prestadores de serviço](#)
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