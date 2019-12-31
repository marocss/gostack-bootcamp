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
