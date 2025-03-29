import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText, Typography, Box } from '@mui/material';

function SlideBar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 250, bgcolor: 'success.main', color: 'white' },
      }}
    >
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Inventory Control Panel
        </Typography>
      </Box>

      <List>
        <ListItemButton
          component={Link}
          to="/inventoryPanel"
          selected={location.pathname === '/inventoryPanel'}
          sx={{
            color: 'white',
            bgcolor: location.pathname === '/inventoryPanel' ? 'success.dark' : 'inherit',
            '&:hover': { bgcolor: 'success.light' },
          }}
        >
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/inventoryPanel/addItems"
          selected={location.pathname === '/inventoryPanel/addItems'}
          sx={{
            color: 'white',
            bgcolor: location.pathname === '/inventoryPanel/addItems' ? 'success.dark' : 'inherit',
            '&:hover': { bgcolor: 'success.light' },
          }}
        >
          <ListItemText primary="Add Items" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default SlideBar;
