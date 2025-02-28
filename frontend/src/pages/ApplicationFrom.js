import React, { useState } from 'react';
import { applyForJob } from '../services/applicationService';

const ApplicationForm = () => {
    const [jobId, setJobId] = useState('');
    const [documents, setDocuments] = useState([]);

    const handleFileChange = (e) => {
        setDocuments(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('jobId', jobId);
        for (let i = 0; i < documents.length; i++) {
            formData.append('documents', documents[i]);
        }

        try {
            await applyForJob(formData);
            alert('Başvurunuz başarıyla tamamlandı!');
        } catch (error) {
            alert('Başvuru başarısız!');
        }
    };

    return (
        <div>
            <h2>Akademik Başvuru</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="İlan ID" value={jobId} onChange={(e) => setJobId(e.target.value)} required />
                <input type="file" multiple onChange={handleFileChange} required />
                <button type="submit">Başvur</button>
            </form>
        </div>
    );
};

export default ApplicationForm;
