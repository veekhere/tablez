import { Button } from '@ui/button';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <main className='min-h-screen flex flex-col items-center justify-center'>
      <section className='flex flex-col flex-1 items-center justify-center'>
        <h1 className='text-2xl font-extrabold tracking-tight cursor-default lg:text-4xl'>This page does not exist or has been moved</h1>

        <Button
          className='mt-20'
          onClick={() => navigate(-1)}
        >
          Return me back
        </Button>
      </section>
    </main>
  );
}
