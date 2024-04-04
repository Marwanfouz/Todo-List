import NewTodoForm from '@/components/NewTodoForm';
import { Box } from '@mui/material';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <NewTodoForm />
      </Box>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
