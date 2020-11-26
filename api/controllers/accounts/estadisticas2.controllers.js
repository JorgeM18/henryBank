const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');
const { use } = require("passport");
const { Sequelize, Model } = require("sequelize");
const {User, Account, Movement} = require('../../db.js');
const Op = Sequelize.Op;
const fn = Sequelize.fn;
const col = Sequelize.col;



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

    const movements = await Movement.sum('amount', {
        where: {
            accountId: id,
            movement_type: {
                [Op.or]: ['sender', 'purchase', 'extraction']
            },
            
        },
        group: [fn('date_trunc', 'month', col('createdAt'))]
    })

    return movements;


}



module.exports = {
    est2
}