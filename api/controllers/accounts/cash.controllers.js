const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');
const {User, Account, Movement} = require('../../db.js');
const { Sequelize, Model } = require("sequelize");
const { whatsappSend } = require("../whatsapp/whats.config.js");
const formatAR = new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS", minimumFractionDigits:2})

//aqui se genera el numero de transaccion para tener una referencia
const numTransaction = async () =>{

    var num = Math.floor(Math.random() * 999999).toString()

    const dato = await Movement.findOne({
        where:{numTransaction:num}
    })

    if(!dato){
        return num;
    }else{
        return numTransaction();
    }
}

const cashDeposit = async (ctx) => {      // depositos en efectivo
    const numMov = await numTransaction();
    const {id, amount, commerce } = ctx.params   // el id es el de usuario. podria ser el de cuenta pero lo hice asi 
    try {

        const account = await Account.findOne({
            where: {
                userId: id
            }
        })
        
        const mov = await Movement.create({
        numTransaction: numMov,
        state: 'complete',
        amount,
        commerce,
        description: 'cash',
        movement_type: 'deposits',
        accountId: account.id
    })

        var oldBalance = account.balance
        await Account.update({
          balance: oldBalance + amount
        },{where:{userId:id}})
        
        const json = {
            message: 'success',
            content: {
                movement: mov,
                newBalance: account.balance
            }
        }
        const {name, phone} = await User.findOne({where:{id}})
        if(account && mov) {
            let moutARS = formatAR.format(amount)
            //esto es para enviar el wsp
            await whatsappSend(`+${phone}`,`*${name}* Acabas de recibir una recarga desde *${commerce}* con un monto de *${moutARS}*`)
            return json;
        } else {
            throw new Error
        }

        } catch(err) {
            throw new MoleculerError("something went wrong", 404, "SERVICE_NOT_FOUND")
        }      

}
const purchase = async (ctx) =>{
    const {amount, commerce, userid} = ctx.params
    console.log(ctx.params)
    let numMov = await numTransaction();

    if(commerce.toLowerCase() === 'play store'){
        numMov = `PS-ALSADO1OAM-${numMov}`
    }else if(commerce.toLowerCase() === 'play station'){
        numMov = `PSN-1AJWEIS1-${numMov}`
    }else if(commerce.toLowerCase() === 'steam'){
        numMov = `ST-QWIEJS5E-${numMov}`
    }


    const {balance, id} = await Account.findOne({where:{userId:userid}})
    
    if(balance<amount){
        throw new MoleculerError("supera el monto maximo", 404, "SERVICE_NOT_FOUND")
    }

    const movement = await Movement.create({
        numTransaction:numMov,
        amount:-amount,
        commerce,
        movement_type:"purchase",
        description:`compras en ${commerce}`,
        state:"complete",
        accountId:id
    })
    if(!movement){
        throw new MoleculerError("favor revisar datos", 404, "SERVICE_NOT_FOUND")
    }
    const desc = await Account.update({balance: Sequelize.literal(`balance - ${amount}`)},{where:{id:id}})
    if(!desc){
        throw new MoleculerError("favor revisar datos", 404, "SERVICE_NOT_FOUND")
    }
    const {phone, name} = await User.findOne({where:{id:userid}})
    let moutARS = formatAR.format(amount)
    await whatsappSend(`+${phone}`,`*${name}* acabas de hacer una compra de *${moutARS}* en *${commerce}*`)


    return{
        message: 'success',
        content:{
            amount,
            commerce,
            numMov
        }
    }

}



const cashExtraction = async (ctx) => {
    const numMov = await numTransaction();
    const {id, amount, commerce } = ctx.params   // el id es el de usuario. podria ser el de cuenta pero lo hice asi 
    try {

        const account = await Account.findOne({
            where: {
                userId: id
            }
        })

        const mov = await Movement.create({
        numTransaction: numMov,
        state: 'complete',
        amount,
        commerce,
        description: 'cash',
        movement_type: 'extraction',
        accountId: account.id
    })

        var oldBalance = account.balance
        await account.update({
          balance: oldBalance - amount
        })

        const json = {
            message: 'success',
            content: {
                movement: mov,
                newBalance: account.balance
            }
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

            cashDeposit,
        cashExtraction,
        purchase
}