import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
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
        sx={{ maxWidth: 900, textAlign: 'center' }}
      >
        Organize your work and life, finally.
      </Typography>
      <Link
        href={'/todos'}
        style={{ alignSelf: 'center', justifySelf: 'center' }}
      >
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
