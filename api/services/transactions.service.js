"use strict";



const { incomeOutcome } = require('../controllers/accounts/miPosicion.controllers');
const { cash } = require('../controllers/accounts/cash.controllers');
const { mercadoPago, mercadoPagoConfirm, mercadoPagoFailure } = require('../controllers/accounts/mercadopago.controllers');
const {transaction, paypalDeposits, confirmPaypal} = require('../controllers/accounts/movement.controllers')


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
		incomeOutcome: {
			rest: {
				method: 'GET',
				path: '/incomeOutcome'
			},
			handler: incomeOutcome
		},
		cash: {
			rest: {
				method: 'POST',
				path: '/cash'
			},
			handler: cash
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
