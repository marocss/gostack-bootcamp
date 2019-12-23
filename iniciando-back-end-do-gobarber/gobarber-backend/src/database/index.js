import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    /* conecta com a base de dados e carrega models */

    // conexao com db
    this.connection = new Sequelize(databaseConfig);

    // carregar models
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
