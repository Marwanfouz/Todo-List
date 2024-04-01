import db from '@/utils/db';
import TodoList from '@/components/TodoList';

const getData = async () => {
  const todos = await db.todo.findMany({});
  return todos;
};

const TodosPage = async () => {
  const todos = await getData();
  console.log(todos)
  return (
    <div>
      <TodoList todos={todos}/>
    </div>
  )
};

export default TodosPage;
