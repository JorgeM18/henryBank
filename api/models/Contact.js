const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('contact', {
    alias:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(['contact','favorite','blocked']),
        defaultValue: 'contact'
    },
  }, { timestamps: false });
}; 
  