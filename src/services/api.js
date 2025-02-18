import axios from 'axios';

const baseURL = 'https://be-nc-news-m90v.onrender.com/api';

const ncNewsAPI = axios.create({
  baseURL,
});

// Fetch all categories
export const fetchArticles = (params = {}) => {
  return ncNewsAPI.get('/articles', params).then((response) => {
    return response.data.articles;
  });
};
