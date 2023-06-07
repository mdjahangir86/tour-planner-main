import { auth } from '@config/firebase';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';

export const useCreateUserWithEmail = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  return {
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  };
};

export const useSignInUserWithEmail = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  return {
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  };
};

export const useSignInWithGoogleAccount = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return {
    signInWithGoogle,
    user,
    loading,
    error,
  };
};

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);

  return {
    user,
    loading,
    error,
  };
};
