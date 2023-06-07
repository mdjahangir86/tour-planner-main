import { db } from '@config/firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAuth,
  useCreateUserWithEmail,
  useSignInUserWithEmail,
  useSignInWithGoogleAccount,
} from '@hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { setUserInfo } from '@store/user/authSlice';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required().email('enter a valid email').trim(),
  password: yup.string().min(6).required(),
});

function Authentication() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoginLayout, setIsLoginLayout] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const {
    createUserWithEmailAndPassword,
    loading: signupLoading,
    error: signupError,
  } = useCreateUserWithEmail();
  const {
    signInWithEmailAndPassword,
    loading: signinLoading,
    error: signinError,
  } = useSignInUserWithEmail();
  const {
    signInWithGoogle,
    loading: signinGoogleLoading,
    error: signinGoogleError,
  } = useSignInWithGoogleAccount();
  const { user } = useAuth();

  const { userInfo } = useAppSelector((state) => state.auth);
  const collectionRef = collection(db, 'users');

  const isError = signupError || signinError || signinGoogleError || errorMsg;
  const errorMessage =
    signupError?.message ||
    signinError?.message ||
    signinGoogleError?.message ||
    errorMsg;
  const isCurrentlyLoading =
    !!signupLoading || !!signinLoading || !!signinGoogleLoading || isLoading;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user && !userInfo) {
      const userData = {
        uid: user.uid,
        email: user.email,
        role: 'user',
      };
      setIsLoading(true);

      const q = query(collection(db, 'users'), where('uid', '==', user.uid));

      getDocs(q)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            addDoc(collectionRef, userData);
          }

          let previousUserInfo;
          querySnapshot.forEach((doc) => {
            previousUserInfo = doc.data();
          });

          dispatch(setUserInfo({ userInfo: previousUserInfo }));
          setIsLoading(false);
          navigate('/dashboard');
        })
        .catch((error) => {
          setErrorMsg(error.message);
          setIsLoading(false);
        });
    }
  }, [user]);

  return (
    <Box
      sx={{
        minWidth: 300,
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <Paper elevation={2}>
        <Box
          textAlign="center"
          display="flex"
          flexDirection="column"
          gap={5}
          paddingY={5}
        >
          <Typography variant="h3">
            {isLoginLayout ? 'Login' : 'Sign up'}
          </Typography>

          <Box>
            <Button
              startIcon={<GoogleIcon />}
              variant="contained"
              onClick={() => signInWithGoogle()}
            >
              Sign in with Google
            </Button>
          </Box>

          <Divider sx={{ width: '50%', margin: '0 auto' }}>Or</Divider>

          <Box
            component="form"
            onSubmit={handleSubmit(async (values: FormValues) => {
              const { email, password } = values;

              if (isLoginLayout) {
                await signInWithEmailAndPassword(email, password);
              } else {
                await createUserWithEmailAndPassword(email, password);
              }
            })}
            display="flex"
            flexDirection="column"
            gap={3}
            minWidth={250}
            maxWidth={600}
            margin="0 auto"
            padding={2}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="email"
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="password"
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                />
              )}
            />

            {isError && <Typography color="error">{errorMessage}</Typography>}

            <Box>
              {isCurrentlyLoading ? (
                <Button
                  variant="outlined"
                  type="submit"
                  disabled={isCurrentlyLoading}
                >
                  <CircularProgress size={30} />
                </Button>
              ) : (
                <Button variant="outlined" type="submit">
                  {isLoginLayout ? 'Log in' : 'Sign up'}
                </Button>
              )}
            </Box>
          </Box>

          <Box>
            <Typography>
              {isLoginLayout
                ? "Don't have an account?"
                : 'Already have an account?'}

              <Box
                component="span"
                color="secondary.main"
                sx={{ cursor: 'pointer', marginLeft: 1 }}
                onClick={() => setIsLoginLayout((prevState) => !prevState)}
              >
                {isLoginLayout ? 'Sign up' : 'Login'}
              </Box>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Authentication;
