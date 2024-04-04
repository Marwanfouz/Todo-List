'use server';
import { revalidatePath } from 'next/cache';
import { app } from './firebase';
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDoc,
  addDoc,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(app);

export const completeTodo = async (id: string) => {
  const todoDocRef = doc(db, 'todo', id);
  const todoDocSnapshot = await getDoc(todoDocRef);

  if (todoDocSnapshot.exists()) {
    const todoData = todoDocSnapshot.data();
    const currentCompletedState = todoData.completed;

    await updateDoc(todoDocRef, {
      completed: !currentCompletedState,
    });
    revalidatePath('/todos');
  }
};

export const newTodo = async (data: FormData) => {
  const newTodo = data.get('content') as string;
  if (newTodo) {
    await addDoc(collection(db, 'todo'), {
      content: newTodo,
      createdAt: serverTimestamp(),
      completed: false,
    });
    revalidatePath('/todos');
  }
};

export const deleteTodo = async (todoId: string) => {
  const todoRef = doc(collection(db, 'todo'), todoId);

  await deleteDoc(todoRef);
  revalidatePath('/todos');
};
