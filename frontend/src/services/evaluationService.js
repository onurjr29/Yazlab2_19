import axios from 'axios';

const API_URL = 'http://localhost:5000/api/evaluations';

// Jüriye atanan başvuruları getir
export const getJuryApplications = async () => {
    return await axios.get(`${API_URL}/jury`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};

// Jüri değerlendirme ekleme
export const evaluateApplication = async (applicationId, score, comments, status) => {
    return await axios.post(
        `${API_URL}/evaluate`,
        { applicationId, score, comments, status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
};
