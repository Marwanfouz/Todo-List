'use server';
import { app } from './firebase';
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDoc,
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
  }
};

export const deleteTodo = async (todoId: string) => {
  const todoRef = doc(collection(db, 'todo'), todoId);

  await deleteDoc(todoRef);
};
