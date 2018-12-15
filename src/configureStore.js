import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import newsDataReducer from "./reducer/newsDataReducer";

const combineReducer = combineReducers({
    getNews: newsDataReducer
})

let composeEnhancers = compose;

if(__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () =>{
    return createStore(combineReducer, composeEnhancers(applyMiddleware(thunk)));
}

export default configureStore