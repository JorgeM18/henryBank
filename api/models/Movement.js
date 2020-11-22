const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

   sequelize.define('movement', {
    numTransaction:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    movement_type: {
      type: DataTypes.ENUM('deposits', 'sender', 'receiver', 'extraction', 'card', 'purchase'),
      allowNull: false
    },
    commerce: {
      type: DataTypes.STRING
    }
  });
};
