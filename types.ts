export interface ITodo {
  id: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  content: string;
  completed: boolean;
}
