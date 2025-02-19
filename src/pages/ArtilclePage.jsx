import { Divider } from '@/components/catalyst-ui-kit/divider';
import ArticleDetailedCard from '../components/ArticleDetailedCard';
import { useParams } from 'react-router-dom';
import CommentsListByArticle from '../components/CommentsListByArticle';
import Loading from '../components/Loading';
import { fetchArticle, fetchCommentsByArticle } from '../services/api';
import { useEffect, useState } from 'react';

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  useEffect(() => {
    const fetchedArticle = fetchArticle(article_id);
    const fetchedCommentsByArticle = fetchCommentsByArticle(article_id);
    Promise.all([fetchedArticle, fetchedCommentsByArticle]).then((values) => {
      setArticle(values[0]);
      setComments(values[1]);
    });
  }, [article_id]);

  if (!article || !comments) {
    return <Loading />;
  }

  return (
    <>
      <ArticleDetailedCard article={article} />
      <Divider className='mt-10' />
      <CommentsListByArticle comments={comments} />
    </>
  );
}
