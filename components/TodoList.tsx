import { List } from '@mui/material';
import Todo from './Todo';
import { ITodo } from '@/types';

interface TodoListProps {
  todos: ITodo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <List>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </List>
  );
};

export default TodoList;
