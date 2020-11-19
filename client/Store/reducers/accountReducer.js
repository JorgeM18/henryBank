import {GET_BALANCE} from '../actions/account'

const initialState={
    balance:''
}

export default (state= initialState, actions)=>{
    switch(actions.type){
        case GET_BALANCE:
            return{
                ...state,
                balance: actions.balance

            }
        default:
            return state

    }
}