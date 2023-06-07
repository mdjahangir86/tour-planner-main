import { Box, CircularProgress, Typography } from '@mui/material';

function FallBackSpinner() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box sx={{ display: 'grid', placeItems: 'center' }}>
        <CircularProgress color="primary" />
        <Typography component="h4" variant="h4" mt={2}>
          Loading
        </Typography>
      </Box>
    </Box>
  );
}

export default FallBackSpinner;
