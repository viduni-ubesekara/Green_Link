import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Grid, Snackbar, Alert } from '@mui/material';
import { addCrop } from '../services/api';
import { motion } from 'framer-motion';
import CropIcon from '@mui/icons-material/Grain';

const AddCrop = () => {
    const [form, setForm] = useState({
        name: '',
        phone: '', 
        type: '',
        season: '',
        yieldPerAcre: '',
        weatherDependency: '',
        pestControl: '',
        fertilizerSchedule: '',
        fertilizerType: '',
        wateringSchedule: '',
        soilType: '',
        plantingDate: '',
        expectedHarvestDate: '',
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
        
        // Crop validation
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
        if (form.yieldPerAcre && isNaN(form.yieldPerAcre)) {
            errors.yieldPerAcre = 'Yield per Acre must be a valid number';
        }

        // Phone validation: Only 10 digits and numbers
        const phoneRegex = /^[0-9]{10}$/;
        if (!form.phone) errors.phone = 'Phone number is required';
        else if (!phoneRegex.test(form.phone)) errors.phone = 'Phone number must be exactly 10 digits and contain only numbers';

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
        <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={6} sx={{ padding: 4, width: '100%', borderRadius: 2 }}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                        <CropIcon sx={{ marginRight: 1, backgroundColor: '#4caf50', color: '#fff', padding: 0.5, borderRadius: '50%' }} />
                        Add Crop
                    </Typography>
                </motion.div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {Object.keys(form).map((key) => (
                            <Grid item xs={12} key={key}>
                                <TextField
                                    fullWidth
                                    type={key.includes('Date') ? 'date' : key === 'phone' ? 'tel' : 'text'}
                                    name={key}
                                    label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                    value={form[key]}
                                    onChange={handleChange}
                                    InputLabelProps={key.includes('Date') ? { shrink: true } : {}}
                                    error={!!errorMessages[key]}
                                    helperText={key === 'phone' ? 'Phone number is required for sending reminders.' : errorMessages[key] || ''}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button type="submit" variant="contained" color="success" fullWidth sx={{ marginTop: 3, fontWeight: 'bold' }}>
                            Add Crop
                        </Button>
                    </motion.div>
                </form>
            </Paper>
            <Snackbar open={successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(false)}>
                <Alert severity="success">Crop added successfully!</Alert>
            </Snackbar>
        </Container>
    );
};

export default AddCrop;
