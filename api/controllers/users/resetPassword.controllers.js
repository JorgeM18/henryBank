const { User } = require('../../db');
const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const hbs = require('nodemailer-express-handlebars');
const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');

const Op = Sequelize.Op;
const BCRYPT_SALT_ROUNDS = 10;
const {
    EMAIL_ADDRESS, 
    EMAIL_PASSWORD
  } = process.env;



const forgotPassword = async (ctx) => {    // envia el mail a la direccion ingresada
    // var error;
    // var success; 
        if (ctx.params.email === '') {
            console.log(EMAIL_ADDRESS, 
                EMAIL_PASSWORD)
            console.error('email required');
            return 'email required';               // *EL DE ARRIBA*
        }
        console.error(ctx.params.email);
  try {
        // var error;
        // var success;
        const pinCode = Math.floor(Math.random() * 999999);
        const user =  await User.findOne({
            where: {
                email: ctx.params.email,
            },
            })
            
            if (!user) {
                console.error('email not in database');
                return 'email not in db';                    
            } 
            
            else {
            // const token = crypto.randomBytes(20).toString('hex');
            user.update({
                passwordResetPIN: pinCode,
                resetPinExpires: Date.now() + 600000,   //10 minutos para resetear la contra
            });
            
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
                extname: ".hbs"
              },
              extName: ".hbs",
              viewPath: "views"
            };
        
            transporter.use('compile', hbs(options))
            const pinObject = {}
            pinObject.pin = pinCode
           
            const mailOptions = {
              from: 'gohenrybank2020@gmail.com',
              to: `${user.email}`,
              subject: 'Recupere su cuenta de Go HBank',
                template: "passwordReset",
                context: pinObject
        
            };
        
              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
      
      }
  }    
  catch {
      // if(error) return error;
      }
  }


const validatePasswordPin = async (ctx) => {       //verifico la validez del pin (si todavia no expiro)

    try {
      const user = await User.findOne({
        where: {
          passwordResetPIN: ctx.params.passwordResetPIN,
          resetPinExpires: {
            [Op.gt]: Date.now(),
          },
        },
      })
        const json =  {
            name: user.name,
            message: 'password reset pin ok',
        };
        return json;    
    }
    catch {

    // if (user == null) {
        console.error('password reset pin is invalid or has expired');
        return 'password reset pin is invalid or has expired';
    // } 
}
}


const updatePassword = async (ctx) => {     // actualiza la contrasenia
 
  const user = await User.findOne({
    where: {
      passwordResetPIN: ctx.params.passwordResetPIN,
    },
  })
     
    const hash = await bcrypt.hash(ctx.params.password, BCRYPT_SALT_ROUNDS);
    var updated = null

    if(user) {
      updated = await user.update({
            password: hash,
            passwordResetPIN: null,
            resetPinExpires: null,
          });
        }
            
    if(updated) {
    console.log('password updated');
    return { message: 'password updated' };
    }
    else {
      console.error('no user exists in db to update');
      return 'no user exists in db to update';
    }
}



module.exports = { forgotPassword, 
          validatePasswordPin, 
    updatePassword }