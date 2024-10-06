import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  navLinks: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  drawerList: {
    width: 250,
  },
});

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false); // For drawer (mobile menu)
  const classes = useStyles();

  // Toggle drawer for mobile
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      {/* AppBar fixed at the top */}
      <AppBar position="fixed" sx={{ paddingBottom: '0px' }}> 
        <Toolbar>
          {/* Menu Icon for Mobile */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuIcon />
          </IconButton>

          {/* Navbar Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>

          {/* Nav Links for Larger Screens */}
          <div className={classes.navLinks}>
            <Button component={Link} to="/chat" color="inherit">
              Chat <ChatIcon sx={{ ml: 1 }} />
            </Button>
            <Button component={Link} to="/calendar" color="inherit">
              Status <CalendarTodayIcon sx={{ ml: 1 }} />
            </Button>
            <Button component={Link} to="/preferences" color="inherit">
              Preferences <SettingsIcon sx={{ ml: 1 }} />
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* This empty Toolbar ensures content starts below the AppBar */}
      <Toolbar />

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          className={classes.drawerList}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to="/chat">
              <ChatIcon sx={{ mr: 1 }} />
              <ListItemText primary="Chat" />
            </ListItem>
            <ListItem button component={Link} to="/calendar">
              <CalendarTodayIcon sx={{ mr: 1 }} />
              <ListItemText primary="Status" />
            </ListItem>
            <ListItem button component={Link} to="/preferences">
              <SettingsIcon sx={{ mr: 1 }} />
              <ListItemText primary="Preferences" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      {/* Content section */}
      <Box sx={{ padding: '10px' }}>
      </Box>
    </>
  );
}

export default Navbar;
