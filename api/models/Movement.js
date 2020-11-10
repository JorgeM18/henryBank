const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

   sequelize.define('movement', {
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    account_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    movement_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
