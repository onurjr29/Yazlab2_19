import axios from 'axios';

const API_URL = 'http://localhost:5000/api/applications';

export const applyForJob = async (formData) => {
    return await axios.post(`${API_URL}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};
