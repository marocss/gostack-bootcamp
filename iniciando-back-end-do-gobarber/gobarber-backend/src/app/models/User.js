import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      // metodo init da classe Model
      // colunas do db (apenas inseridas pelo usuario)
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      // passar sequelize como segundo parametro
      {
        sequelize,
      }
    );
  }
}

export default User;
