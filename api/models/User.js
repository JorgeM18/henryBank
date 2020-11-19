const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('user', {
    name:{
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname:{
      type: DataTypes.STRING,
      allowNull: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    pin:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
    }, 
    phone:{
        type: DataTypes.STRING,
        allowNull: true
      },
    documenttype:{
        type: DataTypes.STRING,
        allowNull: true
    },
    documentnum:{
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: true
    },
    birth:{
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    image:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    approved:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    country: {
      type: DataTypes.STRING,
    },
    province:{
      type: DataTypes.STRING,
      allowNull: true
    },
    city:{
      type: DataTypes.STRING,
      allowNull: true
    },
    address:{
      type: DataTypes.STRING,
      allowNull: true
    },
    addressnum:{
      type: DataTypes.STRING,
      allowNull: true
    }, 
    passwordResetPIN: DataTypes.INTEGER,
    resetPinExpires: DataTypes.DATE
  });
}; 
  