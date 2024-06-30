export interface ITodo {
  id: string;
  userId: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  content: string;
  completed: boolean;
}
