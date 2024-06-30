'use client';

import TodoList from '@/components/TodoList';
import { app } from '@/utils/firebase';
import {
  getFirestore,
  collection,
  onSnapshot,
  where,
  query,
} from 'firebase/firestore';
import { ITodo } from '@/types';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/navigation';

const TodosPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const router = useRouter();
  if (!user) {
    router.replace('/login');
  }

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false); // Set loading to false if user is not available
      return;
    }

    const db = getFirestore(app);
    const q = query(collection(db, 'todo'), where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedTodos: ITodo[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data) {
          // Ensure createdAt is a plain object
          const createdAtPlain = data.createdAt
            ? {
                seconds: data.createdAt.seconds,
                nanoseconds: data.createdAt.nanoseconds,
              }
            : null;

          const todo: ITodo = {
            id: doc.id,
            userId: data.userId,
            createdAt: createdAtPlain,
            content: data.content || '',
            completed: data.completed || false,
          };
          updatedTodos.push(todo);
        }
      });
      setTodos(updatedTodos);
      setLoading(false); // Set loading to false after fetching todos
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
};

export default TodosPage;
