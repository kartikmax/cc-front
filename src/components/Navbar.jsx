import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (isOpen) => () => {
    setIsDrawerOpen(isOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobileView && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!isMobileView && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My App
            </Typography>
          )}
          {!isMobileView && (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/updates">
                Updates
              </Button>
              <Button color="inherit" component={Link} to="/about">
                About Us
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {isMobileView && (
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <List>
            <ListItem component={Link} to="/" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              component={Link}
              to="/dashboard"
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              component={Link}
              to="/updates"
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Updates" />
            </ListItem>
            <ListItem component={Link} to="/about" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
