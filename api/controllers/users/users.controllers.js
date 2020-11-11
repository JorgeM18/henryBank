
const {User} = require('../../db');
const bcrypt = require('bcrypt');


const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { Sequelize } = require('sequelize');

const Op = Sequelize.Op;
const BCRYPT_SALT_ROUNDS = 12;
const {
    EMAIL_ADDRESS, 
    EMAIL_PASSWORD
  } = process.env;

var fs = require('fs');




const createUser =  async (ctx)=>{              // crea un usuario y envia el mail de validacion
    const pin = Math.floor(Math.random() * 999999);
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

    //   const mailOptions = {
    //     from: 'gohenrybank2020@gmail.com',
    //     to: `${user.email}`,
    //     subject: 'Gracias por ingresar! Confirme su cuenta',
    //     text:
    //       'Este es un mail para confirmar y completar su cuenta de Go Henry Bank\n\n'
    //       + 'Por favor cliquea en el siguiente link, o copielo y peguelo en el navegador para completar el proceso.\n\n'
    //       + `http://localhost:3000/NIDEA\n\n`
    //       + 'Si usted no hizo este pedido, por favor ignore este mail.\n',
    //   };

    //   console.log('sending mail');

    //   transporter.sendMail(mailOptions, (err, response) => {
    //     if (err) {
    //       console.error('there was an error: ', err);
    //       console.log('error en el envio de mail');
    //     } else {
    //       console.log('here is the res: ', response);
    //       console.log('recovery email sent');
    //     }
    //   });

    fs.readFile('./emailtemp/createUserTemp/crateUserMail.html', {encoding: 'utf-8'}, function (err, html) {
        if (err) {
          console.log(err);
        } else {
          var mailOptions = {
            from: 'gohenrybank2020@gmail.com',
            to: `${user.email}`,
            subject: 'Gracias por ingresar! Confirme su cuenta',
            html: html
          };
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
    })


      const json = {
               message:"success", 
               content: user
           }
           
      return json
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