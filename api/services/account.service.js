"use strict";

const { account, getAccount } = require('../controllers/accounts/accounts.controllers')
const { balanceAndImage } = require('../controllers/accounts/miPosicion.controllers')
const { estadisticaGastos } = require('../controllers/accounts/estadisticas.controllers')
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "account",

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
		getAccount:{
			rest:{ 
                method:"GET",
                path:"/" 
			},
			handler:getAccount
		},
        newAccount:{
            rest:{ 
                method:"POST",
                path:"/new" 
            },
            handler:account
		},
		balance: {
			rest: {
				method: 'GET',
				path: '/mybalance'
			},
			handler: balanceAndImage
		},
		estadisticaGastos: {
			rest: {
				method: 'GET',
				path: '/estadisticaGastos'
			},
			handler: estadisticaGastos
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
