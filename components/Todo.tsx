'use client';
import { useTransition } from 'react';
import { completeTodo } from '@/utils/actions';
import { ITodo } from '@/types';

interface TodoProps {
  todo: ITodo;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <div
      onClick={() => startTransition(() => completeTodo(todo.id))}
      className={`px-8 py-2 border border-black/25 cursor-pointer ${
        todo.completed ? 'line-through text-black/30' : ''
      }`}
    >
      {todo.content}
    </div>
  );
};

export default Todo;
