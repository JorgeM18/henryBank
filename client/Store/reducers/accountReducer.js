import { GET_BALANCE, GET_ACCOUNT, RESET_ACCOUNT,OUTCOME_MOVEMENT } from '../actions/account'


const initialState = {
    balance: '',
    account: '',
    movements:''
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_BALANCE:
            return {
                ...state,
                balance: actions.balance
            }
        case GET_ACCOUNT:
            return {
                ...state,
                account: actions.account
            }
        case OUTCOME_MOVEMENT:
            return {
                ...state,
                movements: actions.outcomeMov
            }
        case RESET_ACCOUNT:
            return {
                ...state,
                account: '',
                balance: '',
                movements:''
            }
        default:
            return state

    }
}