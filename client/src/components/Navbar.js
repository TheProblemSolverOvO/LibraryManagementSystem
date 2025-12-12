//this is for the navigation bar

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // 1. Check if user is logged in by reading from LocalStorage
    // We parse it because we stored it as a JSON string
    const user = JSON.parse(localStorage.getItem('userInfo'));

    // 2. Logout Handler
    const logoutHandler = () => {
        // Remove user data from storage
        localStorage.removeItem('userInfo');
        // Redirect to login page
        navigate('/login');
        // Reload page to update the Navbar state
        window.location.reload();
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}><h1>Library App</h1></Link>
            </div>
            <ul style={styles.menu}>
                {/* Home is always visible */}
                <li><Link to="/" style={styles.link}>Home</Link></li>

                {user ? (
                    // --- SHOW THESE IF LOGGED IN ---
                    <>
                        {/* Requirement: Show user's name or profile link */}
                        <li style={styles.userText}>Welcome, {user.name}</li>
                        <li><Link to="/profile" style={styles.link}>My Profile</Link></li>
                        <li>
                            <button onClick={logoutHandler} style={styles.logoutBtn}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    // --- SHOW THESE IF LOGGED OUT ---
                    <>
                        <li><Link to="/login" style={styles.link}>Login</Link></li>
                        <li><Link to="/register" style={styles.link}>Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

// Updated Styles
const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#333',
        color: '#fff',
    },
    logo: { fontSize: '1.5rem', fontWeight: 'bold' },
    menu: { display: 'flex', listStyle: 'none', gap: '1.5rem', alignItems: 'center' },
    link: { color: '#fff', textDecoration: 'none', fontSize: '1.1rem' },
    userText: { color: '#ddd', fontSize: '1rem', marginRight: '10px' },
    logoutBtn: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem'
    }
};

export default Navbar;