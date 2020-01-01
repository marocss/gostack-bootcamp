import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // sequelize = conexão com o db
  static init(sequelize) {
    super.init(
      // metodo init da classe Model
      // colunas do db (apenas inseridas pelo usuario)
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      // passar sequelize como segundo parametro
      {
        sequelize,
      }
    );

    // antes de qualquer user ser salvo executa codigo automaticamente
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // user informou senha, gerar hash
        // password, rounds de criptografia
        user.password_hash = await bcrypt.hash(user.password, 12);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
