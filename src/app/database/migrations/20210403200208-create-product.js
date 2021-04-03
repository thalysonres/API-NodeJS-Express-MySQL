module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'Users',
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      attachment_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Attachments',
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,            
        unique: true,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      price: {
        type: Sequelize.FLOAT(8,2),
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};
