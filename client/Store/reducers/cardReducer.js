
const initialState = {
    card: {},
    cards: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CARD':
            console.log('store', action.card)
            return {
                // ...state,
                cards: [...state.cards, action.card]
            }
        case 'ALL_CARDS':
            console.log('state', action.cards)
            return {
                ...state,
                cards: action.cards
            }
        case 'DELETE_CARD':
            return {
                ...state,
                cards: state.cards.filter((e,i) => i !== action.card)
            }
            
        case 'GET_ALL_CARDS':
            // console.log('get all', state.cards)
            return {
                ...state,
                cards:action.cards
            }
        default:
            return state


    }

};