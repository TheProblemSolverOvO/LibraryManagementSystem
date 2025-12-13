import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for the Edit button
import teamLogo from '../assets/logo.jpeg';
import api from '../api';
const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get the token from local storage to authorize delete
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchBooks = async () => {
        try {
            const { data } = await api.get('/api/books');
            setBooks(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching books:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // --- NEW: Delete Handler ---
    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`, // Send token
                    },
                };
                await api.delete(`/api/books/${id}`, config);
                // Refresh the list after delete
                fetchBooks(); 
            } catch (error) {
                alert('Failed to delete: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <img src={teamLogo} alt="Team Logo" style={styles.logo} />
                <h1>Library Catalog</h1>
                <p>Browse our collection.</p>
                {/* Show Add Button only if logged in */}
                {userInfo && (
                    <Link to="/add-book" style={styles.addButton}>+ Add New Book</Link>
                )}
            </div>

            {loading ? <h2>Loading...</h2> : books.length === 0 ? <h2>No books found.</h2> : (
                <div style={styles.grid}>
                    {books.map((book) => (
                        <div key={book._id} style={styles.card}>
                            <h3 style={styles.title}>{book.title}</h3>
                            <p style={styles.text}><strong>Author:</strong> {book.author}</p>
                            <p style={styles.text}><strong>ISBN:</strong> {book.isbn}</p>
                            <p style={styles.text}><strong>Qty:</strong> {book.quantity}</p>
                            
                            {/* Show Actions only if logged in */}
                            {userInfo && (
                                <div style={styles.actions}>
                                    <Link to={`/edit-book/${book._id}`} style={styles.editBtn}>Edit</Link>
                                    <button 
                                        onClick={() => deleteHandler(book._id)} 
                                        style={styles.deleteBtn}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '2rem' },
    logo: { width: '150px', marginBottom: '1rem', borderRadius: '10px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' },
    card: { backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
    title: { fontSize: '1.5rem', marginBottom: '0.5rem', color: '#333' },
    text: { marginBottom: '0.5rem', color: '#555' },
    
    // NEW Styles for Buttons
    addButton: { display: 'inline-block', marginTop: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' },
    actions: { marginTop: '1rem', display: 'flex', gap: '10px' },
    editBtn: { padding: '5px 10px', backgroundColor: '#ffc107', color: 'black', textDecoration: 'none', borderRadius: '4px', fontSize: '0.9rem' },
    deleteBtn: { padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }
};

export default HomePage;