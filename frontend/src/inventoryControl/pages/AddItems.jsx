import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, MenuItem, Alert, Paper } from '@mui/material';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import SlideBar from '../Components/SlideBar';

function AddItems() {
  const [itemImage, setItemImage] = useState(null);
  const [itemID, setItemID] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemBrand, setItemBrand] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [category, setCategory] = useState('');
  const [warranty, setWarranty] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const validateForm = () => {
    if (!itemID || itemID.length < 3) return "Item ID must be at least 3 characters.";
    if (!itemName || itemName.length < 3) return "Item Name must be at least 3 characters.";
    if (!itemBrand) return "Item Brand is required.";
    if (!itemPrice || itemPrice <= 0) return "Item Price must be a positive number.";
    if (!stockCount || stockCount <= 0) return "Stock Count must be a positive number.";
    if (!category) return "Category is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const imgURL = await imageUpload();
    const newItem = { itemID, itemName, itemBrand, itemPrice, stockCount, category, warranty, itemDescription, imgURL };
    const response = await fetch('/inventoryPanel/addItems', {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const json = await response.json();
      setError(json.error);
    } else {
      setSuccessMsg("Item added successfully!");
      resetForm();
    }
  };

  const handleImageCheck = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (file && allowedTypes.includes(file.type)) {
      setItemImage(file);
    } else {
      alert('Please upload a valid JPEG or PNG image file!');
    }
  };

  const imageUpload = async () => {
    if (!itemImage) return '';
    const imageRef = ref(storage, `images/${itemImage.name + v4()}`);
    try {
      await uploadBytes(imageRef, itemImage);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error('Error uploading image:', error);
      return '';
    }
  };

  const resetForm = () => {
    setItemImage(null);
    setItemID('');
    setItemName('');
    setItemBrand('');
    setItemPrice('');
    setStockCount('');
    setCategory('');
    setWarranty('');
    setItemDescription('');
    setError(null);
    setSuccessMsg(null);
  };

  return (
    <>
      <SlideBar />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" align="center" color="success.main" gutterBottom>
            Add an Item
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            (*) Required fields
          </Typography>

          {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
          {successMsg && <Alert severity="success" sx={{ my: 2 }}>{successMsg}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Button variant="contained" component="label" sx={{ bgcolor: 'success.main', color: 'white', mb: 2, borderRadius: 2 }}>
              Upload Image
              <input type="file" hidden onChange={handleImageCheck} />
            </Button>

            <TextField fullWidth label="Item ID *" value={itemID} onChange={(e) => setItemID(e.target.value)} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Item Name *" value={itemName} onChange={(e) => setItemName(e.target.value)} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Item Brand *" value={itemBrand} onChange={(e) => setItemBrand(e.target.value)} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Item Price *" type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Stock Count *" type="number" value={stockCount} onChange={(e) => setStockCount(e.target.value)} required sx={{ mb: 2 }} />
            <TextField select fullWidth label="Category *" value={category} onChange={(e) => setCategory(e.target.value)} required sx={{ mb: 2 }}>
              <MenuItem value="smartphone">Smartphone</MenuItem>
              <MenuItem value="smartwatch">Smart Watch</MenuItem>
            </TextField>
            <TextField fullWidth label="Item Description" multiline rows={3} value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} sx={{ mb: 3 }} />

            <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: 'success.main', color: 'white', borderRadius: 2 }}>
              Add Item
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default AddItems;
