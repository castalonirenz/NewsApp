import {  GET_NEWS_DATA, SET_NEWS_DATA } from "./actionTypes";
const axios = require('axios')
const apiKey = "24c2d48322ea42e983a590fe991f035b"
export const getNews = () => {
    console.log("getting news")
    return dispatch =>{
        axios.get('https://newsapi.org/v2/top-headlines?country=ph&pageSize=100&apiKey=' + apiKey)
        .then(response =>{
        console.log(response, "First Response")
        let newsData = []
        newsData = response.data.articles
        
        
        // for (let key in data) {
        //     newsData.push({
        //       ...response[key],
        //       key: key
        //     });
        //   }

          console.log(newsData, "naka array na");
         dispatch(setNews(newsData))
        })
        .catch(function (error) {
          console.log(error);
        });
    }

}

export const setNews = newsData => {
    return {    
        type: SET_NEWS_DATA,
        newsData: newsData
    };
  };