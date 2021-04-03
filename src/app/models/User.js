const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Sequelize.Model {
  
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
    }, {
      sequelize
    });

    this.addHook('beforeSave', async (User) => {
      if (User.password) {
        User.password_hash = await bcrypt.hash(User.password, 8)
      }
    });

    return this;
  }

  checkPass(password) {
    return bcrypt.compare(password, this.password_hash);
  }
};

module.exports = User;
