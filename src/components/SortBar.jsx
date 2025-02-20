import { Button } from '@/components/catalyst-ui-kit/button';
import { Heading } from '@/components/catalyst-ui-kit/heading';
import { Input, InputGroup } from '@/components/catalyst-ui-kit/input';
import { Select } from '@/components/catalyst-ui-kit/select';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useContext } from 'react';
import UserAccount from '../context/UserAccount';
import { ArrowsUpDownIcon } from '@heroicons/react/16/solid';
import { useSearchParams } from 'react-router-dom';
import { Badge } from './catalyst-ui-kit/badge';

export default function SortBar() {
  const { loggedUser } = useContext(UserAccount);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentOrder = searchParams.get('order') || 'desc';
  const currentSortBy = searchParams.get('sort_by') || 'created_at';

  function toggleOrder(e) {
    e.preventDefault();
    const newOrder = currentOrder === 'desc' ? 'asc' : 'desc';

    setSearchParams({
      ...Object.fromEntries(searchParams),
      order: newOrder,
    });
  }

  function handleSortChange(e) {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sort_by: e.target.value,
    });
  }

  return (
    <div className='flex flex-wrap items-end justify-between gap-4'>
      <div className='max-sm:w-full sm:flex-1'>
        <Heading>Artilcles</Heading>
        <div className='mt-4 flex max-w-xl gap-4'>
          <div className='flex-1'>
            <InputGroup>
              <MagnifyingGlassIcon />
              <Input name='search' placeholder='Search articless&hellip;' />
            </InputGroup>
          </div>
          <div>
            <Select
              name='sort_by'
              onChange={handleSortChange}
              value={currentSortBy}
            >
              <option value='created_at'>Sort by Date</option>
              <option value='author'>Sort by Author</option>
              <option value='topic'>Sort by Topics</option>
              <option value='votes'>Sort by Votes</option>
              <option value='comment_count'>Sort by Comments number</option>
            </Select>
          </div>
          <Badge
            onClick={toggleOrder}
            className='cursor-pointer min-w-[70px] max-sm:hidden flex items-center'
            color={`${currentOrder === 'asc' ? 'lime' : 'zinc'}`}
          >
            <ArrowsUpDownIcon className='w-4 h-4' />
            {currentOrder.toUpperCase()}
          </Badge>
        </div>
      </div>
      {loggedUser ? (
        <Button className='px-8 mt-6 w-full sm:w-auto min-w-[200px]'>
          Create article
        </Button>
      ) : (
        <Button
          href='/profile'
          className='px-8 mt-6 w-full sm:w-auto min-w-[200px]'
        >
          Sign in to create an article
        </Button>
      )}
    </div>
  );
}
