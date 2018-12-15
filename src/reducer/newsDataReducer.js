import { SET_NEWS_DATA, GET_NEWS_DATA } from "../actions/actionTypes";

const initialState = {
    newsData:[]
}

const newsReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_NEWS_DATA:
        return{
            ...state,
            newsData: action.newsData
        }
        default:
        return state;
    }
}

export default newsReducer