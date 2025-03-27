import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getCropById, deleteCrop } from '../services/api';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import html2pdf from 'html2pdf.js';

import Header from '../components/Header';
import Footer from '../components/Footer';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const CropDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [crop, setCrop] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCrop = async () => {
            try {
                const response = await getCropById(id);
                setCrop(response.data);
                setError(null);
            } catch (err) {
                setError('Unable to fetch crop details. Please try again later.');
            }
        };
        loadCrop();
    }, [id]);

    if (error) return <div>{error}</div>;
    if (!crop) return <div>Loading...</div>;

    const calculateGrowthStatus = (plantingDate, harvestingDate) => {
        const now = new Date();
        const planting = new Date(plantingDate);
        const harvesting = new Date(harvestingDate);
        const totalGrowthTime = harvesting - planting;
        const elapsedTime = now - planting;
        const growthPercentage = Math.min((elapsedTime / totalGrowthTime) * 100, 100);

        if (now < planting) {
            return { status: 'Not Planted', progress: 0 };
        } else if (now >= planting && now <= harvesting) {
            return { status: 'Growing', progress: growthPercentage };
        } else {
            return { status: 'Harvested', progress: 100 };
        }
    };

    const { status, progress } = calculateGrowthStatus(crop.plantingDate, crop.expectedHarvestDate);

    const pieChartData = {
        labels: ['Growth Progress', 'Remaining Time'],
        datasets: [
            {
                data: [progress, 100 - progress],
                backgroundColor: ['#4caf50', '#e0e0e0'],
                borderColor: ['#4caf50', '#e0e0e0'],
                borderWidth: 1,
            },
        ],
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this crop?');
        if (confirmDelete) {
            try {
                await deleteCrop(id);
                navigate('/');
            } catch (err) {
                console.error('Error deleting crop:', err);
            }
        }
    };

    const handleGenerateReport = () => {
        const element = document.getElementById('crop-details-no-buttons');
        const options = {
            filename: `${crop.name}-report.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
        html2pdf().from(element).set(options).save();
    };

    return (
        <>
            <Header />

            <Container maxWidth="lg" sx={{ padding: 0 }}>
                <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }} id="crop-details-no-buttons">
                    <Typography variant="h5" gutterBottom>Crop Details</Typography>

                    {/* Crop Details Table */}
                    <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Detail</strong></TableCell>
                                    <TableCell><strong>Information</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Crop Name</strong></TableCell>
                                    <TableCell>{crop.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Type</strong></TableCell>
                                    <TableCell>{crop.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Season</strong></TableCell>
                                    <TableCell>{crop.season}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Yield per Acre</strong></TableCell>
                                    <TableCell>{crop.yieldPerAcre}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Weather Dependency</strong></TableCell>
                                    <TableCell>{crop.weatherDependency || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Pest Control</strong></TableCell>
                                    <TableCell>{crop.pestControl || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Fertilizer Schedule</strong></TableCell>
                                    <TableCell>{crop.fertilizerSchedule || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Fertilizer Type</strong></TableCell>
                                    <TableCell>{crop.fertilizerType || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Watering Schedule</strong></TableCell>
                                    <TableCell>{crop.wateringSchedule || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Soil Type</strong></TableCell>
                                    <TableCell>{crop.soilType || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Expected Harvest Date</strong></TableCell>
                                    <TableCell>{crop.expectedHarvestDate ? new Date(crop.expectedHarvestDate).toLocaleDateString() : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Planting Date</strong></TableCell>
                                    <TableCell>{crop.plantingDate ? new Date(crop.plantingDate).toLocaleDateString() : 'N/A'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Paper elevation={2} sx={{ padding: 2, marginTop: 4 }}>
                        <Typography variant="h6" gutterBottom>Growth Status</Typography>
                        <Typography variant="body1" gutterBottom>Status: {status}</Typography>
                        
                        {/* Fixed Pie Chart */}
                        <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
                            <Pie data={pieChartData} />
                        </div>
                    </Paper>

                    <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="success" 
                                onClick={handleGenerateReport}
                                sx={{
                                    backgroundColor: '#388e3c', // Dark Green
                                    '&:hover': {
                                        backgroundColor: '#2e7d32', // Darker Green on hover
                                    },
                                }}
                            >
                                Generate Report
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="success" 
                                onClick={handleDelete}
                                sx={{
                                    backgroundColor: '#66bb6a', // Medium Green
                                    '&:hover': {
                                        backgroundColor: '#4caf50', // Standard Green on hover
                                    },
                                }}
                            >
                                Delete Crop
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="success" 
                                onClick={() => navigate(`/edit-crop/${id}`)}
                                sx={{
                                    backgroundColor: '#81c784', // Light Green
                                    '&:hover': {
                                        backgroundColor: '#66bb6a', // Medium Green on hover
                                    },
                                }}
                            >
                                Edit Crop
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>

            <Footer />
        </>
    );
};

export default CropDetails;
