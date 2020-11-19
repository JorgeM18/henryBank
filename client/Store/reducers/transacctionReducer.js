import {RECHARGE_PAYPAL} from '../actions/transactions'

const initialState={
    paypal:'',
    qr:'',
    creditCard:''
}

export default (state= initialState, actions)=>{
    switch(actions.type){
        case RECHARGE_PAYPAL:
            return{
                ...state,
                paypal: actions.payment

            }
        default:
            return state

    }
}