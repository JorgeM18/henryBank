const {User} = require('../../db');
const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');

const validateUserPin = async (ctx) => {
  console.log(ctx.params)
  const user = await User.findOne({
      where: {
        pin: ctx.params.pin,
      },
    })

      if (user == null) {
        console.error('Invalid user pin');
        throw new MoleculerError("Invalid user pin", 404, "SERVICE_NOT_FOUND", {pin:false})
      } else if (user != null) {
        return{ 
          message:"success", 
          pin:true
      };
      } 
}

const approveUser = async (ctx) => { // Recibe el ctx (contexto) que son todos los datos 
    const { email, name, lastname, typeDoc, numberDoc, birthday, numberPhone, image } = ctx.params
    console.log('PARAMETROS')
    console.log(ctx.params)
    try{

     const data = await User.update({
        name: name,
        lastname: lastname,
        image: image,
        pin: null,
        documenttype: typeDoc,
        documentnum: parseInt(numberDoc),
        phone: parseInt(numberPhone),
        birth: birthday,
        approved: true}, { where: { email: email }})

        if(data[0] === 1){
          return { 
            message:"success", 
            user:true
          }
         }else{
          throw new Errors
         }
    }catch(err){
      console.log(err)
      throw new MoleculerError("Error", 404, "SERVICE_NOT_FOUND", {user:false})
    }
}

module.exports = {
    validateUserPin,
    approveUser
}