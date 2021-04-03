const Sequelize = require('sequelize');

class Attachment extends Sequelize.Model {
  
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      file: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3000/attachments/${this.file}`
        }
      }
    }, {
      sequelize
    });

  return this;
  }
};
  
module.exports = Attachment;
  