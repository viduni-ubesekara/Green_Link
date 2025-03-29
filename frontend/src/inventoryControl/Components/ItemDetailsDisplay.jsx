import React from 'react';
import { Box, Button, Typography, Link, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

function ItemDetailsDisplay({ item }) {
  
  const navigate = useNavigate(); // Initialize navigate function

  // Delete an item from the list and database
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      fetch('/inventoryPanel/' + item.itemID, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.location.reload(); // Reload the page after deleting the item (though not recommended)
        });
    }
  };

  return (
    <Box component={Paper} elevation={3} sx={{ p: 3, mb: 3 }}>
      <Stack direction="row" spacing={3}>
        <Box sx={{ flexShrink: 0 }}>
          <img
            src={item.imgURL}
            alt={item.itemName}
            style={{ width: 200, height: 200, objectFit: 'cover' }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Item ID: {item.itemID}
          </Typography>
          <Typography variant="body1" paragraph>
            Name: {item.itemName}
          </Typography>
          <Typography variant="body1" paragraph>
            Brand: {item.itemBrand}
          </Typography>
          <Typography variant="body1" paragraph>
            Price: Rs.{item.itemPrice}
          </Typography>
          <Typography variant="body1" paragraph>
            Available Stocks: {item.stockCount}
          </Typography>
          <Typography variant="body1" paragraph>
            Added Date: {item.createdAt}
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            {/* Edit Button styled like Remove Button */}
            <Button
              color="success"
              variant="contained"
              size="small"
              sx={{
                borderRadius: 1,
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: 'green.600',
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out',
                },
                '&:active': {
                  backgroundColor: 'green.700',
                  transform: 'scale(0.98)',
                },
              }}
              onClick={() => navigate(`/inventoryPanel/item/${item.itemID}`)} // Navigate to edit page
            >
              Edit
            </Button>

            {/* Remove Button */}
            <Button
              color="error"
              variant="contained"
              size="small"
              sx={{
                borderRadius: 1,
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: 'red.600',
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out',
                },
                '&:active': {
                  backgroundColor: 'red.700',
                  transform: 'scale(0.98)',
                },
              }}
              onClick={handleDelete}
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default ItemDetailsDisplay;
