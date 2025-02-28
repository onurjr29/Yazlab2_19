import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ApplicationForm from './pages/ApplicationFrom';
import JuryDashboard from './pages/JuryDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/apply" element={<ApplicationForm />} />
                <Route path="/jury-dashboard" element={<ProtectedRoute role="Jüri"><JuryDashboard /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
