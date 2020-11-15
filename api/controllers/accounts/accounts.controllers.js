const {User, Account} = require('../../db.js')

const genCBU = async() =>{
    const cbu = "00000000" + Math.floor(Math.random() * 99999999999999)

    const verify =  await Account.findOne({where:{cbu:cbu}})

    if(!verify && cbu.length === 22){
      return cbu
    }else{
        return genCBU();
    }
    
}

const account = async (ctx) =>{
    const {id, alias, pin} = ctx.params
    const cbuCode = await genCBU();
    try{

        const data = await Account.create({
            balance:0,
            alias:alias,
            cbu:cbuCode,
            pin:pin,
            accounttype:"ARS",
            userId:id
        })
        return data

    }catch(err){
        return err
    }

}

module.exports={
    account
}