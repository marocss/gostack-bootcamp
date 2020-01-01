import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      // attributes: ['id', 'name', 'email', 'avatar_id'], // informaçoes que deseja
      include: [
        {
          model: File,
          as: 'avatar',
          // attributes: ['name', 'path', 'url'],
        },
      ],
      // include: [File], // retornar todos os dados do avatar não só o avatar_id
    });

    return res.json(providers);
  }
}

export default new ProviderController();
