  
// import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
// import thunk from 'redux-thunk';
// import userReducer from './reducers/userReducer'

// const rootReducer=combineReducers({
//     user:userReducer
// })
// const initialState = {};

// const middleWare  = [thunk];

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store=createStore(
//     rootReducer,
//     initialState,
//     composeEnhancer(applyMiddleware(...middleWare)),
    
// );

// export default store;



// SIN REDUX DEV TOOLS SI ROMPE BORRAR LO DE ARRIBA


// import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
// import thunk from 'redux-thunk';
// // import { composeWithDevTools } from 'redux-devtools-extension';
// import {createLogger} from 'redux-logger';
// import userReducer from './reducers/userReducer'
// import accountReducer from './reducers/accountReducer'

// const rootReducer=combineReducers({
//     user:userReducer,
//     balance:accountReducer
// })

// // const logger=(store)=>(next)=>(action)=>{
// //     console.log(action)
// //     next(action)

// // }
// const logger = createLogger();

// const store=createStore(
//     rootReducer,
//     compose(applyMiddleware(thunk),
//         typeof window === 'object' &&
//             typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
//             window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
//     )
    
// );

// export default store;
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer'
import accountReducer from './reducers/accountReducer'
import transacctionReducer from './reducers/transacctionReducer'

const rootReducer=combineReducers({
    user:userReducer,
    balance:accountReducer,
    transaction:transacctionReducer
})


const store=createStore(
    rootReducer,
    applyMiddleware(thunk)
    
);

export default store;