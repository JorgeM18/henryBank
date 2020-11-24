import {RECHARGE_PAYPAL, RECHARGE_MERCADO, INCOME_OUTCOME, RESET_TRANSACTIONS, GET_TRANSACTIONS} from '../actions/transactions'

const initialState={
    paypal:'',
    qr:'',
    creditCard:'',
    mercado: '',
    income_outcome: '',
    transactions: [],
    transaction: {}
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case RECHARGE_PAYPAL:
            return {
                ...state,
                paypal: actions.payment

            }
        case GET_TRANSACTIONS:
            return{
                ...state,
                transactions: actions.transaction
            }
        case RECHARGE_MERCADO:
            return {
                ...state,
                mercado: actions.payment

            }
        case INCOME_OUTCOME:
            return {
                ...state,
                income_outcome: actions.data
            }
        case RESET_TRANSACTIONS:
            return {
                ...state,
                paypal: '',
                qr: '',
                creditCard: '',
                mercado: '',
                income_outcome: ''
            }
        default:
            return state

    }
}