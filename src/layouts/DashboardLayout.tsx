import { useAppSelector } from "@hooks/useRedux";
import { Box, Paper, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    id: 1,
    name: "Profile",
    url: "/dashboard",
    admin: false,
  },
  {
    id: 2,
    name: "My Bookings",
    url: "/dashboard/my-bookings",
    admin: false,
  },
  {
    id: 3,
    name: "My Custom Bookings",
    url: "/dashboard/my-custom-bookings",
    admin: false,
  },
  {
    id: 4,
    name: "Packages",
    url: "/dashboard/manage-packages",
    admin: true,
  },
  {
    id: 5,
    name: "Guides",
    url: "/dashboard/manage-guides",
    admin: true,
  },
  {
    id: 6,
    name: "Bookings",
    url: "/dashboard/manage-bookings",
    admin: true,
  },
  {
    id: 7,
    name: "Custom Bookings",
    url: "/dashboard/manage-custom-bookings",
    admin: true,
  },
];

function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.auth);

  return (
    <Box
      marginY={10}
      maxWidth={1920}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          md: "1fr",
          lg: "200px auto",
        },
        gap: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { md: "row", lg: "column" },
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {navItems.map((item) => {
          if (item.admin && userInfo?.role !== "admin") {
            return null;
          }

          return (
            <Paper key={item.id} sx={{ overflow: "hidden" }}>
              <Box
                sx={{
                  padding: "1rem",
                  backgroundColor: item.url === pathname ? "primary.light" : "",
                  color: item.url === pathname ? "white" : "",
                  cursor: "pointer",
                }}
                role="button"
                onClick={() => navigate(item.url)}
              >
                <Typography variant="h6">{item.name}</Typography>
              </Box>
            </Paper>
          );
        })}
      </Box>

      <Box paddingX={2} paddingY={3}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
