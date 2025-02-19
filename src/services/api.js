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

// Fetch comments associated with an article
export const fetchCommentsByArticle = (article_id) => {
  return ncNewsAPI.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.comments;
  });
};

// Update vote article
export const fetchVoteOnArticle = (article_id, votes) => {
  return ncNewsAPI
    .patch(`/articles/${article_id}`, { inc_votes: votes })
    .then((response) => {
      return response.data.article;
    });
};
