import axios from 'axios';

const baseURL = 'https://be-nc-news-m90v.onrender.com/api';

const ncNewsAPI = axios.create({
  baseURL,
});

// Fetch all articles
export const fetchArticles = (params = {}) => {
  return ncNewsAPI.get('/articles', params).then((response) => {
    return response.data.articles;
  });
};

// Fetch specific article
export const fetchArticle = (article_id) => {
  return ncNewsAPI.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};
