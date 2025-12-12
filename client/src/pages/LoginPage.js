import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Hook to redirect user after login
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault(); // Stop page refresh
        try {
            // Send request to your Backend API
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // We don't need 'http://localhost:8000' because of the proxy in package.json
            const { data } = await axios.post(
                '/api/users/login',
                { email, password },
                config
            );

            // Save the user info (including Token) to LocalStorage
            localStorage.setItem('userInfo', JSON.stringify(data));

            console.log('Login Successful:', data);
            
            // Redirect to Home Page
            navigate('/');
            
            // Optional: Force a reload to update the Navbar (we'll fix this properly later)
            window.location.reload();

        } catch (err) {
            // Handle error (e.g. invalid password)
            setError(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    };

    return (
        <div style={styles.container}>
            <h1>Sign In</h1>
            {error && <div style={styles.error}>{error}</div>}
            
            <form onSubmit={submitHandler} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
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
                    />
                </div>

                <button type="submit" style={styles.button}>Sign In</button>
            </form>
        </div>
    );
};

// Basic CSS-in-JS
const styles = {
    container: {
        maxWidth: '500px',
        margin: '50px auto',
        padding: '2rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '5px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '1rem',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    button: {
        padding: '10px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    error: {
        color: 'red',
        marginBottom: '1rem',
        textAlign: 'center'
    }
};

export default LoginPage;