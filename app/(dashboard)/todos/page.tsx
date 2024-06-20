'use client';
import TodoList from '@/components/TodoList';
import { app } from '@/utils/firebase';
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { ITodo } from '@/types';
import { useEffect, useState } from 'react'; // Assuming you're using React

const getData = async () => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, 'todo'));
  let todos: ITodo[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log('data', data);
    if (data) {
      // Ensure createdAt is a plain object
      const createdAtPlain = {
        seconds: data.createdAt.seconds,
        nanoseconds: data.createdAt.nanoseconds,
      };

      const todo: ITodo = {
        id: doc.id,
        createdAt: createdAtPlain,
        content: data.content || '',
        completed: data.completed || false,
      };
      todos.push(todo);
    }
  });
  console.log(todos);
  return todos;
};

const TodosPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const db = getFirestore(app);
    const unsubscribe = onSnapshot(collection(db, 'todo'), (querySnapshot) => {
      const updatedTodos: ITodo[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data) {
          // Ensure createdAt is a plain object
          const createdAtPlain = {
            seconds: data.createdAt.seconds,
            nanoseconds: data.createdAt.nanoseconds,
          };

          const todo: ITodo = {
            id: doc.id,
            createdAt: createdAtPlain,
            content: data.content || '',
            completed: data.completed || false,
          };
          updatedTodos.push(todo);
        }
      });
      setTodos(updatedTodos);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
};

export default TodosPage;
