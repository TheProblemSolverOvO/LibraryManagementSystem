import React from 'react';

const ProfilePage = () => {
    // 1. Get user info from LocalStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
        return <h2>Please log in to view your profile.</h2>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.header}>User Profile</h1>
                
                <div style={styles.infoGroup}>
                    <label style={styles.label}>Name:</label>
                    <p style={styles.value}>{userInfo.name}</p>
                </div>

                <div style={styles.infoGroup}>
                    <label style={styles.label}>Email:</label>
                    <p style={styles.value}>{userInfo.email}</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '50px',
    },
    card: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '400px',
        border: '1px solid #ddd',
    },
    header: {
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333',
    },
    infoGroup: {
        marginBottom: '1.5rem',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
    },
    label: {
        fontWeight: 'bold',
        display: 'block',
        color: '#555',
        marginBottom: '5px',
    },
    value: {
        fontSize: '1.1rem',
        color: '#000',
        margin: 0,
    }
};

export default ProfilePage;