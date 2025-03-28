import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCropById, updateCrop } from '../services/api';

const EditCrop = () => {
    const { id } = useParams(); // Get the ID from the URL
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
        expectedHarvestDate: '',
        plantingDate: ''
    });
    const [errorMessages, setErrorMessages] = useState({});
    const [error, setError] = useState(null);

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

        if (expectedHarvestDate <= plantingDate) {
            errors.expectedHarvestDate = 'Expected Harvest Date must be after the Planting Date';
        }

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
            await updateCrop(id, crop); // Update crop details
            navigate(`/crop/${id}`); // Redirect back to crop details page
        } catch (err) {
            console.error("Error updating crop:", err);
            setError('Unable to update crop details. Please try again later.');
        }
    };

    if (error) return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2>Edit Crop Details</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={crop.name}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errorMessages.name && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages.name}</div>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={crop.type}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errorMessages.type && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages.type}</div>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Season:</label>
                    <input
                        type="text"
                        name="season"
                        value={crop.season}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errorMessages.season && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages.season}</div>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Yield per Acre:</label>
                    <input
                        type="number"
                        name="yieldPerAcre"
                        value={crop.yieldPerAcre}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errorMessages.yieldPerAcre && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages.yieldPerAcre}</div>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Soil Type:</label>
                    <input
                        type="text"
                        name="soilType"
                        value={crop.soilType}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errorMessages.soilType && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages.soilType}</div>}
                </div>

                {/* Add more fields for other crop details */}

                <div style={{ marginBottom: '15px' }}>
                    <label>Weather Dependency:</label>
                    <input
                        type="text"
                        name="weatherDependency"
                        value={crop.weatherDependency || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errorMessages.weatherDependency && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages.weatherDependency}</div>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Pest Control:</label>
                    <input
                        type="text"
                        name="pestControl"
                        value={crop.pestControl || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errorMessages.pestControl && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages.pestControl}</div>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Fertilizer Schedule:</label>
                    <input
                        type="text"
                        name="fertilizerSchedule"
                        value={crop.fertilizerSchedule || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errorMessages.fertilizerSchedule && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages.fertilizerSchedule}</div>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Fertilizer Type:</label>
                    <input
                        type="text"
                        name="fertilizerType"
                        value={crop.fertilizerType || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errorMessages.fertilizerType && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages.fertilizerType}</div>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Watering Schedule:</label>
                    <input
                        type="text"
                        name="wateringSchedule"
                        value={crop.wateringSchedule || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errorMessages.wateringSchedule && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages.wateringSchedule}</div>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Expected Harvest Date:</label>
                    <input
                        type="date"
                        name="expectedHarvestDate"
                        value={crop.expectedHarvestDate ? crop.expectedHarvestDate.split('T')[0] : ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errorMessages.expectedHarvestDate && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages.expectedHarvestDate}</div>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Planting Date:</label>
                    <input
                        type="date"
                        name="plantingDate"
                        value={crop.plantingDate ? crop.plantingDate.split('T')[0] : ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errorMessages.plantingDate && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages.plantingDate}</div>}
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        marginTop: '20px'
                    }}
                >
                    Update Crop
                </button>
            </form>
        </div>
    );
};

export default EditCrop;
