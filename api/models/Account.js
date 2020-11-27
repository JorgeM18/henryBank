const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('account', {
    balance:{
      type: DataTypes.FLOAT,
      allowNull: false,
      default: 0,
    },
    alias:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cbu:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    pin:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    accounttype:{
        type: DataTypes.STRING,
        allowNull: false
    },
    customer: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
};
  