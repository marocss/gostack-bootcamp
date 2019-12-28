import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    /* recebe dados do user e cria novo registro no db */

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    // verificar email (erro caso não verifique)
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      // usuario existe
      return res.status(400).json({ error: 'User exists.' });
    }

    // utilizar todos os dados do body pois model ja define campos
    const user = await User.create(req.body);

    // retornar user criado
    return res.json(user);
  }

  async update(req, res) {
    // senha é obrigatoria caso usuário deseje alterar sua senha
    // confirmação de senha é obrigatoria caso usuário deseje alterar sua senha
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // apenas verificar se senhas batem caso senha antiga tenha sido informada
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    return res.json(user);
  }
}

export default new UserController();
