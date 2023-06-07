import { useAuth } from '@hooks/useAuth';
import { Box, Typography } from '@mui/material';

function Profile() {
  const { user } = useAuth();

  return (
    <Box textAlign="center">
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Profile Page
      </Typography>
      <Typography variant="h6" gutterBottom>
        Email: {user?.email}
      </Typography>
    </Box>
  );
}

export default Profile;
