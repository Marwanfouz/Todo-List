'use client';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Snarkbar from './mui/Snarkbar';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/auth';
import { db } from '@/utils/firebase';

type FormValues = {
  content: string;
};

const NewTodoForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const { user } = useAuth();

  const onSubmit = handleSubmit(async ({ content }) => {
    try {
      await addDoc(collection(db, 'todo'), {
        content,
        userId: user?.uid,
        createdAt: serverTimestamp(),
        completed: false,
      });
    } catch (error: unknown) {
      console.error(error);
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: 'flex' }}>
        <TextField
          {...register('content', {
            required: { value: true, message: 'Please Enter Todo' },
          })}
          variant="outlined"
          label="type your task"
          sx={{ m: 2, width: { xs: 150, sm: 200, md: 300 } }}
        ></TextField>
        <Snarkbar></Snarkbar>
      </form>
    </div>
  );
};

export default NewTodoForm;
