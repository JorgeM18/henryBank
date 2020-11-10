const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('account', {
    balance:{
      type: DataTypes.BIGINT,
      allowNull: false,
      default: 0,
    },
    alias:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cbu:{
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true 
        }  
    },
    pin:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    accounttype:{
        type: DataTypes.STRING,
        allowNull: false
    }
  });
}; 
  