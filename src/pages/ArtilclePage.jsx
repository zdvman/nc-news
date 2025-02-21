import { Divider } from '@/components/catalyst-ui-kit/divider';
import ArticleDetailedCard from '../components/ArticleDetailedCard';
import { useParams } from 'react-router-dom';
import CommentsListByArticle from '../components/CommentsListByArticle';
import Loading from '../components/Loading';
import { getArticle, getCommentsByArticle } from '../services/api';
import { useContext, useEffect, useState } from 'react';
import AlertPopup from '../components/AlertPopup';
import UserAccount from '../context/UserAccount';
import { handleErrorOkButton } from '../utils/utils';

export default function ArticlePage() {
  const params = useParams();
  const {
    error,
    setError,
    loading,
    setLoading,
    isErrorPopupOpen,
    setIsErrorPopupOpen,
    navigate,
  } = useContext(UserAccount);
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);

  const { article_id } = params;

  useEffect(() => {
    setLoading(true);
    setError(null);
    setIsErrorPopupOpen(false);
    const fetchedArticle = getArticle(article_id);
    const fetchedCommentsByArticle = getCommentsByArticle(article_id);
    Promise.all([fetchedArticle, fetchedCommentsByArticle])
      .then((values) => {
        setLoading(false);
        setArticle(values[0]);
        setComments(values[1]);
      })
      .catch((err) => {
        setLoading(false);
        setError(
          'Status: ' +
            err.response.status +
            ' Message: "' +
            err.response.data.msg +
            '"' +
            `${
              err.response.data.error &&
              ' Extra error info: ' + err.response.data.error
            }` || 'An unexpected error occurred in get articles'
        );
        setIsErrorPopupOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_id]);

  if (error) {
    return (
      <AlertPopup
        isOpen={isErrorPopupOpen}
        setIsOpen={setIsErrorPopupOpen}
        title='Error'
        description={error}
        confirmText='OK'
        onConfirm={() =>
          handleErrorOkButton(setError, setIsErrorPopupOpen, navigate)
        }
      />
    );
  }

  if (!article || !comments) {
    return <Loading />;
  }

  if (loading || !article_id) {
    return <Loading />;
  }

  return (
    <>
      <ArticleDetailedCard article={article} />
      <Divider className='mt-10' />
      <CommentsListByArticle
        comments={comments}
        setComments={setComments}
        article_id={article_id}
      />
    </>
  );
}
