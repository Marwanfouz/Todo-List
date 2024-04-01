'use client';

import { ITodo } from '@/types';

interface TodoProps {
  todo: ITodo;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  return <div>{todo.content}</div>;
};

export default Todo;
