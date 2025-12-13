import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const EditBookPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [quantity, setQuantity] = useState('');
    
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Fetch current book details
    useEffect(() => {
        const fetchBook = async () => {
            const { data } = await api.get(`/api/books`); // Ideally we'd have a GET /:id endpoint, but filtering list works for now
            const book = data.find(b => b._id === id);
            if (book) {
                setTitle(book.title);
                setAuthor(book.author);
                setIsbn(book.isbn);
                setQuantity(book.quantity);
            }
        };
        fetchBook();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await api.put(`/api/books/${id}`, { title, author, isbn, quantity }, config);
            navigate('/');
        } catch (error) {
            alert('Error updating book');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
            <h1>Edit Book</h1>
            <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '10px' }} />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required style={{ padding: '10px' }} />
                <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} required style={{ padding: '10px' }} />
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required style={{ padding: '10px' }} />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#ffc107', border: 'none' }}>Update Book</button>
            </form>
        </div>
    );
};

export default EditBookPage;