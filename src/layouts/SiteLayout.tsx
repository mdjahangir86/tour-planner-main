import RouterLink from "@components/router-link";
import { auth, logOut } from "@config/firebase";
import { useAppDispatch } from "@hooks/useRedux";
import BackpackIcon from "@mui/icons-material/Backpack";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { resetAuth } from "@store/user/authSlice";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

const drawerWidth = 240;
const navItems = [
  {
    id: 1,
    name: "Home",
    icon: <HomeIcon />,
    url: "/",
  },
  {
    id: 2,
    name: "Guides",
    icon: <PeopleIcon />,
    url: "/guides",
  },
  {
    id: 3,
    name: "Packages",
    icon: <BackpackIcon />,
    url: "/packages",
  },
];

export default function SiteLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src="/WanderWorldTourism.png" height="10px" alt="" />
      </Typography>

      <Divider />
      <List>
        {navItems.map(({ id, name, icon, url }) => (
          <RouterLink key={id} to={url}>
            <ListItem disablePadding>
              <ListItemButton>
                <Box component="span" marginRight={1}>
                  {icon}
                </Box>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          </RouterLink>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <RouterLink to="/">
                <Typography
                  variant="h6"
                  fontWeight={900}
                  sx={{
                    width: "fit-content",
                    padding: 2,
                    border: "1px solid transparent",
                    borderRadius: "4px",
                    transition: "border-color 0.3s ease",
                    "&:hover": {
                      borderColor: "#fff",
                    },
                  }}
                >
                  <img src="/WanderWorldTourism.png" height="40px" alt="" />
                </Typography>
              </RouterLink>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map(({ id, name, icon, url }) => (
                <RouterLink key={id} to={url}>
                  <Button
                    startIcon={icon}
                    sx={{
                      color: "#fafafa",
                      padding: "5px 16px",
                      "&, &:hover": {
                        borderColor: "#fafafa",
                      },
                    }}
                    variant={`${pathname === url ? "outlined" : "text"}`}
                  >
                    {name}
                  </Button>
                </RouterLink>
              ))}
            </Box>

            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={(event) => setAnchorElUser(event.currentTarget)}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      alt={user?.email || ""}
                      src={user?.photoURL || ""}
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <RouterLink to="/dashboard">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        logOut(auth).then(() => dispatch(resetAuth()));
                      }}
                    >
                      <Typography textAlign="center">Log out</Typography>
                    </MenuItem>
                  </RouterLink>
                </Menu>
              </Box>
            ) : (
              <RouterLink to="/login">
                <Button
                  startIcon={<LoginIcon />}
                  variant="outlined"
                  sx={{
                    color: "#fafafa",
                    border: "1px solid #fafafa",
                    "&:hover": {
                      border: "1px solid #fafafa",
                    },
                  }}
                >
                  Login
                </Button>
              </RouterLink>
            )}
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main">
          <Toolbar />
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </>
  );
}
