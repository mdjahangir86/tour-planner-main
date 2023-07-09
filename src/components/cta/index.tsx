import RouterLink from "@components/router-link";
import { Box, Button, Paper, Typography } from "@mui/material";

function CallToAction() {
  return (
    <>
      <Paper
        component="section"
        sx={{
          height: { sm: 200, md: 150 },
          px: 4,
          py: 3,
          bgcolor: "secondary.main",
          color: "white",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box display="flex" justifyContent="center" gap={10} flexWrap="wrap">
          <Typography variant="h4">
            Planning For a Tour? We are Here!!
          </Typography>
          <RouterLink to="/">
            <Button variant="contained" color="info">
              Let&apos;s Make a Plan
            </Button>
          </RouterLink>
        </Box>
      </Paper>
    </>
  );
}

export default CallToAction;
