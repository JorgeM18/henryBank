import {RECHARGE_PAYPAL, GET_TRANSACTIONS, GET_TRANSACTIONS_NUM} from '../actions/transactions'

const initialState={
    paypal:'',
    qr:'',
    creditCard:'',
    transactions: [],
    transaction: {}
}

export default (state= initialState, actions)=>{
    switch(actions.type){
        case RECHARGE_PAYPAL:
            return{
                ...state,
                paypal: actions.payment

            }
        case GET_TRANSACTIONS:
            console.log('logggg', actions.transaction)
            return{
                ...state,
                transactions: actions.transaction
            }
        case GET_TRANSACTIONS_NUM:

            return {
                ...state,
                transaction: actions.transaction
            }
        default:
            return state

    }
}