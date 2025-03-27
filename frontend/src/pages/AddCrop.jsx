import React, { useState } from 'react';
import { addCrop } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Grid, Snackbar, Alert } from '@mui/material';

const AddCrop = () => {
    const [form, setForm] = useState({
        name: '', type: '', season: '', yieldPerAcre: '', weatherDependency: '',
        pestControl: '', fertilizerSchedule: '', fertilizerType: '', wateringSchedule: '',
        soilType: '', expectedHarvestDate: '', plantingDate: ''
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
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>Add Crop</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {Object.keys(form).map((key) => (
                            <Grid item xs={12} sm={key.includes('Date') ? 12 : 6} key={key}>
                                <TextField
                                    fullWidth
                                    name={key}
                                    label={key.replace(/([A-Z])/g, ' $1').trim()}
                                    type={key.includes('Date') ? 'date' : 'text'}
                                    value={form[key]}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={key.includes('Date') ? { shrink: true } : {}}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ marginTop: 2 }}
                    >
                        Add Crop
                    </Button>
                </form>
            </Paper>
            <Snackbar open={successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(false)}>
                <Alert severity="success">Crop added successfully!</Alert>
            </Snackbar>
        </Container>
    );
};

export default AddCrop;
