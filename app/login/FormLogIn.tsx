'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/navigation';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { errorType } from './errorType';
import { FirebaseError } from 'firebase/app';

type FormValues = {
  email: string;
  password: string;
};

function FormSignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError('email', {
          type: 'manual',
          message:
            errorType[error.code as keyof typeof errorType] || error.code,
        });
      }
    }
  });

  if (user) {
    router.push('/');
    return null;
  }

  const handleClickShowPassword = () => setShowPassword((v) => !v);

  return (
    <form onSubmit={onSubmit}>
      <TextField
        {...register('email', {
          required: true,
          minLength: {
            value: 5,
            message: 'Email must be at least 5 characters long',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Please enter a valid email address',
          },
        })}
        error={Boolean(errors?.email)}
        helperText={errors?.email?.message}
        variant="outlined"
        margin="dense"
        fullWidth
        id="email"
        label={'emailAddress'}
        autoComplete="email"
        autoFocus
      />
      <TextField
        {...register('password', {
          required: { value: true, message: 'Please Enter Password' },
          minLength: {
            value: 8,
            message: 'password must have at least 8 characters',
          },
        })}
        autoComplete="current-password"
        error={Boolean(errors?.password)}
        helperText={errors?.password?.message}
        label={'password'}
        margin="dense"
        fullWidth
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box
        sx={{
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Link href="#">{'forgotPassword'}</Link>
      </Box>
      <LoadingButton
        loading={isSubmitting}
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginBottom: 4 }}
        type="submit"
      >
        {'login'}
      </LoadingButton>

      <Typography
        fontSize="sm"
        sx={{ alignSelf: 'center', mx: 'auto', maxWidth: 'fit-content' }}
      >
        Don&apos;t have an account?{' '}
        <Link href="/signup" sx={{ textDecoration: 'none' }}>
          Sign up
        </Link>
      </Typography>
    </form>
  );
}

export default FormSignIn;
