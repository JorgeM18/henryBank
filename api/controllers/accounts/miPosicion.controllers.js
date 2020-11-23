const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');
const { use } = require("passport");
const { Sequelize, Model } = require("sequelize");
const {User, Account, Movement} = require('../../db.js');
const Op = Sequelize.Op;



const balanceAndImage = async (ctx) => { 
      // devuelve el balance de la cuenta y la foto (para pantalla de miposicion)
    try {
        const account = await Account.findOne({ 
            where: {
                userId: ctx.params.id
            },
            include: {
                model: User,
                required: true
            }
        })
        const json = {
            message: 'success',
            content: {
                balance: account.balance,
                image: account.user.image
            }
        }
        if(account) {
            return json;
        } else {
            throw new Error
        }
    } catch(err) {
        throw new MoleculerError("account not found", 404, "SERVICE_NOT_FOUND")
      }
}


const incomeOutcome = async (ctx) => {  // devuelve el income y outcome de la cuenta en determinado periodo de tiempo
    const { id, days } = ctx.params
    var ms = days*86400000;  // dias a milisegundos
    var period = Date.now() - ms
    try {
        const account = await Account.findOne({  // nose si recibo el userId o el account id. depende de si al final el user puede tener mas de una cuenta o una sola
            where: {
                userId: id
            },
            include: {
                model: Movement,
                where: {
                    createdAt: {
                        [Op.gt]: period,  // que la fecha de la transaccion sea mayor al date.now - periodo de dias
                      },
                }
            }
        })
        
        var income = 0;
        for(var i = 0; i < account.movements.length; i++){
            if(account.movements[i].movement_type==='receiver' || account.movements[i].movement_type==='deposits' || account.movements[i].movement_type==='card') { //incluir deposits?
                income = income + account.movements[i].amount
            }
        }
        var outcome = 0;
        for(var i = 0; i < account.movements.length; i++){
            if(account.movements[i].movement_type==='sender' || account.movements[i].movement_type==='extraction' || account.movements[i].movement_type==='purchase') { 
                outcome = outcome - account.movements[i].amount
            }
        }

        const json = {
            message: 'success',
            content: {
                income: income,
                outcome: outcome
            }
        }
        if(account) {
            return json
        } else {
            throw new Error
        }
    } catch (err) {
        throw new MoleculerError("no hay movimientos dentro de estas fechas", 404, "SERVICE_NOT_FOUND")
    }
}



module.exports = {
    balanceAndImage,
    incomeOutcome
}