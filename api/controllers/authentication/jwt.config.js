require("dotenv").config();
const jwt = require('jsonwebtoken');
const { Errors } = require('moleculer-web');
const { MoleculerError } = require("moleculer").Errors;
const { PRIVATE_KEY} = process.env;

async function authenticate (ctx, route, req){
    
    if(req.$action.name === "user.login"){
        return null
    }

    const auth = req.headers.authorization;
    
    if(!auth){
        
        throw new MoleculerError("header is required", 422, "AUTHENTICATION_FAILED", {nodeID: ctx.codeId, action:req.$action.name})
    }

    if(auth.startsWith("Bearer")){
        const token = auth.split(' ')[1];
        let data = {token};
        await jwt.verify(token, PRIVATE_KEY, async (err, decoded)=>{
            if(err){
                throw new Errors.UnAuthorizedError(Errors.ERR_INVALID_TOKEN);
            }
            
            data.id = decoded.id;
        })
        return data;
    }

    throw new Errors.UnAuthorizedError(Errors.ERR_INVALID_TOKEN);
}

module.exports = authenticate;