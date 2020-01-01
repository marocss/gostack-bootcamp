import Sequelize, { Model } from 'sequelize';

const baseURL = 'http://localhost:3333/files';

class File extends Model {
  // sequelize = conexão com o db
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${baseURL}/${this.path}`; // retornar url
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
