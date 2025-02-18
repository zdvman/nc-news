import { Divider } from '@/components/catalyst-ui-kit/divider';
import ArticleDetailedCard from '../components/ArticleDetailedCard';
import { useParams } from 'react-router-dom';
import CommentsListByArticle from '../components/CommentsListByArticle';

export default function ArticlePage() {
  const { article_id } = useParams();
  return (
    <>
      <ArticleDetailedCard article_id={article_id} />
      <Divider className='mt-10' />
      <CommentsListByArticle article_id={article_id} />
    </>
  );
}
