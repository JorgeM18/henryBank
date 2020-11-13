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
    const { email, name, lastname, pin, phone, birth, image, province, city, address, addressnum } = ctx.params
    console.log(ctx.params)
    try{

     const data = await User.update({
        name: name,
        lastname: lastname,
        pin: null,
        phone: phone,
        birth: birth,
        image: image,
        province: province,
        city: city,
        address: address,
        addressnum: addressnum,
        approved: true}, { where: { name: lastname } 
      })

        if(data[0] === 1){
          return { 
            message:"success", 
            user:true
          }
         }else{
          throw new Errors
         }
    }catch(err){
      throw new MoleculerError("Error", 404, "SERVICE_NOT_FOUND", {user:false})
    }
}

module.exports = {
        validateUserPin,
    approveUser
}