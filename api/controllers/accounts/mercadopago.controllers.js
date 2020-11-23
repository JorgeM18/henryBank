var mercadopago = require('mercadopago');
const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');
const {User, Account, Movement} = require('../../db.js');
const { Sequelize, Model } = require("sequelize");
require('dotenv').config();
const { default: Axios } = require("axios");
const { whatsappSend } = require('../whatsapp/whats.config.js');
// const open = require('open');
const formatAR = new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS", minimumFractionDigits:2})
const {
  ACCESS_TOKEN_MERCADOPAGO,
  URL
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
    access_token: ACCESS_TOKEN_MERCADOPAGO   //token de la cuenta "GoBank" (la primera de las de arriba)
});

const mercadoPago = async (ctx) => {

  const { amount, id } = ctx.params   // el id es el de usuario. podria ser el de cuenta pero qcyo lo hice asi 

    var preference = {
      back_urls: {
        success: `http://${URL}/api/transactions/mercadopagoconfirm`,
        failure: `http://${URL}/api/transactions/failure`
      },
      binary_mode: true,
      // auto_return: 'approved'
    }
    
    var item =  {
      id: '1234',
      title: 'Recarga',
      description: 'Inspired by the classic foldable art of origami',
      category_id: 'home',
      quantity: 1,
      currency_id: 'ARS',
      unit_price: parseInt(amount)
    }
    

    var payer = {
      name: "Charles",
      surname: "Luevano",
      email: "charles@hotmail.com",
      date_created: "2015-06-02T12:58:41.425-04:00",
      phone: {
        area_code: "",
        number: 949128866
      },
      
      identification: {
        type: "DNI",
        number: "12345678"
      },
      
      address: {
        street_name: "Cuesta Miguel Armendáriz",
        street_number: 1004,
        zip_code: "11020"
      }
    }

    preference.items = [item]
    preference.payer = payer
    
    var res = await mercadopago.preferences.create(preference);
    console.log(res)
    console.log(res.body.init_point, 'MP-' + res.body.id)
    // return res;
    
  

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
        commerce:"MercadoPago",
        movement_type:"deposits",
        accountId: account.id
      })

      //ESTO EFECTUARLO MAS ADELANTE CUANDO TERMINE EL PAGO EN EL BROWSER SI SALE EXITOSO
      // var oldBalance = account.balance
      // await account.update({
      //   balance: oldBalance + amount
      // })
      // await account.update({balance: Sequelize.literal(`balance + ${amount}`)})

      const json = {
        message: 'success',
        content: {
            link: res.body.init_point,
            movement: mov,
            idPago: res.body.id
            // newBalance: account.balance
        }
    }

    


      if(!account || !mov) {
        throw new Error
      } else {
        // await open(res.body.init_point, {app: 'chrome'});  //esto abre en el browser de la pc no en el telefono? probar
        // window.open("https://www.google.com/" , '_system')

        return json
      }

    } catch(err) {
      throw new MoleculerError("error in MercadoPago charge", 404, "SERVICE_NOT_FOUND")  
    }
        
  }

  const mercadoPagoConfirm = async (ctx) => {
    console.log(ctx.params, 'esto')
    const { payment_id, status } = ctx.params
    const id = ctx.params.preference_id

  //   const data = await Axios.get(`https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=${id}`,{
  //     headers:{
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer ' + ACCESS_TOKEN_MERCADOPAGO
  //     } 
  // })

  // const approved = await Axios.get('http://localhost:3000/api/transactions/mercadopago/success')
  // console.log(approved)
  // const data = await Axios.get(`https://api.mercadopago.com/v1/payments/${payment_id}`,{
  //     headers:{
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer ' + ACCESS_TOKEN_MERCADOPAGO
  //     }
  // })
  // .then(res=> {
  //   console.log(res, 'y?')
  // }).catch(err=> {
  //   console.log(err, 'q malll')
  //   throw new Error
  // })

        if(status !== 'approved' ) {   
          throw new Error
        } else {
        
          var mov = await Movement.findOne({
              where: {
                numTransaction: 'MP-' + id
              }
          })

          var account = await Account.findOne({
            where: {
              id: mov.accountId
            }
          })
          const {phone, accounts} = await User.findOne({include:[{
            model:Account,
            where:{userId:mov.accountId}
            }]})
          var oldBalance = account.balance
          console.log(mov.state, 'jejejejejeje')
          if(mov.state !== 'complete'){
            await mov.update({state:"complete"})
            await account.update({balance: oldBalance + mov.amount})
            console.log("telefono!!",phone)
            let moutARS = formatAR.format(mov.amount)
            await whatsappSend(`+${phone}`,`*${accounts[0].alias}* Acabas de recibir una recarga desde *mercadoPago* con un monto de *${moutARS}*`)
            return {
              message:"success",
              content:{
                  state:'Deposit success',
                  complete:true
              }
          }
          }

        }
  }


  const mercadoPagoFailure = async (ctx) => {

      console.log(ctx.params,'holi')
      const { status } = ctx.params
      const id = ctx.params.preference_id

  
        // update al movement.state a complete
        // update al account.balance a oldamount+newamount
        var mov = await Movement.findOne({
            where: {
              numTransaction: 'MP-' + id
            }
        })
    
        
        
        console.log(mov.state)
        if(mov.state !== 'cancelled'){
          await mov.update({state:"cancelled"})
          
          return {
            message:"payment cancelled",
            content:{
                state:'Deposit canceled',
                complete:true
            }
        }
        }
    

  }
  
  


        module.exports = {
          mercadoPago,
          mercadoPagoConfirm,
          mercadoPagoFailure
        }


