import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, Container } from '@mui/material';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function AdminPanel() {
    const navigate = useNavigate();

    return (
        <>
        
            <Box sx={{ bgcolor: '#e8f5e9', minHeight: '100vh', py: 5 }}> {/* Light green background */}
                <Container maxWidth="md">
                    <Typography variant="h4" align="center" gutterBottom color="success.main" fontWeight="bold">
                        Admin Panel
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, border: '2px solid #388e3c' }}> {/* Green border */}
                            <CardActionArea onClick={() => navigate('/inventoryPanel')}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image="https://firebasestorage.googleapis.com/v0/b/inspiretech2024.appspot.com/o/assets%2Fhome-inventory-panel.png?alt=media&token=b2436f55-3ea4-42e6-a1ab-8d28104fa4a3"
                                    alt="Inventory Panel"
                                />
                                <CardContent>
                                    <Typography variant="h6" align="center" color="success.dark">
                                        Inventory Control Panel
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
}

export default AdminPanel;
