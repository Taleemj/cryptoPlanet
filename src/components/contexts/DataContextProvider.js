import { createContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCyptos = (endpoint) => {
    setLoading(true);
    const options = {
      method: "GET",
      url: `https://coinranking1.p.rapidapi.com${endpoint}`,
      headers: {
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        "X-RapidAPI-Key": "3ad125af40msha3fe0c6e8a0b18ep15f567jsn1747f4551c09",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setResults(response);
        // console.log(results);
      })
      .catch(function (error) {
        console.error(error);
      });

    setLoading(false);
  };

  const getNews = (number, category) => {
    const options = {
      method: "GET",
      url: `https://bing-news-search1.p.rapidapi.com/news/search`,
      params: {
        q: category,
        freshness: "Day",
        count: number,
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        "X-RapidAPI-Key": "3ad125af40msha3fe0c6e8a0b18ep15f567jsn1747f4551c09",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setNews(response.data);
        // console.log(news);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <DataContext.Provider
      value={{ getCyptos, results, loading, setResults, getNews, news }}
    >
      {children}
    </DataContext.Provider>
  );
};
