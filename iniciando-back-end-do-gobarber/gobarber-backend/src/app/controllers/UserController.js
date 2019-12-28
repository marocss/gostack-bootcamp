import User from '../models/User';

class UserController {
  async store(req, res) {
    /* recebe dados do user e cria novo registro no db */

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
