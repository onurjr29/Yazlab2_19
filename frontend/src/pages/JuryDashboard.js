import React, { useEffect, useState } from 'react';
import { getJuryApplications, evaluateApplication } from '../services/evaluationService';

const JuryDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [score, setScore] = useState('');
    const [comments, setComments] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await getJuryApplications();
                setApplications(res.data);
            } catch (error) {
                console.error('Başvurular getirilemedi', error);
            }
        };
        fetchApplications();
    }, []);

    const handleEvaluationSubmit = async (e) => {
        e.preventDefault();
        if (!selectedApplication) return alert('Önce bir başvuru seçin!');
        try {
            await evaluateApplication(selectedApplication._id, score, comments, status);
            alert('Değerlendirme kaydedildi!');
            setSelectedApplication(null);
            setScore('');
            setComments('');
            setStatus('');
        } catch (error) {
            console.error('Değerlendirme yapılamadı', error);
        }
    };

    return (
        <div>
            <h2>Jüri Paneli</h2>
            <h3>Başvurular</h3>
            <ul>
                {applications.map((app) => (
                    <li key={app._id}>
                        {app.applicantId.email} - {app.jobId.title}
                        <button onClick={() => setSelectedApplication(app)}>İncele</button>
                    </li>
                ))}
            </ul>

            {selectedApplication && (
                <div>
                    <h3>Değerlendirme</h3>
                    <p>Aday: {selectedApplication.applicantId.email}</p>
                    <p>Başvurduğu İlan: {selectedApplication.jobId.title}</p>
                    <label>Puan:</label>
                    <input type="number" value={score} onChange={(e) => setScore(e.target.value)} min="0" max="100" required />
                    <label>Yorum:</label>
                    <textarea value={comments} onChange={(e) => setComments(e.target.value)} required />
                    <label>Durum:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Seç</option>
                        <option value="Onaylandı">Onaylandı</option>
                        <option value="Reddedildi">Reddedildi</option>
                    </select>
                    <button onClick={handleEvaluationSubmit}>Kaydet</button>
                </div>
            )}

            {selectedApplication && (
                <div>
                    <h3>Yüklenen Belgeler</h3>
                    <ul>
                        {selectedApplication.documents.map((doc, index) => (
                            <li key={index}>
                                <a href={doc} target="_blank" rel="noopener noreferrer">Belge {index + 1}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
        </div>
    );
};

export default JuryDashboard;
