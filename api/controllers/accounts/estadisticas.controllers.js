const { MoleculerError } = require("moleculer").Errors;
const { Errors } = require('moleculer-web');
const { use } = require("passport");
const { Sequelize, Model } = require("sequelize");
const {User, Account, Movement} = require('../../db.js');
const Op = Sequelize.Op;


const estadisticaGastos = async (ctx) => {
    const { id, days } = ctx.params
    var ms = days*86400000;  // dias a milisegundos
    var period = Date.now() - ms
    try {
        const account = await Account.findOne({  // nose si recibo el userId o el account id. depende de si al final el user puede tener mas de una cuenta o una sola
            where: {
                userId: id
            },
            include: {
                model: Movement,
                where: {
                    createdAt: {
                        [Op.gt]: period,  // que la fecha de la transaccion sea mayor al date.now - periodo de dias
                      },
                      [Op.or]: [
                             {
                              movement_type: 'sender'
                          }, {
                              movement_type: 'extraction'
                          }, {
                              movement_type: 'purchase'
                          }
                      ] 
                }
            }
        })

       
        var gastoTotal = 0;
        for(var i = 0; i < account.movements.length; i++){
            if(account.movements[i].movement_type==='sender' || account.movements[i].movement_type==='extraction' || account.movements[i].movement_type==='purchase') { 
                gastoTotal = gastoTotal - account.movements[i].amount
            }
        }
        var gastosFraccionados = {
            gastosDiarios: {},
            gastosSemanales: {},
            gastosMensuales: {}
        };


        //ordenar datos para mostrarlos por dia
        var fecha;
        var montoFecha = account.movements[0].amount;
        var ids = []
        for(var i = 0; i < account.movements.length; i++) {
            console.log('hi')
            
            console.log(fecha, montoFecha)
            if(account.movements[i].createdAt.toString().substring(0,15) === fecha) {
                montoFecha = montoFecha + account.movements[i].amount
                ids.push(account.movements[i])
            } else {
                montoFecha = account.movements[i].amount;
                ids = []
                ids.push(account.movements[i])
            }
            console.log(account.movements[i].createdAt.toString())
            fecha = account.movements[i].createdAt.toString().substring(0,15)
            gastosFraccionados.gastosDiarios[fecha] =  {$totalDelDia: -montoFecha, gastosDeldia: ids}

        }

        //ordenar gastos para mostrarlos por mes
        var fecha;
        var montoFecha = account.movements[0].amount;
        var ids = []
        for(var i = 0; i < account.movements.length; i++) {
            console.log('hi')
            
            console.log(fecha, montoFecha)
            if(account.movements[i].createdAt.toString().substring(4,7) + account.movements[i].createdAt.toString().substring(11,15) === fecha) {
                montoFecha = montoFecha + account.movements[i].amount
                ids.push(account.movements[i])
            } else {
                montoFecha = account.movements[i].amount;
                ids = []
                ids.push(account.movements[i])
            }
            fecha = account.movements[i].createdAt.toString().substring(4,7) + account.movements[i].createdAt.toString().substring(11,15)
            gastosFraccionados.gastosMensuales[fecha] =  {$totalDelMes: -montoFecha, gastosDelMes: ids}

        }

        //falta ordenar gastos para mostrarlos por semana


        const json = {
            message: 'success',
            content: {
                gastoTotalPeriodo: gastoTotal,
                gastosFraccionados: gastosFraccionados,
                todosLosGastos: account.movements
            },
        }
        if(account) {
            return json
        } else {
            throw new Error
        }
    } catch (err) {
        throw new MoleculerError("no hay gastos dentro de estas fechas", 404, "SERVICE_NOT_FOUND")
    }
}


module.exports = {
    estadisticaGastos
}