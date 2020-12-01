"use strict";
// IMPORTS

// ACTIONS
const { createUser, getMyData, editData, editUser, getContacts, addContact, editContact, addToFavorite, blockContact, searchContacts } = require('../controllers/users/users.controllers');
const { forgotPassword, validatePasswordPin, updatePassword } = require('../controllers/users/resetPassword.controllers');
const { approveUser, validateUserPin } = require('../controllers/users/approveUser.controllers');
const login = require('../controllers/authentication/login.controllers');
const logout = require('../controllers/authentication/logout.controller');
const { addCard, getCards } = require('../controllers/cards/cards.controllers');
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "user", // <--  http://localhost:3000/api/user

	//////////////// SETTINGS ////////////////
	settings: {},

	//////////////// DEPENDENCIES ////////////////
	dependencies: [],

	//////////////// ACTIONS ////////////////
    actions: { // <-- http://localhost:3000/api/user/${ruta_action}

		// LOGIN/LOGOUT
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

		// USER
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
		editUser:{
			rest: {
				method: 'PUT',
				path: '/editUser'
			},
			handler: editUser
		},

		// DATA
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
				path:'/cuentaGo'
			},
			handler: editData
		},
		
		// PIN VALIDATIONS
		validateUserPin: {
			rest: {
				method: 'POST',
				path: '/validateUserPin'
			},
			handler: validateUserPin
		},
		 approveUser:{
            rest:{ 
                method:"PUT",
                path:"/approveUser" 
            },
            // params:{
            //     // name:"string",
            //     lastname:"string",
            //     // pin:"number",
            //     phone:"number",
            //     birth:"string",
            //     // image:"string",
            // },
            handler: approveUser
		},
		
		// PASSWORD
		forgotPassword: {
			rest: {
				method: 'POST',
				path: '/forgotPassword'
			},
			handler: forgotPassword
		}, 
		validatePasswordPin: {
			rest: {
				method: 'POST',
				path: '/validatePasswordPin'
			},
			handler: validatePasswordPin
		}, 
		updatePassword: {
			rest: {
				method: 'PUT',
				path: '/updatePassword'
			},
			handler: updatePassword
		},

		//CONTACTS
		getContacts: {
			rest: {
				method: 'GET',
				path: '/contacts/:userId'
			},
			handler: getContacts
		},
		addContact: {
			rest: {
				method: 'POST',
				path: '/addContact'
			},
			handler: addContact
		},
		editContact: {
			rest: {
				method: 'PUT',
				path: '/editContact'
			},
			handler: editContact
		},
		addTofavorite: {
			rest: {
				method: 'PUT',
				path: '/addToFavorite'
			},
			handler: addToFavorite
		},
		removefavorite: {
			rest: {
				method: 'PUT',
				path: '/removeFavorite'
			},
			handler: addToFavorite
		},
		blockContact: {
			rest: {
				method: 'PUT',
				path: '/blockContact'
			},
			handler: blockContact
		},
		searchContacts: {
			rest: {
				method: 'GET',
				path: '/searchContacts/'
			},
			handler: searchContacts
		},

		//CARDS
		addCard: {
			rest: {
				method: 'POST',
				path: '/:userId/addCard'
			},
			handler: addCard
		},
		getCards: {
			rest: {
				method: 'GET',
				path: '/:userId/getCards'
			},
			handler: getCards
		}
    },

	//////////////// EVENTS ////////////////
	events: {},

	//////////////// METHODS ////////////////

	methods: {},

	//////////////// LIFECYCLES ////////////////

	created() {},
	async started() {},
	async stopped() {}
};
