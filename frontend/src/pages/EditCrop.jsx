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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
