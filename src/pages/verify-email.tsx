import { PathConstants } from '@constants';
import { useAuth } from '@context/auth.context';
import { auth } from '@fb/config';
import { authGuard } from '@guards/auth.guard';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function VerifyEmail() {
  authGuard();

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const interval = setInterval(() => {
        user?.reload();
        if (user?.emailVerified) {
          unsubscribe();
          clearInterval(interval);
          setCurrentUser(user);
          navigate(PathConstants.HOME);
        }
      }, 3000);
    });
  }, []);

  return (
    <main className='min-h-screen flex flex-col items-center justify-center'>
      <section className='flex flex-col flex-1 items-center justify-center'>
        <div>
          <h1 className='text-2xl font-extrabold tracking-tight cursor-default lg:text-4xl'>Almost There</h1>
          <p className='text-md font-extralight text-muted-foreground tracking-wide cursor-default lg:text-xl'>
            We have sent you an email to verify your email address. After verifying your email address, you will be redirected automatically
          </p>
        </div>
      </section>
    </main>
  );
}
