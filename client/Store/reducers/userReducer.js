import { ADD_USER } from '../actions/user'
import { POST_CONTACTS } from '../actions/contact'
import AsyncStorage from '@react-native-async-storage/async-storage'


const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    pin: false,
    contacts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_CONTACTS:
            console.log("REDUCER DE CONTACTS", action.contact)
            return {
                ...state,
                contacts: [...state.contacts, action.contact]
            }
        case ADD_USER:
            return {
                // user:state.user.concat(action.user)
                // user:action.user
                ...state
            }

        case 'LOGIN_SUCCESS':
            AsyncStorage.setItem('token', JSON.stringify(action.payload.token), err => {
                if (err) console.log('ERROR en AsyncStorage', err);
            })
            AsyncStorage.setItem('usuario', JSON.stringify(action.payload.data), err => {
                if (err) console.log('ERROR en AsyncStorage', err);
            })
            AsyncStorage.getItem('token').then(res => console.log('token-----', res))
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.data,
                isAuthenticated: true,
            }
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
            return {
                ...state,
                isAuthenticated: false,
            }
        case 'LOGOUT_SUCCESS':
            AsyncStorage.clear();
        case 'AUTH_ERROR':
            AsyncStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
            };
        case 'VALID_PIN':
            return {
                ...state,
                pin: action.pin
            }
        case 'EDIT_USER':
            return {
                ...state,
               user:action.user
            }
        case 'GET_USER':
            return {user:action.user};
        default:
            return state


    }

};