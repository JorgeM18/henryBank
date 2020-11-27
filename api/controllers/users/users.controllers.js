const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');
const { User, Contact } = require('../../db');
const {Op} = require('sequelize'); // Import operator from sequelize module.
const bcrypt = require('bcrypt');
// const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');
// const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
var juice = require('juice');
const hbs = require('nodemailer-express-handlebars');
const { account } = require("../accounts/accounts.controllers");
const { whatsappSend } = require("../whatsapp/whats.config");

// const Op = Sequelize.Op;
const BCRYPT_SALT_ROUNDS = 12;
const {
    EMAIL_ADDRESS, 
    EMAIL_PASSWORD,
    STRIPE_SECRET_KEY
  } = process.env;


const stripe = require('stripe')(`${STRIPE_SECRET_KEY}`);
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
            console.log(json.content[1][0])
            const customer = await stripe.customers.create({
              name: `${json.content[1][0].name} ${json.content[1][0].lastname}`,
              email: json.content[1][0].email,
              phone: json.content[1][0].phone,
            });
            const customerId = customer.id;
            account(json.content[1][0].id, `GO_${json.content[1][0].name}_${Math.floor(Math.random() * 999999)}`,'1234',customerId)
            whatsappSend(`+${json.content[1][0].phone}`,`*${json.content[1][0].name}!!* Bienvenido a *GO BANK* 🏦 realiza tu primer deposito y comienza disfrutar todos los beneficios que tenemos para vos 🙌 💳`)
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

const editUser = async (ctx) =>{
  const { phone, address, addressnum, city, province, country, email } = ctx.params
  try {
    const user = await User.update(
      {
        phone, address, addressnum, city, province, country
      },
      {
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

const getContacts = async (ctx) => {
  const { userId } = ctx.params
  let id = parseInt(userId) 
  try{
    const userContacts = await Contact.findAll({where: { userId: id }});
    console.log(userContacts, "ACA EL USER CONTACTS DESDE CONTROLLERS")
    if (!userContacts) throw new MoleculerError("Contacts not found", 404, "SERVICE_NOT_FOUND");
    return {
      message: 'success',
      content: userContacts
    }
  } 
  catch(err) {
    console.log('ESTE ES EL ERROR DE GET CONTACTS')
    console.log(err);
    throw new MoleculerError("user not found", 404, "SERVICE_NOT_FOUND");
  }
}

const addContact = async (ctx) => {
  const { userId, alias, contactPhone } = ctx.params // Necesito userPhone y contactPhone del front
  try{
    const user = await User.findOne({where: {id: userId}});
    const contact = await User.findOne({where: {phone: contactPhone}});
    
    if (!user) throw new MoleculerError("user not found", 404, "SERVICE_NOT_FOUND");
    if (contact) {await user.addContacts(contact, {through: {alias: alias, phone: contact.phone}});
    const userContact = await Contact.findOne({where: {userId: user.id, phone: contact.phone}});
    return {
      message: 'success',
      content: userContact
    }}

   // await user.addContacts(contact, {through: {alias: alias, phone: contact.phone}});
  //   const userContact = await Contact.findOne({where: {userId: user.id, phone: contact.phone}});
  //   return {
  //     message: 'success',
  //     content: userContact
  //   }
  } 
  catch(err) {
    console.log(err, '');
    throw new MoleculerError("user not found", 404, "SERVICE_NOT_FOUND");
  }
}

const editContact = async (ctx) => {
  const { userId, contactPhone, alias } = ctx.params // Necesito userPhone y contactPhone del front
  try{
    const userContact = await Contact.findOne({where: {userId: userId, phone: contactPhone}});
    if (!userContact) throw new MoleculerError("Contact not found", 404, "SERVICE_NOT_FOUND");

    userContact.alias = alias;
    userContact.save()
    return {
      message: 'success',
      content: userContact
    }
  } 
  catch(err) {
    console.log(err);
    throw new MoleculerError("user not found", 404, "SERVICE_NOT_FOUND");
  }
}

const addToFavorite = async (ctx) => {
  const { userId, contactPhone } = ctx.params // Necesito userPhone y contactPhone del front
  try{
    const userContact = await Contact.findOne({where: {userId: userId, phone: contactPhone}});
    if (!userContact) throw new MoleculerError("Contact not found", 404, "SERVICE_NOT_FOUND");
    userContact.status = 'favorite';
    userContact.save()
    return {
      message: 'success',
      content: userContact
    }
  } 
  catch(err) {
    console.log(err);
    throw new MoleculerError("user not found", 404, "SERVICE_NOT_FOUND");
  }
}

const removeFavorite = async (ctx) => {
  const { userId, contactPhone } = ctx.params // Necesito userPhone y contactPhone del front
  try{
    const userContact = await Contact.findOne({where: {userId: userId, phone: contactPhone}});
    if (!userContact) throw new MoleculerError("Contact not found", 404, "SERVICE_NOT_FOUND");
    userContact.status = 'contact';
    userContact.save()
    return {
      message: 'success',
      content: userContact
    }
  } 
  catch(err) {
    console.log(err);
    throw new MoleculerError("user not found", 404, "SERVICE_NOT_FOUND");
  }
}

const blockContact = async (ctx) => {
  const { userId, contactPhone } = ctx.params // Necesito userPhone y contactPhone del front
  try{
    const userContact = await Contact.findOne({where: {userId: userId, phone: contactPhone}});
    if (!userContact) throw new MoleculerError("Contact not found", 404, "SERVICE_NOT_FOUND");
    userContact.status = 'blocked';
    userContact.save()
    return {
      message: 'success',
      content: userContact
    }
  } 
  catch(err) {
    console.log(err);
    throw new MoleculerError("user not found", 404, "SERVICE_NOT_FOUND");
  }
}

const searchContacts = async (ctx) => {
  const { query, userId } = ctx.params // Necesito userPhone y contactPhone delNP 
  console.log('ESTA ES LA QUERY:',query);
  let queryContacts;
  try{
    if (query === '') queryContacts = await Contact.findAll({where: { userId: userId }});
    else queryContacts = await Contact.findAll(
          {
            where: 
              { 
                userId: userId, 
                [Op.or]: 
                  [
                    { alias: { [Op.iLike]: `%${query}%` } },
                    { phone: { [Op.iLike]: `%${query}%` } },
                  ] 
              }
          }
        )

    if (!queryContacts) throw new MoleculerError("Contact not found", 404, "SERVICE_NOT_FOUND");
    return {
      message: 'success',
      content: queryContacts
    }
  } 
  catch(err) {
    console.log(err);
    throw new MoleculerError("user not found", 404, "SERVICE_NOT_FOUND");
  }
}

module.exports = {
    createUser, 
    getMyData, 
    editData,
    editUser,
    getContacts,
    addContact,
    editContact,
    addToFavorite,
    removeFavorite,
    blockContact,
    searchContacts
}