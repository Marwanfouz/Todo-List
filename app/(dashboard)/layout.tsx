import NewTodoForm from '@/components/NewTodoForm';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>dashboard</div>
      <div>
        <NewTodoForm />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
