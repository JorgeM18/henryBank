import { ADD_USER, LOGIN_SUCCESS, LOGIN_FAIL} from '../actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage'


const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    pin: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                // user:state.user.concat(action.user)
                // user:action.user
                ...state
            }

        case LOGIN_SUCCESS:
            // AsyncStorage.setItem('token', JSON.stringify(action.user.token), err => {
            //     if (err) console.log('ERROR en AsyncStorage', err);
            // })
            // AsyncStorage.setItem('usuario', JSON.stringify(action.user.data), err => {
            //     if (err) console.log('ERROR en AsyncStorage', err);
            // })
            // AsyncStorage.getItem('token').then(res => console.log('token-----', res))
            // console.log('reducer',action.user)
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
        case 'GET_DATA_USER':
            return{
                ...state,
                user:action.user
            }
        default:
            return state


    }

};