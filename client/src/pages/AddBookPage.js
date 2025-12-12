import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [quantity, setQuantity] = useState('');
    
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.post('/api/books', { title, author, isbn, quantity }, config);
            navigate('/'); // Go back home
        } catch (error) {
            alert('Error adding book');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
            <h1>Add New Book</h1>
            <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '10px' }} />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required style={{ padding: '10px' }} />
                <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} required style={{ padding: '10px' }} />
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required style={{ padding: '10px' }} />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#333', color: 'white', border: 'none' }}>Add Book</button>
            </form>
        </div>
    );
};

export default AddBookPage;