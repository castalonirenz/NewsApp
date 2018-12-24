import { SET_NEWS_DATA, SEARCH_NEWS } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "../actions/activityIndicator";
const axios = require('axios')
const apiKey = "24c2d48322ea42e983a590fe991f035b"
let searchData = ""
export const searchNews = (searchInput) => {
    console.log("getting news")
    searchData = searchInput
    return dispatch => {
        dispatch(uiStartLoading());
        if (searchData !== "") {
            axios.get('https://newsapi.org/v2/everything?q=' + searchData + '&pageSize=100&apiKey=' + apiKey)
                .then(response => {
                    console.log(response, "First Response")
                    let newsData = []
                    newsData = response.data.articles
                    console.log(newsData, "Searched Data");
                    dispatch(setNews(newsData))
                    dispatch(uiStopLoading());
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                    dispatch(uiStopLoading());
                });
        }
      else{
          alert('Unable to find this article')
      }
    }

}

export const getNews = () => {
    console.log("getting news")
    return dispatch => {
        dispatch(uiStartLoading());
        axios.get('https://newsapi.org/v2/top-headlines?country=ph&pageSize=100&apiKey=' + apiKey)
            .then(response => {
                console.log(response, "First Response")
                let newsData = []
                newsData = response.data.articles
                console.log(newsData, "TANGINA NYONG LAHAT");
                dispatch(setNews(newsData))
                dispatch(uiStopLoading());
            })
            .catch(function (error) {
                console.log(error);
                alert(error)
                dispatch(uiStopLoading());
            });
    }

}

export const setNews = newsData => {
    return {
        type: SET_NEWS_DATA,
        newsData: newsData
    };
};