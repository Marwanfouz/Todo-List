'use client';
import { useTransition } from 'react';
import { completeTodo } from '@/utils/actions';
import { ITodo } from '@/types';
import { ListItem, Typography } from '@mui/material';

interface TodoProps {
  todo: ITodo;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <ListItem
      onClick={() => startTransition(() => completeTodo(todo.id))}
      sx={{
        cursor: 'pointer',
        border: 1,
        borderRadius: 2,
        maxWidth: 400,
        marginX: 'auto',
        marginY: 2,
      }}
    >
      <Typography
        style={{ color: todo.completed ? '#009688' : '', fontSize: 25 }}
        key={todo.id}
      >
        {todo.content}
      </Typography>
    </ListItem>
  );
};

export default Todo;
