import Todo from './Todo';
import { ITodo } from '@/types';

interface TodoListProps {
  todos: ITodo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
