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
    const [successMessage, setSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCrop(form);
            setSuccessMessage(true);
            setTimeout(() => {
                navigate('/crop-details', { state: { crop: form } });
            }, 3000);
        } catch (error) {
            console.error('Error adding crop:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={6} sx={{ padding: 4, width: '100%', background: 'linear-gradient(135deg, #4caf50, #fff)', borderRadius: 2 }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
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
                                InputProps={{
                                    startAdornment: (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <CropIcon sx={{ marginRight: 1, backgroundColor: '#4caf50', color: '#fff', padding: 0.5, borderRadius: '50%' }} />
                                        </motion.div>
                                    )
                                }}
                                sx={{ input: { color: '#fff' } }}
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
                                sx={{ minWidth: 200, input: { color: '#fff' } }}
                                InputProps={{
                                    startAdornment: (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <CropIcon sx={{ marginRight: 1, backgroundColor: '#4caf50', color: '#fff', padding: 0.5, borderRadius: '50%' }} />
                                        </motion.div>
                                    )
                                }}
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
                                required
                                InputProps={{
                                    startAdornment: (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <WateringIcon sx={{ marginRight: 1, backgroundColor: '#4caf50', color: '#fff', padding: 0.5, borderRadius: '50%' }} />
                                        </motion.div>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="yieldPerAcre"
                                label="Yield Per Acre"
                                value={form.yieldPerAcre}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <FertilizerIcon sx={{ marginRight: 1, backgroundColor: '#4caf50', color: '#fff', padding: 0.5, borderRadius: '50%' }} />
                                        </motion.div>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="soilType"
                                label="Soil Type"
                                value={form.soilType}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <WateringIcon sx={{ marginRight: 1, backgroundColor: '#4caf50', color: '#fff', padding: 0.5, borderRadius: '50%' }} />
                                        </motion.div>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="fertilizerSchedule"
                                label="Fertilizer Schedule"
                                value={form.fertilizerSchedule}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <FertilizerIcon sx={{ marginRight: 1, backgroundColor: '#4caf50', color: '#fff', padding: 0.5, borderRadius: '50%' }} />
                                        </motion.div>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="fertilizerType"
                                label="Fertilizer Type"
                                value={form.fertilizerType}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <FertilizerIcon sx={{ marginRight: 1, backgroundColor: '#4caf50', color: '#fff', padding: 0.5, borderRadius: '50%' }} />
                                        </motion.div>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="wateringSchedule"
                                label="Watering Schedule"
                                value={form.wateringSchedule}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <WateringIcon sx={{ marginRight: 1, backgroundColor: '#4caf50', color: '#fff', padding: 0.5, borderRadius: '50%' }} />
                                        </motion.div>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="pestControl"
                                label="Pest Control"
                                value={form.pestControl}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <PestControlIcon sx={{ marginRight: 1, backgroundColor: '#4caf50', color: '#fff', padding: 0.5, borderRadius: '50%' }} />
                                        </motion.div>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="weatherDependency"
                                label="Weather Dependency"
                                value={form.weatherDependency}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <WateringIcon sx={{ marginRight: 1, backgroundColor: '#4caf50', color: '#fff', padding: 0.5, borderRadius: '50%' }} />
                                        </motion.div>
                                    )
                                }}
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
            <Snackbar open={successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(false)}>
                <Alert severity="success">Crop added successfully!</Alert>
            </Snackbar>
        </Container>
    );
};

export default AddCrop;
