import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Grid, Button } from '@mui/material';
import { getCropById, deleteCrop } from '../services/api';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import html2pdf from 'html2pdf.js';

import Header from '../components/Header';
import Footer from '../components/Footer';

// Register Chart.js components
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

    const pieChartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    // Show percentage in tooltip
                    label: function (tooltipItem) {
                        const total = tooltipItem.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        const value = tooltipItem.raw;
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${tooltipItem.label}: ${percentage}%`;
                    },
                },
            },
            datalabels: {
                formatter: function (value, ctx) {
                    const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${percentage}%`; // Show percentage on slices
                },
                color: 'white',
                font: {
                    weight: 'bold',
                },
            },
        },
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

            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }} id="crop-details-no-buttons">
                    <Typography variant="h5" gutterBottom>My Crops</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Crop Name: {crop.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Type:</strong> {crop.type}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Season:</strong> {crop.season}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Yield per Acre:</strong> {crop.yieldPerAcre}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Weather Dependency:</strong> {crop.weatherDependency || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Pest Control:</strong> {crop.pestControl || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Fertilizer Schedule:</strong> {crop.fertilizerSchedule || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Fertilizer Type:</strong> {crop.fertilizerType || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Watering Schedule:</strong> {crop.wateringSchedule || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Soil Type:</strong> {crop.soilType || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Expected Harvest Date:</strong> {crop.expectedHarvestDate ? new Date(crop.expectedHarvestDate).toLocaleDateString() : 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Planting Date:</strong> {crop.plantingDate ? new Date(crop.plantingDate).toLocaleDateString() : 'N/A'}</Typography>
                        </Grid>
                    </Grid>

                    <Paper elevation={2} sx={{ padding: 2, marginTop: 4 }}>
                        <Typography variant="h6" gutterBottom>Growth Status</Typography>
                        <Typography variant="body1" gutterBottom>Status: {status}</Typography>
                        <Pie data={pieChartData} options={pieChartOptions} />
                    </Paper>

                    <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleGenerateReport}>
                                Generate Report
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={handleDelete}>
                                Delete Crop
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="warning" onClick={() => navigate(`/edit-crop/${id}`)}>
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
