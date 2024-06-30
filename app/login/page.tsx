import { Box } from '@mui/material';
import FormSignIn from './FormLogIn';

const SignInPage = () => {
  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', m: 3, flexDirection: 'column'}}>
      <FormSignIn />
    </Box>
  );
}

export default SignInPage
