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
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

const CustomListItem = ({ to, primary, icon: Icon, onClick }) => (
  <ListItem component={Link} to={to} onClick={onClick}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={primary} />
  </ListItem>
);

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
              <Button color="inherit" component={Link} to="/voice">
                Voice Note
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
            <CustomListItem
              to="/"
              primary="Home"
              icon={HomeIcon}
              onClick={toggleDrawer(false)}
            />
            <CustomListItem
              to="/dashboard"
              primary="Dashboard"
              icon={DashboardIcon}
              onClick={toggleDrawer(false)}
            />
            <CustomListItem
              to="/updates"
              primary="Updates"
              icon={NotificationsActiveIcon}
              onClick={toggleDrawer(false)}
            />
            <CustomListItem
              to="/voice"
              primary="Voice Note"
              icon={RecordVoiceOverIcon}
              onClick={toggleDrawer(false)}
            />
            <CustomListItem
              to="/about"
              primary="About Us"
              icon={EmojiEmotionsIcon}
              onClick={toggleDrawer(false)}
            />
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
