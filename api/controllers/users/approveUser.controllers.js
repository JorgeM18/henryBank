
const {User} = require('../../db');

const validateUserPin = async (ctx) => {
    const user = await User.findOne({
        where: {
          pin: ctx.params.pin,
        },
      })

        if (user == null) {
          console.error('password reset link is invalid or has expired');
          return 'password reset link is invalid or has expired';
        } else if (user != null) {
          console.log('user exists in db');
        }
}

const approveUser = async (ctx) => { // Recibe el ctx (contexto) que son todos los datos 
    const { email, name, lastname, pin, phone, birth, image, province, city, address, addressnum } = ctx.params
    let json;

    await User.update({
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
        approved: true}, { where: { email: email } })
    .then(console.log("User Approved"))
    .catch(err=>{
         console.log(err)
     })
 
     return json 
}

module.exports = {
        validateUserPin,
    approveUser
}