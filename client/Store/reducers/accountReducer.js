import { GET_BALANCE, GET_ACCOUNT, RESET_ACCOUNT } from '../actions/account'

const initialState = {
    balance: '',
    account: ''
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
        case RESET_ACCOUNT:
            return {
                ...state,
                account: '',
                balance:''
            }
        default:
            return state

    }
}