import { ADD_USER, LOGIN_SUCCESS, LOGIN_FAIL} from '../actions/user'
import { POST_CONTACTS } from '../actions/contact'
import { GET_CONTACTS } from '../actions/contact'
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
         case GET_CONTACTS:
            return {
                ...state,
                contacts: action.contacts
            } 
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

        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.user.token,
                user: action.user.data,
                isAuthenticated: true,
            }
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
            return {
                ...state,
                isAuthenticated: false,
            }
        case 'LOGOUT_SUCCESS':
            // AsyncStorage.clear();
             return{
                 ...state,
                 token: null,
                 isAuthenticated: false,
                 user: null,
             }
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
        case 'GET_DATA_USER':
            return{
                ...state,
                user:action.user
            }
        case 'NEW_DATA': 
            return {
                ...state,
                //nose para q cambiar el estado no le veo la utilidad
            }
        default:
            return state


    }

};