import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <Box component="footer" sx={{ backgroundColor: "primary.main" }}>
        <Container style={{ width: "90%" }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="white" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="white">
                We are a Tourism Agency company, dedicated to providing the best
                service to our customers.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="white" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" color="white">
                Dhaka, Bangladesh
              </Typography>
              <Typography variant="body2" color="white">
                Email: Mdjahangirshikder3@gmail.com
              </Typography>
              <Typography variant="body2" color="white">
                Phone: +880 1793593581
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" flexDirection="column">
                <Typography variant="h6" color="white" gutterBottom>
                  Links
                </Typography>
                <Link to="/dashboard" style={{ color: "white" }}>
                  Profile
                </Link>
                <Link to="/guides" style={{ color: "white" }}>
                  Guides
                </Link>
                <Link to="/packages" style={{ color: "white" }}>
                  Packages
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Box
          sx={{
            padding: 3,
            textAlign: "center",
            color: "#fafafa",
          }}
        >
          <Typography component="p">{`© ${new Date().getFullYear()}. All Rights Reserved.`}</Typography>
        </Box>
      </Box>
    </>
  );
}
