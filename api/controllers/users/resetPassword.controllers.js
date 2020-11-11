const { User } = require('../../db');
const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const { MoleculerError } = require("moleculer").Errors;
const Op = Sequelize.Op;
const BCRYPT_SALT_ROUNDS = 10;
const {
    EMAIL_ADDRESS, 
    EMAIL_PASSWORD
  } = process.env;



// const forgotPassword = async (ctx) => {
// var error;
// var success;
//     if (ctx.params.email === '') {
//         console.log(EMAIL_ADDRESS, 
//             EMAIL_PASSWORD)
//          console.error('email required');
//          return 'email required';               // *EL DE ARRIBA*
//     }
//     console.error(ctx.params.email);
//     await User.findOne({
//       where: {
//         email: ctx.params.email,
//       },
//     }).then((user) => {
//         console.log(user)
//       if (!user) {
//           console.error('email not in database');
//           error = 'email not in db';                    //POR Q NO LLEGA ESTE MENSAJE Y SI LLEGA EL DE ARRIBA???
//       } else {
//         const token = crypto.randomBytes(20).toString('hex');
//         user.update({
//           passwordResetPIN: token,
//           resetPinExpires: Date.now() + 3600000,
//         });
//         const transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//             user: EMAIL_ADDRESS,
//             pass: EMAIL_PASSWORD,
//           },
//         });

//         const mailOptions = {
//           from: 'gohenrybank2020@gmail.com',
//           to: `${user.email}`,
//           subject: 'Link para resetear contraseña',
//           text:
//             'Este es un mail para actualizar la contraseña de su cuenta de GoHenryBank\n\n'
//             + 'Por favor cliquea en el siguiente link, o copielo y peguelo en el navegador para completar el proceso. La validez del link es de 60 minutos:\n\n'
//             + `http://localhost:3000/resetpassword/${token}\n\n`
//             + 'Si usted no hizo este pedido, por favor ignore este mail y su contraseña sera conservada.\n',
//         };

//         console.log('sending mail');

//         transporter.sendMail(mailOptions, (err, response) => {
//           if (err) {
//             console.error('there was an error: ', err);
//             error = 'error sending mail'
//           } else {
//             success = 'recovery email sent'
//             console.log('here is the res: ', response);
//             console.log(success);
//           }

//         });
//       }
//     });
//     if(error) return error;
//     // return 'sent'
//     if(success) return success;
// }

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
                return 'email not in db';                    //POR Q NO LLEGA ESTE MENSAJE Y SI LLEGA EL DE ARRIBA???
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

    
            const mailOptions = {
                from: 'gohenrybank2020@gmail.com',
                to: `${user.email}`,
                subject: 'Link para resetear contraseña',
                text:
                'Este es un mail para actualizar la contraseña de su cuenta de GoHenryBank\n\n'
                + 'Por favor cliquea en el siguiente link, o copielo y peguelo en el navegador para completar el proceso. La validez del link es de 60 minutos:\n\n'
                + `Su pin de recuperacion: ${pinCode}\n\n`
                + 'Si usted no hizo este pedido, por favor ignore este mail y su contraseña sera conservada.\n',
            };
    
            console.log('sending mail');
    
            transporter.sendMail(mailOptions, (err, response) => {
            
            if (err) {
                console.error('there was an error: ', err);
                // error = 'error sending mail'
            } else {
                console.log('here is the res: ', response);
                // success = 'recovery emaiiiil sent'
                return 'email sentt'
            }
        });
        // if(success) return success;
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
        console.error('password reset link is invalid or has expired');
        return 'password reset link is invalid or has expired';
    // } 
}
}


const updatePassword = async (ctx) => {     // actualiza la contrasenia

      
       const hash = await bcrypt.hash(ctx.params.password, BCRYPT_SALT_ROUNDS);
         
        const updated = await user.update({
                password: hash,
                passwordResetPIN: null,
                resetPinExpires: null,
              });
            
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