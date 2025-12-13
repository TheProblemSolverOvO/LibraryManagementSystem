import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api';
const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // Send request to Register API
            const { data } = await api.post(
                '/api/users/register',
                { name, email, password },
                config
            );

            // If successful, log them in immediately (save token)
            localStorage.setItem('userInfo', JSON.stringify(data));

            console.log('Registration Successful:', data);
            navigate('/'); // Redirect to Home
            window.location.reload();

        } catch (err) {
            setError(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    };

    return (
        <div style={styles.container}>
            <h1>Sign Up</h1>
            {error && <div style={styles.error}>{error}</div>}
            
            <form onSubmit={submitHandler} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Full Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <button type="submit" style={styles.button}>Register</button>
            </form>
        </div>
    );
};

// Reusing the same simple styles
const styles = {
    container: {
        maxWidth: '500px',
        margin: '50px auto',
        padding: '2rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '5px'
    },
    form: { display: 'flex', flexDirection: 'column' },
    inputGroup: { marginBottom: '1rem' },
    input: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' },
    button: { padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
    error: { color: 'red', marginBottom: '1rem', textAlign: 'center' }
};

export default RegisterPage;