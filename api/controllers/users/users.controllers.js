const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');
const {User} = require('../../db');
const bcrypt = require('bcrypt');
// const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');
// const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
var juice = require('juice');
const hbs = require('nodemailer-express-handlebars');
// const Op = Sequelize.Op;
const BCRYPT_SALT_ROUNDS = 12;
const {
    EMAIL_ADDRESS, 
    EMAIL_PASSWORD
  } = process.env;



const createUser =  async (ctx)=>{              // crea un usuario y envia el mail de validacion


const emailHtml = fs.readFileSync(path.join(__dirname + '../../../views/crateUserMail.html')).toString()
const emailCss = fs.readFileSync(path.join(__dirname + '../../../views/createUserMail.css')).toString()
const inlineHtml = juice.inlineContent(emailHtml, emailCss, { preserveMediaQueries: true });

fs.writeFile(path.join(__dirname + '../../../views/juiceCreateUser.html'), inlineHtml, function (err) {
      if (err) throw err;   
      console.log('Results Received');
}); 


var pin = Math.floor(Math.random() * 999999)
while(pin.toString().length !== 6) {              // me aseguro que el pin sea siempre de 6 digitos (algunas veces salian de 5)
  pin = Math.floor(Math.random() * 999999)  
}

    ctx.params.pin = pin
    console.log(ctx.params)
  try{
      const hash = await bcrypt.hash(ctx.params.password, 10);
      ctx.params.password = hash
      const user = await User.create(ctx.params);
    
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_ADDRESS,
          pass: EMAIL_PASSWORD,
        },
      });

    const options = {
      viewEngine: {
        partialsDir: __dirname + "/views/partials",
        layoutsDir: './views/layouts', //ESTO ANDA MUY RARO. SOLO ME DEJA BUSCAR SI LA CARPETA VIEWS ESTA EN /API Y BUSCA COMO SI ESTUVIERA PARADO AHI (PONGO ../../ Y SALE DOS PARA ATRAS DE API. PONGO ./ Y LO ENCUENTRA) QCYOOO
        extname: ".html"
      },
      extName: ".html",
      viewPath: "views"
    };

    transporter.use('compile', hbs(options))
    const pinObject = {}
    pinObject.pin = pin
   
    const mailOptions = {
      from: 'gohenrybank2020@gmail.com',
      to: `${user.email}`,
      subject: 'Gracias por ingresar! Confirme su cuenta',
        template: "juiceCreateUser",
        context: pinObject

    };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      const json = {
               message:"success", 
               data: user
           }

      return json
  }
    catch(err) {
      
      throw new MoleculerError(err.errors[0].message, 404, "SERVICE_NOT_FOUND")
    }

}


const getMyData = async (ctx) => {  // obtener informacion del usuario segun id
    try {
    const user = await User.findByPk(ctx.params.id)
    const json = {
        message: 'success',
        data: user
    }
    if(user){
    return json;
    } else {
      throw new Errors
    }
}
    catch(err) {
      throw new MoleculerError("user not found", 404, "SERVICE_NOT_FOUND")
    }

}


const editData = async (ctx) => {                         // editar num telefono y domicilio de un usuario segun id
    console.log(ctx.params)   
    const { provincia, pais, calle, numero, email, localidad, phone } = ctx.params;
    try {
        const user = await User.update({
            phone: phone,
            province: provincia,
            city: localidad,
            address: calle,
            addressnum: numero,
            country: pais
          }, {
            returning: true,
            where: { email }
          })
          const json = {
              message: 'success',
              content: user
          }
          if(user[0]){
            return json;
            } else {
              throw new Error
            }
    }
    catch(err) {
      console.log(err)
      throw new MoleculerError("user not found", 404, "SERVICE_NOT_FOUND")
    }

}

const editUser = async (ctx) => {

}


module.exports = {
    createUser, 
    getMyData, 
    editData,
    editUser
}