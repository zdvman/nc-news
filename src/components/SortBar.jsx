import { Button } from '@/components/catalyst-ui-kit/button';
import { Heading } from '@/components/catalyst-ui-kit/heading';
import { Input, InputGroup } from '@/components/catalyst-ui-kit/input';
import { Select } from '@/components/catalyst-ui-kit/select';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

export default function SortBar() {
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
            <Select name='sort_by'>
              <option value='desc'>Sort Descending</option>
              <option value='asc'>Sort Ascending</option>
              <option value='created_at'>Sort by Date</option>
              <option value='author'>Sort by Author</option>
              <option value='topic'>Sort by Topics</option>
              <option value='votes'>Sort by Votes</option>
              <option value='comment_count'>Sort by Comments number</option>
            </Select>
          </div>
        </div>
      </div>
      <Button>Create article</Button>
    </div>
  );
}
