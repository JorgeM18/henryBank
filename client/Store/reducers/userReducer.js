import {ADD_USER} from '../actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage'


const initialState={
    token: null,
    isAuthenticated: false,
    user:null
}

export default (state=initialState, action)=>{
    switch(action.type){
        case ADD_USER:
            return{
                // user:state.user.concat(action.user)
                user:action.user
            }

        case 'LOGIN_SUCCESS':
            AsyncStorage.setItem('token', JSON.stringify(action.payload.token), err => {
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
            case 'LOGOUT_SUCCESS':
            case 'AUTH_ERROR':
                AsyncStorage.removeItem("token");
                  return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    user: null,
                  };
        default:
            return state


    }
    
};