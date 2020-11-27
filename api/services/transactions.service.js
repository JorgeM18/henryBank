"use strict";



const { incomeOutcome } = require('../controllers/accounts/miPosicion.controllers');

const { cashDeposit, cashExtraction, purchase } = require('../controllers/accounts/cash.controllers');

const { mercadoPago, mercadoPagoConfirm, mercadoPagoFailure } = require('../controllers/accounts/mercadopago.controllers');
const {transaction, paypalDeposits, confirmPaypal, getTransaction, creditCard} = require('../controllers/accounts/movement.controllers')


/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "transactions",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
        sendAmount:{
            rest:{ 
                method:"POST",
                path:"/send" 
            },
            // params:{
            //     phoneContact:"number",
            //     phoneUser:"number",
            //     amount:"number",
            // },
            handler:transaction
		},
  	paypal:{
			rest:{ 
                method:"GET",
                path:"/paypal" 
			},
			handler:paypalDeposits
		},
		paypalConfirm:{
			rest:{ 
                method:"GET",
                path:"/paypal/confirm" 
			},
			handler:confirmPaypal
		},
		///Aqui es simpleme de prueba para que tiren un mensaje si fue rechazado el deposito con paypal
		cancelPaypal:{
			rest:{ 
                method:"GET",
                path:"/paypal/cancel" 
			},
			async handler(ctx){
				return "Su Deposito no se pudo realizar vuelva a intentarlo"
			}
		},
		//------------------------------------------------------------------------------------------
		incomeOutcome: {  // esta ruta deberia estar en el servicio de accounts. nose porque la puse aca
			rest: {
				method: 'GET',
				path: '/incomeOutcome'
			},
			handler: incomeOutcome
		},
		cashDeposit: {
			rest: {
				method: 'POST',
				path: '/cash'
			},
			handler: cashDeposit
		},
		cashExtraction: {
			rest: {
				method: 'POST',
				path: '/cashextraction'
			},
			handler: cashExtraction
		},
		mercadoPago: {
			rest: {
				method: 'POST',
				path: '/mercadopago'
			},
			handler: mercadoPago
		},
		mercadoPagoConfirm: {
			rest: {
				method: 'GET',
				path: '/mercadopagoconfirm'
			},
			handler: mercadoPagoConfirm 
		},
		mercadoPagoFailure: {
			rest: {
				method: 'GET',
				path: '/failure'
			},
			handler: mercadoPagoFailure
		},
		getTransaction:{
			rest:{
				method:"GET",
				path:":id"
			},
			handler: getTransaction
		},
		purchase:{
			rest:{
				method:"POST",
				path:"/purchase"
			},
			handler: purchase
		},
		card: {
			rest: {
				method: "POST",
				path: "/creditCard"
			},
			handler: creditCard
		}

    },

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created(){

    },

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
