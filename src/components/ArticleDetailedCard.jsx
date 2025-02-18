// import { Button } from '@/components/catalyst-ui-kit/button';
import { NavLink } from 'react-router-dom';
import { fetchArticle } from '../services/api';
import { ChevronLeftIcon, StarIcon } from '@heroicons/react/16/solid';
import { Heading, Subheading } from '@/components/catalyst-ui-kit/heading';
import { Badge } from '@/components/catalyst-ui-kit/badge';
import { useEffect, useState } from 'react';
import { formatDate } from '../utils/utils';
import { Text } from '@/components/catalyst-ui-kit/text';
import Loading from '../components/Loading';

export default function ArticleDetailedCard({ article_id }) {
  const [article, setArticle] = useState(null);
  useEffect(() => {
    fetchArticle(article_id).then((fetchedArticle) => {
      setArticle(fetchedArticle);
    });
  }, [article_id]);

  if (!article) {
    return <Loading />;
  }

  return (
    <>
      <div className='max-lg:hidden'>
        <NavLink
          to='/'
          className='inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400'
        >
          <ChevronLeftIcon className='size-4 fill-zinc-400 dark:fill-zinc-500' />
          Articles
        </NavLink>
      </div>
      <Heading className='my-6'>Article</Heading>
      <div className='mt-4 flex flex-wrap items-end justify-between gap-4'>
        <div className='flex flex-wrap items-center gap-6'>
          <div className='w-full sm:w-64 shrink-0'>
            <img
              className='w-full aspect-3/2 rounded-lg shadow-sm'
              src={article.article_img_url}
              alt=''
            />
          </div>

          <div>
            <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
              <Heading>{article.title}</Heading>
              <Badge
                className='min-w-[50px] max-sm:hidden'
                color={`${article.votes > 0 ? 'lime' : 'zinc'}`}
              >
                <StarIcon className='w-4 h-4' />
                {article.votes}
              </Badge>
            </div>
            <Subheading>
              Topic:
              {` "${article.topic[0].toUpperCase() + article.topic.slice(1)}"`}
            </Subheading>
            <div className='mt-2 text-sm/6 text-zinc-500'>
              created by {article.author} at {formatDate(article.created_at)}{' '}
            </div>
            <div className='text-xs/6 text-zinc-600'>
              comments {article.comment_count}
            </div>
          </div>
        </div>
        {/* <div className='flex gap-4'>
          <Button outline>Edit</Button>
          <Button>View</Button>
        </div> */}
        <Text className='!text-white'>{article.body}</Text>
      </div>
    </>
  );
}
