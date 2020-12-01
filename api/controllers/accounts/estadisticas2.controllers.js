const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');
const { use } = require("passport");
const { Sequelize, Model, RANGE } = require("sequelize");
const {User, Account, Movement} = require('../../db.js');
const Op = Sequelize.Op;
const fn = Sequelize.fn;
const col = Sequelize.col;
var moment = require('moment')



const est2 = async (ctx) => {
    const { id, days } = ctx.params // trae el account id
    // const account = await Account.findOne({  // nose si recibo el userId o el account id. depende de si al final el user puede tener mas de una cuenta o una sola
    //     where: {
    //         userId: id
    //     },
    //     include: {
    //         model: Movement,
    //         where: {
    //             createdAt: {
    //                 [Op.gt]: period,  // que la fecha de la transaccion sea mayor al date.now - periodo de dias
    //               },
    //                 [Op.or]: [
    //                         {
    //                         movement_type: 'sender'
    //                     }, {
    //                         movement_type: 'extraction'
    //                     }, {
    //                         movement_type: 'purchase'
    //                     }
    //                 ] 
    //         }
    //     }
    // })

    // const movements = await Movement.sum('amount', {
    //     where: {
    //         accountId: id,
    //         movement_type: {
    //             [Op.or]: ['sender', 'purchase', 'extraction']
    //         },
            
    //     },
    //     group: [fn('date_trunc', 'month', col('createdAt'))]
    // })

    // return movements;
    const movements = await Movement.findAll( {
        where: {
            accountId: id,
            movement_type: {
                [Op.or]: ['sender', 'purchase', 'extraction']
            },
        },
        attributes: [[fn('date_trunc', 'month', col('createdAt')), 'month'],[fn('sum',col('amount')), 'total_amount']],
        // group: [fn('date_trunc', 'month', col('createdAt'))],
        group:['month']
       
   
    })
    const json={
        message: 'success',
        content: {
            gastos:movements
        },  
    }

    return json;


}

module.exports = {
    est2
}