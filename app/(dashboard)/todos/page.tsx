import TodoList from '@/components/TodoList';
import { app } from '@/utils/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { ITodo } from '@/types';

const getData = async () => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, 'todo'));
  let todos: ITodo[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data) {
      const todo: ITodo = {
        id: doc.id,
        createdAt: data.createdAt,
        content: data.content || '',
        completed: data.completed || false,
      };
      todos.push(todo);
    }
  });
  return todos;
};


const TodosPage = async () => {
  const todos = await getData();
  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
};

export default TodosPage;
