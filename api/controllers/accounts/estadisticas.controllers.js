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
        

        //ordenar datos para mostrarlos por semana
        var week = {};
        var oneWeek = 604800000  // una semana en milisegundos
        week[0] = Date.now()
        // week[0] = new Date(Date.now()).toString();  // para verlo en fecha
        gastosFraccionados.gastosSemanales[0] = {totalSemana: 0, gastosSemana: []}
        for(var i = 1; i < 13; i++) {
            week[i] = Date.now() - oneWeek
            // week[i] = new Date(Date.now() - oneWeek).toString() //para verlo en fecha
            gastosFraccionados.gastosSemanales[i] = {totalSemana: 0, gastosSemana: []}
            oneWeek = oneWeek + 604800000
        }
        console.log(gastosFraccionados)
        
        for(var i = 0; i < account.movements.length; i++) {
            for(var j = 0; j < 13; j++) {
                if( Date.parse(account.movements[i].createdAt.toString()) > week[j + 1]  &&  Date.parse(account.movements[i].createdAt.toString()) < week[j]) {
                    gastosFraccionados.gastosSemanales[j].gastosSemana.push(account.movements[i])
                    gastosFraccionados.gastosSemanales[j].totalSemana = gastosFraccionados.gastosSemanales[j].totalSemana - account.movements[i].amount
                }
            }
        }


        //ordenar datos para mostrarlos por dia
        var fecha;
        var montoFecha = account.movements[0].amount;
        var ids = []
        for(var i = 0; i < account.movements.length; i++) {
            // console.log('hi')
            
            // console.log(fecha, montoFecha)
            if(account.movements[i].createdAt.toString().substring(0,15) === fecha) {
                montoFecha = montoFecha + account.movements[i].amount
                ids.push(account.movements[i])
            } else {
                montoFecha = account.movements[i].amount;
                ids = []
                ids.push(account.movements[i])
            }
            // console.log(account.movements[i].createdAt.toString())
            fecha = account.movements[i].createdAt.toString().substring(0,15)
            gastosFraccionados.gastosDiarios[fecha] =  {$totalDelDia: -montoFecha, gastosDeldia: ids}

        }

        //ordenar gastos para mostrarlos por mes  
        var fecha;
        var montoFecha = account.movements[0].amount;
        var ids = []
        for(var i = 0; i < account.movements.length; i++) {
            console.log('hi')
            console.log(account.movements[i].createdAt.toString().substring(4,7) + ' ' + account.movements[i].createdAt.toString().substring(11,15))
            console.log(fecha, montoFecha)
            if(account.movements[i].createdAt.toString().substring(4,7) + ' ' + account.movements[i].createdAt.toString().substring(11,15) == fecha) {
                console.log('JEJE')
                montoFecha = montoFecha + account.movements[i].amount
                ids.push(account.movements[i])  
                // console.log(ids)
            } else {
                montoFecha = account.movements[i].amount;
                ids = []
                ids.push(account.movements[i])
            }
            fecha = account.movements[i].createdAt.toString().substring(4,7) + ' ' + account.movements[i].createdAt.toString().substring(11,15)
            gastosFraccionados.gastosMensuales[fecha] =  {$totalDelMes: -montoFecha, gastosDelMes: ids}

        }


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