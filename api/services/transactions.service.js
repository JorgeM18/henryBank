"use strict";

const { incomeOutcome } = require('../controllers/accounts/miPosicion.controllers');
const {transaction} = require('../controllers/accounts/movement.controllers')

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
            params:{
                phoneContact:"number",
                phoneUser:"number",
                amount:"number",
            },
            handler:transaction
		},
		incomeOutcome: {
			rest: {
				method: 'GET',
				path: '/incomeOutcome'
			},
			handler: incomeOutcome
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
