
const {User} = require('../../db');

module.exports = async (ctx) => { // Recibe el ctx (contexto) que son todos los datos 
    const { email, name, lastname, pin, phone, birth, image, province, city, address, addressnum } = ctx.params
    let json;

    await User.update({
        name: name,
        lastname: lastname,
        pin: pin,
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

