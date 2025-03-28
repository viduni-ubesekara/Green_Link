import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Grid, MenuItem, Snackbar, Alert } from '@mui/material';
import { addCrop } from '../services/api';
import { motion } from 'framer-motion';
import CropIcon from '@mui/icons-material/Grain';
import WateringIcon from '@mui/icons-material/LocalDrink';
import FertilizerIcon from '@mui/icons-material/Grass';
import PestControlIcon from '@mui/icons-material/PestControl';

const cropTypes = ['Vegetable', 'Fruit', 'Grain'];

const AddCrop = () => {
    const [form, setForm] = useState({
        name: '',
        type: '',
        season: '',
        yieldPerAcre: '',
        weatherDependency: '',
        pestControl: '',
        fertilizerSchedule: '',
        fertilizerType: '',
        wateringSchedule: '',
        soilType: '',
        expectedHarvestDate: '',
        plantingDate: ''
    });
    const [errorMessages, setErrorMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const errors = {};
        const plantingDate = new Date(form.plantingDate);
        const expectedHarvestDate = new Date(form.expectedHarvestDate);

        if (!form.name) errors.name = 'Crop Name is required';
        if (!form.type) errors.type = 'Crop Type is required';
        if (!form.season) errors.season = 'Season is required';
        if (!form.soilType) errors.soilType = 'Soil Type is required';
        if (!form.fertilizerSchedule) errors.fertilizerSchedule = 'Fertilizer Schedule is required';
        if (!form.fertilizerType) errors.fertilizerType = 'Fertilizer Type is required';
        if (!form.wateringSchedule) errors.wateringSchedule = 'Watering Schedule is required';
        if (!form.pestControl) errors.pestControl = 'Pest Control information is required';
        if (!form.weatherDependency) errors.weatherDependency = 'Weather Dependency is required';
        if (!form.plantingDate) errors.plantingDate = 'Planting Date is required';
        if (!form.expectedHarvestDate) errors.expectedHarvestDate = 'Expected Harvest Date is required';

        if (expectedHarvestDate <= plantingDate) {
            errors.expectedHarvestDate = 'Expected Harvest Date must be after the Planting Date';
        }

        // Only validate Yield Per Acre if it is empty
        if (form.yieldPerAcre && isNaN(form.yieldPerAcre)) {
            errors.yieldPerAcre = 'Yield per Acre must be a valid number';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            return;
        }

        try {
            await addCrop(form);
            setSuccessMessage(true);
            setTimeout(() => {
                navigate('/', { state: { crop: form } });
            }, 3000);
        } catch (error) {
            console.error('Error adding crop:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={6} sx={{ padding: 4, width: '100%', background: 'linear-gradient( #fff)', borderRadius: 2 }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Typography variant="h4" align="center" gutterBottom sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                        <CropIcon sx={{ marginRight: 1, backgroundColor: '#4caf50', color: '#fff', padding: 0.5, borderRadius: '50%' }} />
                        Add Crop
                    </Typography>
                </motion.div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Crop Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                error={!!errorMessages.name}
                                helperText={errorMessages.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                name="type"
                                label="Crop Type"
                                value={form.type}
                                onChange={handleChange}
                                required
                                error={!!errorMessages.type}
                                helperText={errorMessages.type}
                            >
                                {cropTypes.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="season"
                                label="Season"
                                value={form.season}
                                onChange={handleChange}
                                error={!!errorMessages.season}
                                helperText={errorMessages.season}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="yieldPerAcre"
                                label="Yield Per Acre"
                                value={form.yieldPerAcre}
                                onChange={handleChange}
                                error={!!errorMessages.yieldPerAcre}
                                helperText={errorMessages.yieldPerAcre}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="soilType"
                                label="Soil Type"
                                value={form.soilType}
                                onChange={handleChange}
                                error={!!errorMessages.soilType}
                                helperText={errorMessages.soilType}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="fertilizerSchedule"
                                label="Fertilizer Schedule"
                                value={form.fertilizerSchedule}
                                onChange={handleChange}
                                error={!!errorMessages.fertilizerSchedule}
                                helperText={errorMessages.fertilizerSchedule}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="fertilizerType"
                                label="Fertilizer Type"
                                value={form.fertilizerType}
                                onChange={handleChange}
                                error={!!errorMessages.fertilizerType}
                                helperText={errorMessages.fertilizerType}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="wateringSchedule"
                                label="Watering Schedule"
                                value={form.wateringSchedule}
                                onChange={handleChange}
                                error={!!errorMessages.wateringSchedule}
                                helperText={errorMessages.wateringSchedule}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="pestControl"
                                label="Pest Control"
                                value={form.pestControl}
                                onChange={handleChange}
                                error={!!errorMessages.pestControl}
                                helperText={errorMessages.pestControl}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="weatherDependency"
                                label="Weather Dependency"
                                value={form.weatherDependency}
                                onChange={handleChange}
                                error={!!errorMessages.weatherDependency}
                                helperText={errorMessages.weatherDependency}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="date"
                                name="plantingDate"
                                label="Planting Date"
                                value={form.plantingDate}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                error={!!errorMessages.plantingDate}
                                helperText={errorMessages.plantingDate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="date"
                                name="expectedHarvestDate"
                                label="Expected Harvest Date"
                                value={form.expectedHarvestDate}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                error={!!errorMessages.expectedHarvestDate}
                                helperText={errorMessages.expectedHarvestDate}
                            />
                        </Grid>
                    </Grid>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="success" 
                            fullWidth 
                            sx={{ marginTop: 3, fontWeight: 'bold' }}
                        >
                            Add Crop
                        </Button>
                    </motion.div>
                </form>
            </Paper>

            {/* Success Snackbar */}
            <Snackbar open={successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(false)}>
                <Alert severity="success">Crop added successfully!</Alert>
            </Snackbar>
        </Container>
    );
};

export default AddCrop;
