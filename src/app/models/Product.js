const Sequelize = require('sequelize');

class Product extends Sequelize.Model {

  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      description: Sequelize.STRING,
      price: Sequelize.DECIMAL(8,2),
    }, {
      sequelize
    });
    
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Attachment, { foreignKey: 'attachment_id', as: 'attachment' });
  }
};

module.exports = Product;
