import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PathConstants } from '@constants';
import {
  doCreateUserWithEmailAndPassword,
  doPasswordReset,
  doSendEmailVerification,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from '@fb/auth';
import { useAppDispatch } from '@store/hooks';
import { setLoader } from '@store/slices/loader.slice';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Fingerprint, HeartIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

enum AuthType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

export function AuthFormsComponent() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(null);
  const [message, setMessage] = useState<string>(null);
  const [authType, setAuthType] = useState<AuthType>(AuthType.SignIn);
  const navigate = useNavigate();

  async function handleAuth(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    dispatch(setLoader(true));

    const { error, user } =
      authType === AuthType.SignIn
        ? await doSignInWithEmailAndPassword(email, password)
        : await doCreateUserWithEmailAndPassword(email, password);

    if (error) {
      setError(error);
    } else if (!user?.emailVerified) {
      await doSendEmailVerification();
      navigate(PathConstants.VERIFY_EMAIL);
    } else {
      navigate(PathConstants.HOME);
    }

    dispatch(setLoader(false));
    toast(`${authType === AuthType.SignIn ? 'Welcome back' : 'Welcome'} ${user?.email}!`, {
      icon: <HeartIcon className='text-red-500 pr-2' />,
      className: 'select-none pointer-events-none',
    });
  }

  async function handlePasswordReset(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const result = await doPasswordReset(email);
    if (result?.error) {
      setError(result?.error);
    } else {
      setMessage('Check your email for the password reset link');
    }
  }

  async function handleGoogleSignIn(): Promise<void> {
    const { error } = await doSignInWithGoogle();
    if (error) {
      setError(error);
    }
  }

  return (
    <>
      <Tabs
        defaultValue={AuthType.SignIn}
        className='w-full pt-6'
        onValueChange={(e) => setAuthType(e as AuthType)}
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value={AuthType.SignIn}>Sign In</TabsTrigger>
          <TabsTrigger value={AuthType.SignUp}>Sign Up</TabsTrigger>
        </TabsList>

        <form
          onSubmit={handleAuth}
          className='pt-4'
        >
          <div className='space-y-2 mb-4'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <TabsContent value={AuthType.SignIn}>
            <Button
              type='submit'
              className='w-full mt-12'
            >
              Sign In
            </Button>
          </TabsContent>
          <TabsContent value={AuthType.SignUp}>
            <Button
              type='submit'
              className='w-full mt-12'
            >
              Sign Up
            </Button>
          </TabsContent>
        </form>
      </Tabs>

      <Button
        variant='outline'
        onClick={handleGoogleSignIn}
        className='w-full'
      >
        <Fingerprint className='mr-2 h-4 w-4' />
        Sign in with Google
      </Button>

      <Button
        variant='link'
        onClick={handlePasswordReset}
        className='w-full text-muted-foreground-extra font-normal'
      >
        Forgot password?
      </Button>

      {error && (
        <Alert variant='destructive'>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {message && (
        <Alert>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
