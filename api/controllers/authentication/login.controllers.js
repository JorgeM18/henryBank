require("dotenv").config();
const {User, Blacklist} = require('../../db.js');
const { MoleculerError } = require("moleculer").Errors;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Errors } = require('moleculer-web');
const { PRIVATE_KEY} = process.env;

module.exports = async (ctx)=>{
    const {email, password, pin} = ctx.params;

    try{
        const data = await User.findOne({where:{ email:email}})
        
        const pass = await bcrypt.compare(password, data.password)


        if(!pass){
            throw new Errors
        }

        const payload = {id: data.id}
        const token = await jwt.sign(payload, PRIVATE_KEY,{
          expiresIn:'1d'
        } )

        data.password = undefined;
        data.pin = undefined;
        await Blacklist.create({token})
        return { 
            message:"success", 
            data,
            token
        }
    }catch(err){
        throw new MoleculerError("Password is wrong", 401, "AUTHENTICATION_FAILED",)
        
    }

}