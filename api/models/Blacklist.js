const { DataTypes } = require('sequelize');

module.exports = (sequalize) =>{

    sequalize.define('blacklist',{
        token:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        isactive:{
            type: DataTypes.BOOLEAN,
            defaultValue:true
        }

    })

}