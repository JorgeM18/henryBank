const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

   sequelize.define('movement', {
    numTransaction:{
      type: DataTypes.BIGINT,
      allowNull: false
    },
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
    movement_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
