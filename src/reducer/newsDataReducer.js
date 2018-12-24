import { SET_NEWS_DATA, SEARCH_NEWS } from "../actions/actionTypes";

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
        // case SEARCH_NEWS:
        // return{
        //     ...state,
        //     newsData: action.newsData
        // }
        default:
        return state;
    }
}

export default newsReducer