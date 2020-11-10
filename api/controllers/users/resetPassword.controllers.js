const { User } = require('../../db');
const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const Op = Sequelize.Op;
const BCRYPT_SALT_ROUNDS = 12;
const {
    EMAIL_ADDRESS, 
    EMAIL_PASSWORD
  } = process.env;



const forgotPassword = (ctx) => {

    if (ctx.params.email === '') {
        console.log(EMAIL_ADDRESS, 
            EMAIL_PASSWORD)
         console.error('email required');
         return 'email required';               // *EL DE ARRIBA*
    }
    console.error(ctx.params.email);
    User.findOne({
      where: {
        email: ctx.params.email,
      },
    }).then((user) => {
        console.log(user)
      if (!user) {
          console.error('email not in database');
          return 'email not in db';                    //POR Q NO LLEGA ESTE MENSAJE Y SI LLEGA EL DE ARRIBA???
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        user.update({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000,
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
            + `http://localhost:3000/resetpassword/${token}\n\n`
            + 'Si usted no hizo este pedido, por favor ignore este mail y su contraseña sera conservada.\n',
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
            return 'errr'
          } else {
            console.log('here is the res: ', response);
            return 'recovery email sent';
          }
        });
      }
    });


}


const resetPassword = (ctx) => {

    User.findOne({
        where: {
          resetPasswordToken: req.query.resetPasswordToken,
          resetPasswordExpires: {
            [Op.gt]: Date.now(),
          },
        },
      }).then((user) => {
        if (user == null) {
          console.error('password reset link is invalid or has expired');
          return 'password reset link is invalid or has expired';
        } else {
          return {
            name: user.name,
            message: 'password reset link a-ok',
          };
        }
      });

}


const updatePassword = (ctx) => {

    User.findOne({
        where: {
          name: ctx.params.name,
          resetPasswordToken: ctx.params.resetPasswordToken,
          resetPasswordExpires: {
            [Op.gt]: Date.now(),
          },
        },
      }).then(user => {
        if (user == null) {
          console.error('password reset link is invalid or has expired');
          return 'password reset link is invalid or has expired';
        } else if (user != null) {
          console.log('user exists in db');
          bcrypt
            .hash(ctx.params.password, BCRYPT_SALT_ROUNDS)
            .then(hashedPassword => {
              user.update({
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
              });
            })
            .then(() => {
              console.log('password updated');
              return { message: 'password updated' };
            });
        } else {
          console.error('no user exists in db to update');
          return 'no user exists in db to update';
        }
      });


}



module.exports = { forgotPassword, resetPassword, updatePassword }