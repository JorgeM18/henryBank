require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const smsSend = async (number,body)=>{
    
    try{
        const data = await client.messages.create({
            from:'+12545894113',
            to:'+56932091929',
            body:'Carlos!! Bienvenido a *GO BANK* 🏦 realiza tu primer deposito y comienza disfrutar todos los beneficios que tenemos para vos 🙌 💳'
        })
        console.log(data.sid)
    }catch(err){
        console.log(err)
    }
}

const whatsappSend = async (number,body)=>{
    
    try{
        const data = await client.messages.create({
            from:'whatsapp:+14155238886',
            to:`whatsapp:${number}`,
            body:body
        })
        console.log(data.sid)
    }catch(err){
        console.log(err)
    }
}

module.exports={
    smsSend,
    whatsappSend
}

