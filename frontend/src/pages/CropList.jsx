import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Grid, Button, CircularProgress, Alert } from '@mui/material';
import { getCrops } from '../services/api';  // ✅ Corrected function name
import Header from '../components/Header';
import Footer from '../components/Footer';

const CropList = () => {
    const navigate = useNavigate();
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const response = await getCrops();  // ✅ Corrected function call
                if (!response || !response.data) {
                    throw new Error("Invalid API response");
                }
                setCrops(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching crops:", err);
                setError("Unable to fetch crops. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchCrops();
    }, []);

    // Function to generate a CSV report
    const handleGenerateCSV = () => {
        const header = [
            'Name', 'Type', 'Season', 'Yield per Acre', 'Weather Dependency', 
            'Pest Control', 'Fertilizer Schedule', 'Fertilizer Type', 
            'Watering Schedule', 'Soil Type', 'Planting Date', 'Expected Harvest Date'
        ];

        // Mapping the crops data to rows
        const rows = crops.map((crop) => [
            crop.name, 
            crop.type, 
            crop.season, 
            crop.yieldPerAcre, 
            crop.weatherDependency || 'N/A',
            crop.pestControl || 'N/A', 
            crop.fertilizerSchedule || 'N/A', 
            crop.fertilizerType || 'N/A', 
            crop.wateringSchedule || 'N/A', 
            crop.soilType || 'N/A', 
            crop.plantingDate ? new Date(crop.plantingDate).toLocaleDateString() : 'N/A', 
            crop.expectedHarvestDate ? new Date(crop.expectedHarvestDate).toLocaleDateString() : 'N/A'
        ]);

        // Converting to CSV format
        const csvContent = [
            header.join(','), // Adding header row
            ...rows.map(row => row.join(','))  // Adding data rows
        ].join('\n');

        // Creating a Blob and downloading the file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Crop_Report.csv';  // Filename for the CSV
        link.click();
    };

    if (loading) {
        return (
            <Container sx={{ textAlign: 'center', marginTop: 4 }}>
                <CircularProgress />
                <Typography>Loading crops...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ textAlign: 'center', marginTop: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <>
            <Header />
            <Container maxWidth="md" sx={{ marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    My Crops
                </Typography>
                
                <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
                    <Grid container spacing={3}>
                        {crops.length > 0 ? (
                            crops.map((crop) => (
                                <Grid item xs={12} sm={6} md={4} key={crop._id}>
                                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                                        <Typography variant="h6">{crop.name}</Typography>
                                        
                                        <Button
                                            variant="contained"
                                            color="success"  // Green button
                                            sx={{ marginTop: 2 }}
                                            onClick={() => navigate(`/crop/${crop._id}`)}
                                        >
                                            View Details
                                        </Button>
                                    </Paper>
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Typography variant="body1">No crops found.</Typography>
                            </Grid>
                        )}
                    </Grid>
                </Paper>

                {/* Add Crop & Generate CSV Buttons */}
                <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="success"  // Green button
                            onClick={() => navigate('/add-crop')}
                        >
                            Add New Crop
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="success"  // Green button
                            onClick={handleGenerateCSV}
                        >
                            Generate Report
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default CropList;
