'use client';
import { newTodo } from '@/utils/actions';
import { useState } from 'react';

const NewTodoForm = () => {
  const [state, updateState] = useState();

  return (
    <div>
      <form action={newTodo}>
        <input name='content' type="text" className="border border-black" />
        <button type="submit">new todo</button>
      </form>
    </div>
  );
};

export default NewTodoForm;
