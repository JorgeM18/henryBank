const { DataTypes } = require('sequelize');

module.exports = (sequalize) =>{

    sequalize.define('card',{
        cardNumber:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate:{
                isCreditCard: true
            }
        },
        expirationDate:{
            type: DataTypes.STRING,
            allowNull:false
        },
        securityCode:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        bank:{
            type: DataTypes.STRING,
            allowNull:false
        },
        type:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        cardName:{
            type: DataTypes.STRING,
            allowNull:true,
        }
    })

}