import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCropById, updateCrop } from '../services/api';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const EditCrop = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [crop, setCrop] = useState({
        name: '',
        type: '',
        season: '',
        yieldPerAcre: '',
        soilType: '',
        weatherDependency: '',
        pestControl: '',
        fertilizerSchedule: '',
        fertilizerType: '',
        wateringSchedule: '',
        plantingDate: '',
        expectedHarvestDate: ''
    });
    const [errorMessages, setErrorMessages] = useState({});
    const [error, setError] = useState(null);
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);  // State to manage the success dialog visibility

    useEffect(() => {
        const loadCrop = async () => {
            try {
                const res = await getCropById(id);
                setCrop(res.data);
            } catch (err) {
                console.error("Error fetching crop details:", err);
                setError('Unable to fetch crop details. Please try again later.');
            }
        };
        loadCrop();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCrop({ ...crop, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        const plantingDate = new Date(crop.plantingDate);
        const expectedHarvestDate = new Date(crop.expectedHarvestDate);

        if (!crop.name) errors.name = 'Crop Name is required';
        if (!crop.type) errors.type = 'Crop Type is required';
        if (!crop.season) errors.season = 'Season is required';
        if (!crop.soilType) errors.soilType = 'Soil Type is required';
        if (!crop.fertilizerSchedule) errors.fertilizerSchedule = 'Fertilizer Schedule is required';
        if (!crop.fertilizerType) errors.fertilizerType = 'Fertilizer Type is required';
        if (!crop.wateringSchedule) errors.wateringSchedule = 'Watering Schedule is required';
        if (!crop.pestControl) errors.pestControl = 'Pest Control information is required';
        if (!crop.weatherDependency) errors.weatherDependency = 'Weather Dependency is required';
        if (!crop.plantingDate) errors.plantingDate = 'Planting Date is required';
        if (!crop.expectedHarvestDate) errors.expectedHarvestDate = 'Expected Harvest Date is required';
        if (expectedHarvestDate <= plantingDate) errors.expectedHarvestDate = 'Expected Harvest Date must be after the Planting Date';

        if (crop.yieldPerAcre && isNaN(crop.yieldPerAcre)) {
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
            await updateCrop(id, crop);
            setOpenSuccessDialog(true);  // Open the success dialog
            setTimeout(() => {
                navigate(`/crop/${id}`);
            }, 2000);  // Redirect after 2 seconds
        } catch (err) {
            console.error("Error updating crop:", err);
            setError('Unable to update crop details. Please try again later.');
        }
    };

    const handleCloseDialog = () => {
        setOpenSuccessDialog(false);  // Close the dialog
    };

    if (error) return <div style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Edit Crop Details</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Crop Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={crop.name}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errorMessages.name && <div style={styles.errorText}>{errorMessages.name}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Crop Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={crop.type}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errorMessages.type && <div style={styles.errorText}>{errorMessages.type}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Season:</label>
                    <input
                        type="text"
                        name="season"
                        value={crop.season}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errorMessages.season && <div style={styles.errorText}>{errorMessages.season}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Yield per Acre:</label>
                    <input
                        type="number"
                        name="yieldPerAcre"
                        value={crop.yieldPerAcre}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errorMessages.yieldPerAcre && <div style={styles.errorText}>{errorMessages.yieldPerAcre}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Soil Type:</label>
                    <input
                        type="text"
                        name="soilType"
                        value={crop.soilType}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errorMessages.soilType && <div style={styles.errorText}>{errorMessages.soilType}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Weather Dependency:</label>
                    <input
                        type="text"
                        name="weatherDependency"
                        value={crop.weatherDependency || ''}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errorMessages.weatherDependency && <div style={styles.errorText}>{errorMessages.weatherDependency}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Pest Control:</label>
                    <input
                        type="text"
                        name="pestControl"
                        value={crop.pestControl || ''}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errorMessages.pestControl && <div style={styles.errorText}>{errorMessages.pestControl}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Fertilizer Schedule:</label>
                    <input
                        type="text"
                        name="fertilizerSchedule"
                        value={crop.fertilizerSchedule || ''}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errorMessages.fertilizerSchedule && <div style={styles.errorText}>{errorMessages.fertilizerSchedule}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Fertilizer Type:</label>
                    <input
                        type="text"
                        name="fertilizerType"
                        value={crop.fertilizerType || ''}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errorMessages.fertilizerType && <div style={styles.errorText}>{errorMessages.fertilizerType}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Watering Schedule:</label>
                    <input
                        type="text"
                        name="wateringSchedule"
                        value={crop.wateringSchedule || ''}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errorMessages.wateringSchedule && <div style={styles.errorText}>{errorMessages.wateringSchedule}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Planting Date:</label>
                    <input
                        type="date"
                        name="plantingDate"
                        value={crop.plantingDate ? crop.plantingDate.split('T')[0] : ''}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errorMessages.plantingDate && <div style={styles.errorText}>{errorMessages.plantingDate}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Expected Harvest Date:</label>
                    <input
                        type="date"
                        name="expectedHarvestDate"
                        value={crop.expectedHarvestDate ? crop.expectedHarvestDate.split('T')[0] : ''}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errorMessages.expectedHarvestDate && <div style={styles.errorText}>{errorMessages.expectedHarvestDate}</div>}
                </div>
                <button type="submit" style={styles.submitButton}>Update Crop</button>
            </form>

            {/* Success Dialog using MUI */}
            <Dialog open={openSuccessDialog} onClose={handleCloseDialog}>
                <DialogTitle>Success!</DialogTitle>
                <DialogContent>
                    <p>Crop details updated successfully.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const styles = {
    container: {
        padding: '30px',
        maxWidth: '900px',
        margin: '0 auto',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    heading: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '16px',
        color: '#555',
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginTop: '8px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    submitButton: {
        padding: '12px 25px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    errorText: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    },
};

export default EditCrop;
