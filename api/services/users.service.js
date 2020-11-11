"use strict";

//const getCard = require('../controllers/getCard') // Se trae el controller (lo que va a hacer la accion cuando se ejecute) desde la carpeta "controllers" 
//const addCard = require('../controllers/addCard')
const { createUser, getMyData, editData } = require('../controllers/users/users.controllers');
const { forgotPassword, resetPassword, updatePassword } = require('../controllers/users/resetPassword.controllers');
const approveUser = require('../controllers/users/approveUser.controllers');
// const createUser = require('../controllers/users/users.controllers')
const login = require('../controllers/authentication/login.controllers');
const logout = require('../controllers/authentication/logout.controller');
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "user", // <-- seria el nombre de la ruta quiere decir que aqui seria http://localhost:3000/api/user

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
    actions: { // Aqui van las acciones que tendria la ruta "api/user" 

		login:{
			rest:{ 
					method:"POST",
					path:"/login" 
				},
			params:{

					password:"string",
					email:"email",
				},
			handler:login	
		},
		logout:{
			rest:{
				method:"POST",
				path:"/logout"
			},
			params:{
				token:"string"
			},
			handler:logout
		},

        createUser:{
            rest:{ 
                method:"POST",
                path:"/createUser" 
			},
			//TEMPORALMENTE INHABILITADOS
            // params:{
            //     email:"email",
            //     password: "string",
            // },
            handler: createUser
		},

		getMyData: {
			rest: {
				method: 'GET', 
				path:'/:id'
			},
			handler: getMyData
		},

		editData: {
			rest: {
				method: 'PUT',
				path:'/:id'
			},
			handler: editData
		},
		
		 approveUser:{
            rest:{ 
                method:"PUT",
                path:"/approveUser" 
            },
            params:{
                name:"string",
                lastname:"string",
                pin:"string",
                phone:"string",
                birth:"string",
                image:"string",
            },
            async handler(ctx){ 
                 return `dando de alta a ${ctx.params.name}`
            },
            handler: approveUser
		},
		
		forgotPassword: {
			rest: {
				method: 'POST',
				path: '/forgotPassword'
			},
			handler: forgotPassword
		}, 

		resetPassword: {
			rest: {
				method: 'GET',
				path: '/resetPassword'
			},
			handler: resetPassword
		}, 

		updatePassword: {
			rest: {
				method: 'PUT',
				path: '/updaterPassword'
			},
			handler: updatePassword
	
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
	created() {

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
