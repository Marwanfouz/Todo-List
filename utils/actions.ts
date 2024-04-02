'use server';
import { revalidatePath } from 'next/cache';
import db from './db';

export const completeTodo = async (id: string) => {
  await db.todo.update({
    where: { id },
    data: {
      completed: true,
    },
  }),
    revalidatePath('/todos')
};

export const newTodo = async (data: FormData) => {
  const newTodo = data.get('todo') as string;

  if (newTodo) {
    await db.todo.create({
      data: {
        content: newTodo,
      },
    });
    revalidatePath('/todos');
  }
};
