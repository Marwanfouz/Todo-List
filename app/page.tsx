'use client';
import { useAuth } from '@/context/auth';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const {user} = useAuth();
  return (
    <Box
      sx={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        height: '85vh',
        flexWrap: 'wrap',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h1"
        gutterBottom
        sx={{
          maxWidth: { xs: 200, sm: 300, md: 900 },
          fontSize: { xs: 20, sm: 50, md: 100 },
          textAlign: 'center',
        }}
      >
        Organize your work and life, finally.
      </Typography>
      <Link
        href={user? '/todos' : '/login'}
        style={{ alignSelf: 'center', justifySelf: 'center' }}
      >
        <Button
          size="large"
          variant="contained"
          sx={{
            height: { xs: 50, sm: 100, md: 150 },
            width: { xs: 200, sm: 300, md: 300 },
            fontSize: { xs: 20, sm: 40, md: 30 },
          }}
        >
          Getstarted
        </Button>
      </Link>
    </Box>
  );
}
