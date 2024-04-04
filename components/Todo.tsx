'use client';
import { useTransition } from 'react';
import { completeTodo, deleteTodo } from '@/utils/actions';
import { ITodo } from '@/types';
import { Box, Button, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoProps {
  todo: ITodo;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
    >
      <ListItem
        onClick={() => startTransition(() => completeTodo(todo.id))}
        sx={{
          cursor: 'pointer',
          border: 1,
          borderRadius: 2,
          maxWidth: 400,
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
      <Button onClick={() => startTransition(() => deleteTodo(todo.id))}>
        <DeleteIcon color="error" />
      </Button>
    </Box>
  );
};

export default Todo;
