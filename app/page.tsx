import { Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        height: '90vh',
        flexWrap: 'wrap',
      }}
    >
      <Link href={'/todos'}>
        <Button
          size="large"
          variant="contained"
          sx={{ height: 150, width: 300, fontSize: 30 }}
        >
          Getstarted
        </Button>
      </Link>
    </Box>
  );
}
