import { useContext, useEffect, useState } from 'react';

import UserAccount from '../context/UserAccount';
import { Button } from './catalyst-ui-kit/button';
import { Heading } from './catalyst-ui-kit/heading';
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
} from '@/components/catalyst-ui-kit/fieldset';
import { Text } from '@/components/catalyst-ui-kit/text';
import { Textarea } from '@/components/catalyst-ui-kit/textarea';
import { formatDate, handleErrorOkButton } from '../utils/utils';
import { Link } from 'react-router-dom';
import { EllipsisVerticalIcon, StarIcon } from '@heroicons/react/16/solid';
import { deleteCommentOnArticle, postCommentOnArticle } from '../services/api';
import AlertPopup from './AlertPopup';

export default function CommentsListByArticle({
  comments,
  setComments,
  article_id,
}) {
  const {
    loggedUser,
    error,
    setError,
    isErrorPopupOpen,
    setIsErrorPopupOpen,
    navigate,
  } = useContext(UserAccount);
  const [body, setBody] = useState('');
  const [newCommentId, setNewCommentId] = useState(null);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  function addNewComment(article_id, username, body) {
    setError(null);
    setIsErrorPopupOpen(false);
    postCommentOnArticle(article_id, username, body)
      .then((newComment) => {
        setComments([...comments, newComment]);
        setBody('');
        setNewCommentId(newComment?.comment_id);
        setTimeout(() => {
          setNewCommentId(null);
        }, 3000);
      })
      .catch((err) => {
        setError(
          'Status: ' +
            err.response.status +
            ' Message: "' +
            err.response.data.msg +
            '"' +
            `${
              err.response.data.error &&
              ' Extra error info: ' + err.response.data.error
            }` || 'An unexpected error occurred in add new comment'
        );
        setIsErrorPopupOpen(true);
      });
  }

  function animationClass(comment_id) {
    if (newCommentId === comment_id) return 'animate-pulse bg-lime-900';
    if (commentIdToDelete === comment_id) return 'animate-pulse bg-red-900';
    return '';
  }

  function handleDeleteRequest(comment_id) {
    setCommentIdToDelete(comment_id);
    setIsDeletePopupOpen(true);
  }

  function handleDeleteConfirmation() {
    setError(null);
    setIsErrorPopupOpen(false);
    setIsDeletePopupOpen(false);
    if (commentIdToDelete) {
      deleteCommentOnArticle(commentIdToDelete)
        .then(() => {
          setComments(
            comments.filter((c) => c.comment_id !== commentIdToDelete)
          );
          setCommentIdToDelete(null);
        })
        .catch((err) => {
          setError(
            'Status: ' +
              err.response.status +
              ' Message: "' +
              err.response.data.msg +
              '"' +
              `${
                err.response.data.error &&
                ' Extra error info: ' + err.response.data.error
              }` || 'An unexpected error occurred in delete comment'
          );
          setIsErrorPopupOpen(true);
        });
    }
  }

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

  return (
    <>
      <Heading className='mt-10' level={2}>
        Recent Comments
      </Heading>
      <ul>
        {comments?.map((comment) => (
          <li
            key={comment?.comment_id}
            className={`transition-all duration-500 ${animationClass(
              comment?.comment_id
            )}`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-6 py-6'>
                <div className='space-y-1.5'>
                  <Link
                    href={`/users/${comment?.author}`}
                    className='text-[12px] text-gray-400 hover:text-gray-300'
                  >
                    Created by: {comment?.author}
                  </Link>
                  <span className='text-[10px] text-gray-500'>
                    {' ' + formatDate(comment?.created_at)}
                  </span>
                  <Text className='px-6 mt-2 !text-white'>{comment?.body}</Text>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <Badge
                  className='min-w-[50px] max-sm:hidden'
                  color={`${comment?.votes > 0 ? 'lime' : 'zinc'}`}
                >
                  <StarIcon className='w-4 h-4' />
                  {comment?.votes}
                </Badge>
                <Dropdown>
                  <DropdownButton plain aria-label='More options'>
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor='bottom end'>
                    {loggedUser?.username === comment?.author && (
                      <DropdownItem
                        onClick={() => handleDeleteRequest(comment?.comment_id)}
                      >
                        Delete
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <Divider soft={true} />
          </li>
        ))}
      </ul>

      {/* Delete Confirmation Popup */}
      <AlertPopup
        isOpen={isDeletePopupOpen}
        setIsOpen={setIsDeletePopupOpen}
        onConfirm={handleDeleteConfirmation}
        title='Do you really want to delete this comment?'
        description='This action cannot be undone.'
        setCommentIdToDelete={setCommentIdToDelete}
        confirmText='Delete'
        cancelText='Cancel'
      />

      <div className='mt-10'>
        <form
          action='#'
          method='POST'
          onSubmit={(e) => {
            e.preventDefault();
            if (body.trim() === '') return;
            addNewComment(article_id, loggedUser?.username, body);
          }}
        >
          <Fieldset disabled={loggedUser ? false : true}>
            <Heading level={3}>Share your thoughts</Heading>
            <Text>Tell us what you think about this article!</Text>
            <FieldGroup>
              <Field>
                <Label>Your comment</Label>
                <Textarea
                  name='notes'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <Description>We'd like to know your opinion.</Description>
              </Field>
            </FieldGroup>
          </Fieldset>
          {loggedUser ? (
            <Button
              type='submit'
              className='px-8 mt-6 w-full sm:w-auto min-w-[300px]'
            >
              Post Your Comment
            </Button>
          ) : (
            <Button
              href='/profile'
              className='px-8 mt-6 w-full sm:w-auto min-w-[300px]'
            >
              Sign in to leave a comment
            </Button>
          )}
        </form>
      </div>
    </>
  );
}
