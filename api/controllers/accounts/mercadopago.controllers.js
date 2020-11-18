var mercadopago = require('mercadopago');
const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');
const {User, Account, Movement} = require('../../db.js');
require('dotenv').config();
const {
  ACCESS_TOKEN_MERCADOPAGO
} = process.env;

// var GoBank = {"id":673980059,"nickname":"TESTHSDCXKZI","password":"qatest7335","site_status":"active","email":"test_user_24540020@testuser.com"}
// var gonza  = {"id":673983123,"nickname":"TETE5740146","password":"qatest3470","site_status":"active","email":"test_user_80034649@testuser.com"}
// var jorge = {"id":674057689,"nickname":"TETE4194881","password":"qatest7851","site_status":"active","email":"test_user_76507151@testuser.com"}
// var carlos = {"id":674054080,"nickname":"TETE9984328","password":"qatest6311","site_status":"active","email":"test_user_34433017@testuser.com"}
// var vicky = {"id":674057921,"nickname":"TETE4787355","password":"qatest7371","site_status":"active","email":"test_user_89621035@testuser.com"}
// var juan = {"id":674057955,"nickname":"TETE1112175","password":"qatest3457","site_status":"active","email":"test_user_91671330@testuser.com"}
// var vero = {"id":674060156,"nickname":"TEST0PJXXRJL","password":"qatest2827","site_status":"active","email":"test_user_46959093@testuser.com"}
// var flor = {"id":674062385,"nickname":"TETE6316186","password":"qatest9290","site_status":"active","email":"test_user_28665428@testuser.com"}
// var alexis = {"id":674060304,"nickname":"TEST3KCDWRY2","password":"qatest7807","site_status":"active","email":"test_user_64723129@testuser.com"}
// quedan dos compradores para crear. el max es 10


mercadopago.configure({
    access_token: ACCESS_TOKEN_MERCADOPAGO //token de la cuenta "GoBank" (la primera de las de arriba)
});

const mercadoPago = async (ctx) => {

  const { amount, id } = ctx.params   // el id es el de usuario. podria ser el de cuenta pero lo hice asi 

    var preference = {}
    
    var item = {
      title: 'Recarga',
      quantity: 1,
      currency_id: 'ARS',
      unit_price: amount
    }
    
    var payer = {
      email: "demo@mail.com"
    }
    
    preference.items = [item]
    preference.payer = payer
    
    var res = await mercadopago.preferences.create(preference);

    console.log(res.body.init_point, res.body.id)
    // return res;

    //hacer q se abra el link res.body.init_point en el browser. FALTA ESTO

  try {

      const account = await Account.findOne({
          where: {
            userId: id
          }
      });

      const mov = await Movement.create({
        numTransaction: 'MP-' + res.body.id ,
        state:"created",
        amount: amount,
        description:"Deposito MercadoPago",
        movement_type:"deposits",
        accountId: account.id
      })

      const json = {
        message: 'success',
        content: mov
      }

      if(!account || !mov) {
        throw new Error
      } else {
        return json
      }

    } catch(err) {
      throw new MoleculerError("error in MercadoPago charge", 404, "SERVICE_NOT_FOUND")  
    }
        
  }


module.exports = {
  mercadoPago
}
