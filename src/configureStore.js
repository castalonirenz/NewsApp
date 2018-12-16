import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import newsDataReducer from "./reducer/newsDataReducer";
import isLoading from './reducer/activityIndicator'
const combineReducer = combineReducers({
    getNews: newsDataReducer,
    activityIndicator: isLoading
})

let composeEnhancers = compose;

if(__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () =>{
    return createStore(combineReducer, composeEnhancers(applyMiddleware(thunk)));
}

export default configureStore