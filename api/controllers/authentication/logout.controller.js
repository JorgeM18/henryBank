const {Blacklist} = require('../../db.js');
const { MoleculerError } = require("moleculer").Errors;

module.exports= async (ctx)=>{
    try{
        const data = await Blacklist.update({isactive:false}, {where:{token:ctx.params.token} })
        return data
    }catch(err){

    }
}