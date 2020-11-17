const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');
const {User, Account, Movement} = require('../../db.js');



//aqui se genera el numero de transaccion para tener una referencia
const numTransaction = async () =>{

    var num = Math.floor(Math.random() * 999999)

    const dato = await Movement.findOne({
        where:{numTransaction:num}
    })

    if(!dato){
        return num;
    }else{
        return numTransaction();
    }
}

const cash = async (ctx) => {
    const {id, amount, commerce } = ctx.params
    const numTransaction = await numTransaction();
    try {

        const account = await Account.findOne({
            where: {
                userId: id
            }
        })
        const mov = await Movement.create({
        numTransaction,
        state: 'complete',
        amount,
        commerce,
        movement_type: 'cash',
        accountId: account.id
    })
    const json = {
        message: 'success',
        content: mov
    }
    if(account && mov) {
        return json;
    } else {
        throw new Error
    }

    } catch(err) {
        throw new MoleculerError("something went wrong", 404, "SERVICE_NOT_FOUND")
    }      

}


module.exports = {
    cash
}