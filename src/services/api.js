import axios from 'axios';

const baseURL = 'https://be-nc-news-m90v.onrender.com/api';

const ncNewsAPI = axios.create({
  baseURL,
});

// Fetch all articles
export const getArticles = (params = {}) => {
  return ncNewsAPI.get('/articles', { params }).then((response) => {
    return response.data.articles;
  });
};

// Fetch specific article
export const getArticle = (article_id) => {
  return ncNewsAPI.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};

// Fetch comments associated with an article
export const getCommentsByArticle = (article_id) => {
  return ncNewsAPI.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.comments;
  });
};

// Update vote article
export const patchVotesOnArticle = (article_id, votes) => {
  return ncNewsAPI
    .patch(`/articles/${article_id}`, { inc_votes: votes })
    .then((response) => {
      return response.data.article;
    });
};

// Post new comment on article
export const postCommentOnArticle = (article_id, username, body) => {
  return ncNewsAPI
    .post(`/articles/${article_id}/comments`, { username, body })
    .then((response) => {
      return response.data.comment;
    });
};

// Delete comment on article by the author
export const deleteCommentOnArticle = (comment_id) => {
  console.log(comment_id);
  return ncNewsAPI.delete(`/comments/${comment_id}`);
};

// Fetch all topics
export const getTopics = (params = {}) => {
  return ncNewsAPI.get('/topics', params).then((response) => {
    return response.data.topics;
  });
};
