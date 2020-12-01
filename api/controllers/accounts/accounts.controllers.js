const {User, Account} = require('../../db.js')
const { MoleculerError } = require("moleculer").Errors;

const genCBU = async() =>{
    const cbu = "00000000" + Math.floor(Math.random() * 99999999999999)

    const verify =  await Account.findOne({where:{cbu:cbu}})

    if(!verify && cbu.length === 22){
      return cbu
    }else{
        return genCBU();
    }
    
}

const account = async (id, alias, pin,customer) =>{
    //const {id, alias, pin} = ctx.params
    const cbuCode = await genCBU();
    try{

        const data = await Account.create({
            balance:0,
            alias:alias,
            cbu:cbuCode,
            pin:pin,
            accounttype:"ARS",
            userId:id,
            customer: customer
        })
        return data

    }catch(err){
        return err
    }

}

const getAccount = async (ctx) =>{
    const {userId} = ctx.params

    try{
       const data = await Account.findOne({where:{userId}})
       
       if(!data){
        throw new Error;
       }

       return{
        message:"success",
        data
       }
    }catch(err){
        throw new MoleculerError("user not found", 402, "SERVICE_NOT_FOUND")
    }
}

module.exports={
    account,
    getAccount
}