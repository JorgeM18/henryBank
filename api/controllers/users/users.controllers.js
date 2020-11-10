
const {User} = require('../../db');
const bcrypt = require('bcrypt');


const createUser =  async (ctx)=>{ // Recibe el ctx (contexto) que son todos los datos 
   console.log(ctx)
  try{
      const hash = await bcrypt.hash(ctx.params.password, 10);
      ctx.params.password = hash
      const user = await User.create(ctx.params);
      const json = {
               message:"success", 
               content: user
           } // Luego toma la respuesta que da
      return json // Y se retorna 
  }
    catch(err) {
        console.log(err)
    }

}



const getMyData = async (ctx) => {  // obtener informacion del usuario segun id
    try {
    const user = await User.findByPk(ctx.params.id)
    const json = {
        message: 'success',
        content: user
    }
    if(user){
    return json;
    } else {
        return "no existe el usuario"
    }
}
    catch(err) {
        return 'noxo'
    }

    // User.findOne({
    //     where: {
    //         id: ctx.params.id
    //     }
    // }).then(res => {
    //     console.log(res)
    //     return res              //POR Q NO ME LO MANDA AL POSTMAN? PERO SI LO CONSOLELOGUEA
    // }).catch(err => {
    //     return err
    // })
}


const editData = async (ctx) => {                         // editar num telefono y domicilio de un usuario segun id
    const { phone, province, city, address, addressnum } = ctx.params 
    try {
        const user = await User.update({
            phone,
            province,
            city,
            address,
            addressnum
          }, {
            returning: true,
            where: {
              id: ctx.params.id
            }
          })
          const json = {
              message: 'success',
              content: user
          }
          if(user[0]){
            return json;
            } else {
                return "no existe el usuario"
            }
    }
    catch(err) {
        return 'Los datos ingresados no son permitidos'
    }

}





module.exports = {
    createUser, 
    getMyData, 
    editData
}