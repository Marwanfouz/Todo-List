'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/navigation';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

type FormValues = {
  email: string;
  password: string;
};

function FormSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/');
    } else {
      setLoading(false);
    }
  }, [user, router]);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        createdAt: new Date(),
      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  });

  const handleClickShowPassword = () => setShowPassword((v) => !v);

  // Render null or loading indicator while waiting for authentication status
  if (loading) {
    return <CircularProgress />;
  }

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
        label="Email Address"
        autoComplete="email"
        autoFocus
      />
      <TextField
        {...register('password', {
          required: { value: true, message: 'Please Enter Password' },
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
        })}
        autoComplete="current-password"
        error={Boolean(errors?.password)}
        helperText={errors?.password?.message}
        label="Password"
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

      <LoadingButton
        loading={isSubmitting}
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginBottom: 4 }}
        type="submit"
      >
        Sign Up
      </LoadingButton>
    </form>
  );
}

export default FormSignUp;
