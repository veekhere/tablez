import { PathConstants } from '@constants';
import { Button } from '@ui/button';
import { useNavigate } from 'react-router-dom';

export function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <main className='min-h-screen flex flex-col items-center justify-center'>
      <section className='flex flex-col flex-1 items-center justify-center'>
        <div>
          <h1 className='text-2xl font-extrabold tracking-tight cursor-default lg:text-4xl'>Oops...</h1>
          <p className='text-md font-extralight text-muted-foreground tracking-wide cursor-default lg:text-xl'>
            Seems like you are not authorized to access this page
          </p>
        </div>

        <Button
          className='mt-20'
          onClick={() => navigate(PathConstants.ROOT)}
        >
          Create Account
        </Button>
      </section>
    </main>
  );
}
