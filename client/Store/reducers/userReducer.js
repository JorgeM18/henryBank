import {ADD_USER} from '../actions/user'

const initialState={
    user:[]
}

export default (state=initialState, action)=>{
    switch(action.type){
        case ADD_USER:
            return{
                user:state.user.concat(action.user)
            }
        default:
            return state


    }
    
};