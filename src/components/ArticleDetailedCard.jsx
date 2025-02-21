import { NavLink } from 'react-router-dom';
import {
  ChevronLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/16/solid';
import { Heading, Subheading } from '@/components/catalyst-ui-kit/heading';
import { Badge } from '@/components/catalyst-ui-kit/badge';
import { useContext, useEffect, useState } from 'react';
import { formatDate, handleErrorOkButton } from '../utils/utils';
import { Text } from '@/components/catalyst-ui-kit/text';
import { patchVotesOnArticle } from '../services/api';
import AlertPopup from './AlertPopup';
import UserAccount from '../context/UserAccount';
import Loading from './Loading';

export default function ArticleDetailedCard({ article }) {
  const {
    error,
    setError,
    loading,
    isErrorPopupOpen,
    setIsErrorPopupOpen,
    navigate,
  } = useContext(UserAccount);
  const [voteStatus, setVoteStatus] = useState(() => {
    return localStorage.getItem(`voteStatus-${article.article_id}`) || null;
  });
  const [votes, setVotes] = useState(article?.votes);
  const [pendingVote, setPendingVote] = useState(null);

  const handleVote = (type) => {
    if (voteStatus === type) {
      setVotes((prev) => prev + (type === 'like' ? -1 : 1)); // Undo vote
      setVoteStatus(null);
      setPendingVote(type === 'like' ? -1 : 1);
      localStorage.removeItem(`voteStatus-${article?.article_id}`); // Clear stored vote
    } else {
      setVotes(
        (prev) =>
          prev +
          (voteStatus ? (type === 'like' ? 2 : -2) : type === 'like' ? 1 : -1)
      );
      setVoteStatus(type);
      setPendingVote(
        voteStatus ? (type === 'like' ? 2 : -2) : type === 'like' ? 1 : -1
      );
      localStorage.setItem(`voteStatus-${article?.article_id}`, type); // Store vote selection
    }
  };

  useEffect(() => {
    if (pendingVote !== null) {
      setError(null);
      setIsErrorPopupOpen(false);
      patchVotesOnArticle(article?.article_id, pendingVote)
        .then((updatedArticle) => {
          setVotes(updatedArticle.votes);
        })
        .catch((err) => {
          setVotes((prev) => prev - pendingVote);
          setError(
            'Status: ' +
              err.response.status +
              ' Message: "' +
              err.response.data.msg +
              '"' +
              `${
                err.response.data.error &&
                ' Extra error info: ' + err.response.data.error
              }` || 'An unexpected error occurred in vote update'
          );
          setIsErrorPopupOpen(true);
        })
        .finally(() => {
          setPendingVote(null);
        });
    }
  }, [pendingVote, article?.article_id]);

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

  if (loading) return <Loading />;

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
              src={article?.article_img_url}
              alt=''
            />
          </div>

          <div>
            <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
              <Heading>{article?.title}</Heading>
            </div>
            <Subheading className='mt-2'>
              Topic:{' '}
              {` "${
                article?.topic[0].toUpperCase() + article?.topic?.slice(1)
              }"`}
            </Subheading>
            <div className='mt-2 text-sm/6 text-zinc-500'>
              created by {article?.author} at {formatDate(article?.created_at)}{' '}
            </div>
            <div className='text-xs/6 text-zinc-600'>
              comments {article?.comment_count}
            </div>

            {/* Voting Section */}
            <Badge className='min-w-[70px] mt-4 flex items-center gap-3 px-3 py-2'>
              {/* Like Button */}
              <HandThumbUpIcon
                onClick={() => handleVote('like')}
                className={`w-5 h-5 cursor-pointer transition-colors duration-200 
                ${voteStatus === 'like' ? 'text-lime-500' : 'text-gray-400'} 
                hover:text-lime-500`}
              />

              {/* Display Votes */}
              <span className='text-white px-2'>{votes}</span>

              {/* Dislike Button */}
              <HandThumbDownIcon
                onClick={() => handleVote('dislike')}
                className={`w-5 h-5 cursor-pointer transition-colors duration-200 
                ${voteStatus === 'dislike' ? 'text-lime-500' : 'text-gray-400'} 
                hover:text-lime-500`}
              />
            </Badge>
          </div>
        </div>
        <Text className='!text-white'>{article?.body}</Text>
      </div>
    </>
  );
}
