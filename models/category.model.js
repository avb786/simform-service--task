const Sequelize = require('sequelize');

const sequelize = require('../utils/sqlDb');

const Category = sequelize.define('category', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    categoryName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contentId: {
        type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  
  
  module.exports = Category;


