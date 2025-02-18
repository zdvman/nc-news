import { Button } from '../components/catalyst-ui-kit/button';

export default function NotFoundPage() {
  return (
    <main className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center gap-x-6'>
        <h1 className='mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl'>
          Page not found 404
        </h1>
        <p className='mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8'>
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Button href='/'>Go back home</Button>
        </div>
      </div>
    </main>
  );
}
