import { useEffect, useState } from 'react';
import { getTopics } from '../services/api';
import Loading from '../components/Loading';
import { NavLink } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { Heading } from '../components/catalyst-ui-kit/heading';
import { Text } from '../components/catalyst-ui-kit/text';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TopicsPage() {
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  if (!topics) {
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
          Home
        </NavLink>
      </div>
      <Heading className='my-6'>Topics</Heading>
      <div className='grid sm:grid-cols-2 gap-2'>
        {topics.map((topic, topicIdx) => (
          <div
            key={topic?.slug + topic?.description}
            className={classNames(
              topicIdx === 0
                ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                : '',
              topicIdx === 1 ? 'sm:rounded-tr-lg' : '',
              topicIdx === topics.length - 2 ? 'sm:rounded-bl-lg' : '',
              topicIdx === topics.length - 1
                ? 'rounded-br-lg rounded-bl-lg sm:rounded-bl-none'
                : '',
              'group relative bg-gray-900 dark:bg-gray-800 p-6 border border-gray-700 rounded-lg transition-all duration-300'
            )}
          >
            <div className='mt-8'>
              <Heading
                level={3}
                className='text-base font-semibold text-gray-900'
              >
                <NavLink
                  to={`/articles/${topic?.slug}`}
                  className='focus:outline-none hover:text-indigo-400 transition-colors duration-200'
                >
                  {/* Extend touch target to entire panel */}
                  <span aria-hidden='true' className='absolute inset-0' />
                  Topic:{' '}
                  {`"${topic?.slug[0].toUpperCase() + topic?.slug.slice(1)}"`}
                </NavLink>
              </Heading>
              <Text className='mt-2'>{topic.description}</Text>
            </div>
            <span
              aria-hidden='true'
              className='pointer-events-none absolute top-6 right-6 text-gray-500 group-hover:text-indigo-400 transition-colors duration-200'
            >
              <svg fill='currentColor' viewBox='0 0 24 24' className='size-6'>
                <path d='M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z' />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
