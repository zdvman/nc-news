import { useContext, useEffect, useState } from 'react';
import Loading from './Loading';
import { fetchCommentsByArticle } from '../services/api';

import { HeartIcon } from '@heroicons/react/24/solid';
import UserAccount from '../context/UserAccount';
import { Button } from './catalyst-ui-kit/button';
import { Heading, Subheading } from './catalyst-ui-kit/heading';
import { Divider } from './catalyst-ui-kit/divider';
import { Badge } from './catalyst-ui-kit/badge';
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/catalyst-ui-kit/dropdown';

import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from '@/components/catalyst-ui-kit/fieldset';
import { Text } from '@/components/catalyst-ui-kit/text';
import { Textarea } from '@/components/catalyst-ui-kit/textarea';
import { formatDate } from '../utils/utils';
import { Link } from 'react-router-dom';
import { EllipsisVerticalIcon, StarIcon } from '@heroicons/react/16/solid';

export default function CommentsListByArticle({ comments }) {
  const { loggedUser } = useContext(UserAccount);
  useEffect(() => {}, []);

  if (!comments) {
    return <Loading />;
  }

  return (
    <>
      <Heading className='mt-10' level={2}>
        Recent Comments
      </Heading>
      <ul>
        {comments.map((comment, index) => (
          <li key={comment.comment_id}>
            <div className='flex items-center justify-between'>
              <div key={comment.comment_id} className='flex gap-6 py-6'>
                <div className='space-y-1.5'>
                  <Link
                    href={`/users/${comment.author}`}
                    className='text-[10px] text-gray-400 hover:text-gray-300'
                  >
                    Created by: {comment.author}
                  </Link>
                  <span className='text-[9px] text-gray-500'>
                    {' ' + formatDate(comment.created_at)}
                  </span>
                  <Text className='px-6 mt-2 !text-white'>{comment.body}</Text>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <Badge
                  className='min-w-[50px] max-sm:hidden'
                  color={`${comment.votes > 0 ? 'lime' : 'zinc'}`}
                >
                  <StarIcon className='w-4 h-4' />
                  {comment.votes}
                </Badge>
                <Dropdown>
                  <DropdownButton plain aria-label='More options'>
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  {loggedUser?.username === comment.author && (
                    <DropdownMenu anchor='bottom end'>
                      <DropdownItem>Delete</DropdownItem>
                    </DropdownMenu>
                  )}
                </Dropdown>
              </div>
            </div>
            <Divider soft={true} />
          </li>
        ))}
      </ul>

      {loggedUser ? (
        <div className='mt-10'>
          <form action='#' method='POST'>
            <Fieldset>
              <Heading level={3}>Share your thoughts</Heading>
              <Text>Tell us what you think about this article!</Text>
              <FieldGroup>
                <Field>
                  <Label>Your comment</Label>
                  <Textarea name='notes' />
                  <Description>We'd like to know your opinion.</Description>
                </Field>
              </FieldGroup>
            </Fieldset>
            <Button
              href='#'
              className='px-8 mt-6 w-full sm:w-auto min-w-[300px]'
            >
              Post Your Comment
            </Button>
          </form>
        </div>
      ) : (
        <Button
          href='/profile'
          className='px-8 mt-6 w-full sm:w-auto min-w-[300px]'
        >
          Sign in to leave a comment
        </Button>
      )}
    </>
  );
}
