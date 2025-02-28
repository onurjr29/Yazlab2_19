import React, { useState } from 'react';
import { login } from '../services/authService';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password });
            localStorage.setItem('token', res.data.token);
            setUser(res.data);
            alert('Giriş başarılı!');
        } catch (error) {
            alert('Giriş başarısız!');
        }
    };

    return (
        <div>
            <h2>Giriş Yap</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    );
};

export default Login;
