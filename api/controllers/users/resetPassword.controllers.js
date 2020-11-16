const { User } = require('../../db');
const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const hbs = require('nodemailer-express-handlebars');
const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');
var juice = require('juice');
const fs = require('fs');
const path = require('path');


const Op = Sequelize.Op;
const BCRYPT_SALT_ROUNDS = 10;
const {
    EMAIL_ADDRESS, 
    EMAIL_PASSWORD
  } = process.env;



const forgotPassword = async (ctx) => {    // envia el mail a la direccion ingresada

  const emailHtml = fs.readFileSync(path.join(__dirname + '../../../views/passwordReset.html')).toString()
  const emailCss = fs.readFileSync(path.join(__dirname + '../../../views/changePassTemp.css')).toString()
  const inlineHtml = juice.inlineContent(emailHtml, emailCss, { preserveMediaQueries: true });

  fs.writeFile(path.join(__dirname + '../../../views/juicePassword.html'), inlineHtml, function (err) {
    if (err) throw err;   
                console.log('Results Received');
  }); 
  
    // var error;
    // var success; 
        if (ctx.params.email === '') {
            console.log(EMAIL_ADDRESS, 
                EMAIL_PASSWORD)
            console.error('email required');
            throw new MoleculerError("email required", 400, "SERVICE_NOT_FOUND")  // *EL DE ARRIBA*
        }
        console.error(ctx.params.email);
  try {
        // var error;
        // var success;
        var pinCode = Math.floor(Math.random() * 999999)
        while(pinCode.toString().length !== 6) {              // me aseguro que el pin sea siempre de 6 digitos (algunas veces salian de 5)
          pinCode = Math.floor(Math.random() * 999999)  
        }
        const user =  await User.findOne({
            where: {
                email: ctx.params.email,
            },
            })
            
            if (!user) {
               // console.error('email not in database');
               throw new Errors            
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
                  extname: ".html"
              },
              extName: ".html",
              viewPath: "views"
            };
        
            transporter.use('compile', hbs(options))
            const pinObject = {}
            pinObject.pin = pinCode
           
            const mailOptions = {
              from: 'gohenrybank2020@gmail.com',
              to: `${user.email}`,
              subject: 'Recupere su cuenta de Go HBank',
                template: "juicePassword",
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
      return{
          message:"success",
          send:true
      }
  }    
  catch {
      // if(error) return error;
      throw new MoleculerError("email not in database", 404, "SERVICE_NOT_FOUND")  
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
            message: 'password reset pin ok',
            data:{
                name: user.name
            }
        };
        return json;    
    }
    catch(err) {
        throw new MoleculerError("Invalid user pin", 404, "SERVICE_NOT_FOUND")

    // if (user == null) {
        // console.error('password reset pin is invalid or has expired');
        // return 'password reset pin is invalid or has expired';
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
      //return 'no user exists in db to update';
      throw new MoleculerError("no user exists in db to update", 404, "SERVICE_NOT_FOUND")
    }
}



module.exports = { forgotPassword, 
          validatePasswordPin, 
    updatePassword }