import { PathConstants } from '@constants';
import { useAuth } from '@context/auth.context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function authGuard() {
  const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn && !currentUser?.emailVerified) {
      navigate(PathConstants.VERIFY_EMAIL);
    } else if (!userLoggedIn) {
      navigate(PathConstants.NOT_AUTHORIZED);
    }
  }, [userLoggedIn, currentUser?.emailVerified]);
}
