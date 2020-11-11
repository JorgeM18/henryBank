import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer'

const rootReducer=combineReducers({
    user:userReducer
})
const initialState = {};

const middleWare  = [thunk];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(...middleWare)),
    
);

export default store;


// SIN REDUX DEV TOOLS SI ROMPE BORRAR LO DE ARRIBA


// import {applyMiddleware, combineReducers, createStore} from 'redux';
// import thunk from 'redux-thunk';
// import userReducer from './reducers/userReducer'

// const rootReducer=combineReducers({
//     user:userReducer
// })


// const store=createStore(
//     rootReducer,
//     applyMiddleware(thunk)
    
// );

// export default store;