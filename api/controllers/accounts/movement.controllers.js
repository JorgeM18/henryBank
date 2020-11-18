const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');
const { use } = require("passport");
const { Sequelize, Model } = require("sequelize");
const {User, Account, Movement} = require('../../db.js')


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

const transaction = async (ctx) =>{
    const {phoneUser, phoneContact, amount, description} = ctx.params
    const numMov = await numTransaction();

    try{

        //Se verifica el numero de telefono para traer su cvu de la persona que envia el dinero
        const user = await Account.findOne({include:[{
            model:User,
            where:{phone:phoneUser}
        }]})

        //Se verifica el numero de telefono para traer su cvu de la persona que recibe el dinero
        const contact = await Account.findOne({include:[{
            model:User,
            where:{phone:phoneContact}
        }]})
        
        //Verifica si no supera su monto maximo
        if(user.balance < amount ){
            throw new Error
        }
        if(!user){
            throw new Error
        }
        if(!contact){
            throw new Error
        }
        
        //descuenta y agrega el monto enviado
        await Account.update({balance: Sequelize.literal(`balance - ${amount}`)},{where:{cbu:user.cbu}})
        await Account.update({balance: Sequelize.literal(`balance + ${amount}`)},{where:{cbu:contact.cbu}})
        
        //Crea el movimiento para mantener el registro con el mismo numero de transaccion
        await Movement.create({
            numTransaction: numMov,
            state:"complete",
            amount: amount,
            description:description,
            movement_type:"receiver",
            accountId: contact.id
        })

        await Movement.create({
            numTransaction: numMov,
            state:"complete",
            amount: -amount,
            description:description,
            movement_type:"sender",
            accountId: user.id
        })
        

       return{
           message:"success",
           data:{
            numTransaction:numMov,
            type:"sender",
            amount:amount,
            sender:{
                phone:phoneUser,
                alias:user.alias,
                fullName:`${user.user.name} ${user.user.lastname}`,
                dni:user.user.dni
            },
            receiver:{
                phone:phoneContact,
                alias:contact.alias,
                fullName:`${contact.user.name} ${contact.user.lastname}`,
                dni:contact.user.dni
            }
           }
        }

    }catch(err){
        throw new MoleculerError("supera el monto maximo", 404, "SERVICE_NOT_FOUND",{err:"err"})
    }
}

const pruebaAcount = async (ctx) =>{
    
    const datos = await Account.create(ctx.params)
    return datos
}


module.exports={
    transaction,
    pruebaAcount
}