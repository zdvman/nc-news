import { Badge } from '@/components/catalyst-ui-kit/badge';
import { Divider } from '@/components/catalyst-ui-kit/divider';
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/catalyst-ui-kit/dropdown';
import { Link } from '@/components/catalyst-ui-kit/link';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { fetchArticles } from '../services/api';
import { Subheading } from '@/components/catalyst-ui-kit/heading';
import { useEffect, useState } from 'react';

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((fetchedArticles) => {
      setArticles(fetchedArticles);
    });
  }, []);

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString();
  };

  return (
    <ul className='mt-10'>
      {articles.map((article, index) => (
        <li key={article.article_id}>
          <Divider soft={index > 0} />
          <div className='flex items-center justify-between'>
            <div key={article.article_id} className='flex gap-6 py-6'>
              <div className='w-32 shrink-0'>
                <Link
                  href={`/articles/${article.article_id}`}
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
                <Subheading>
                  {article.topic[0].toUpperCase() + article.topic.slice(1)}
                </Subheading>
                <div className='text-base/6 font-semibold text-white'>
                  <Link href={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>
                </div>
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
              <Badge className='max-sm:hidden' color={'lime'}>
                votes: {article.votes}
              </Badge>
              <Dropdown>
                <DropdownButton plain aria-label='More options'>
                  <EllipsisVerticalIcon />
                </DropdownButton>
                <DropdownMenu anchor='bottom end'>
                  <DropdownItem href={article.url}>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
