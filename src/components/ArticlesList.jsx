import { Badge } from '@/components/catalyst-ui-kit/badge';
import { Divider } from '@/components/catalyst-ui-kit/divider';
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/catalyst-ui-kit/dropdown';
import { Link } from '@/components/catalyst-ui-kit/link';
import { EllipsisVerticalIcon, StarIcon } from '@heroicons/react/16/solid';
import { getArticles } from '../services/api';
import { Subheading } from '@/components/catalyst-ui-kit/heading';
import { useContext, useEffect, useState } from 'react';
import UserAccount from '../context/UserAccount';
import { formatDate } from '../utils/utils';
import Loading from './Loading';
import { useParams, useSearchParams } from 'react-router-dom';
import { Heading } from './catalyst-ui-kit/heading';

export default function ArticlesList() {
  const [articles, setArticles] = useState(null);
  const { loggedUser } = useContext(UserAccount);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get('sort_by');
  const orderQuery = searchParams.get('order');

  function queryParams(topic, sortByQuery, orderQuery) {
    const params = {};
    if (topic) params.topic = topic;
    if (sortByQuery) params.sort_by = sortByQuery;
    if (orderQuery) params.order = orderQuery;
    return params;
  }

  useEffect(() => {
    getArticles(queryParams(topic, sortByQuery, orderQuery))
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [topic, orderQuery, sortByQuery]);

  if (!articles) {
    return <Loading />;
  }

  return (
    <>
      <Heading className='my-6'>
        {topic ? `Articles on "${topic}"` : 'All Articles'}
      </Heading>
      <ul className='mt-10'>
        {articles.map((article, index) => (
          <li key={article.article_id}>
            <Divider soft={index > 0} />
            <div className='flex items-center justify-between'>
              <div key={article.article_id} className='flex gap-6 py-6'>
                <div className='w-32 shrink-0'>
                  <Link
                    href={`/articles/${article.topic}/${article.article_id}`}
                    aria-hidden='true'
                  >
                    <img
                      className='aspect-3/2 rounded-lg shadow-sm'
                      src={article.article_img_url}
                      alt=''
                    />
                  </Link>
                </div>
                <div className='space-y-1.5'>
                  <div className='text-base/6 font-semibold text-white'>
                    <Link
                      href={`/articles/${article.topic}/${article.article_id}`}
                    >
                      {article.title}
                    </Link>
                  </div>
                  <Subheading>
                    Topic:
                    {` "${
                      article.topic[0].toUpperCase() + article.topic.slice(1)
                    }"`}
                  </Subheading>
                  <div className='text-xs/6 text-zinc-500'>
                    created by {article.author} at{' '}
                    {formatDate(article.created_at)}{' '}
                  </div>
                  <div className='text-xs/6 text-zinc-600'>
                    comments {article.comment_count}
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <Badge
                  className='min-w-[50px] max-sm:hidden'
                  color={`${article.votes > 0 ? 'lime' : 'zinc'}`}
                >
                  <StarIcon className='w-4 h-4' />
                  {article.votes}
                </Badge>
                <Dropdown>
                  <DropdownButton plain aria-label='More options'>
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor='bottom end'>
                    <DropdownItem
                      href={`/articles/${article.topic}/${article.article_id}`}
                    >
                      View
                    </DropdownItem>
                    {loggedUser?.username === article.author && (
                      <>
                        {/* <DropdownItem>Edit</DropdownItem> */}
                        {/* <DropdownItem onClick={() => {}}>Delete</DropdownItem> */}
                      </>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
