const Sequelize = require('sequelize');
const databaseConfig = require('../../config/database');
const User = require('../models/User');
const Attachment = require('../models/Attachment');
const Product = require('../models/Product');

const models = [
  User,
  Attachment,
  Product,
];

class Database {
  constructor() {
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

module.exports = new Database();
