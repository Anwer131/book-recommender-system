// Recommend.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { recommendBooks } from '../api';
import BookList from '../components/BookList';

const Recommend = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookTitle = location.state?.bookTitle || '';
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (bookTitle) {
                try {
                    setLoading(true);
                    const data = await recommendBooks(bookTitle);
                    if (data?.data?.length > 0) {
                        setRecommendations(data.data);
                    } else {
                        setError('No recommendations found.');
                    }
                } catch (err) {
                    setError('Failed to fetch recommendations.');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('No book selected.');
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, [bookTitle]);

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="recommend">
            <button onClick={handleGoBack} className="go-back-button">Go Back</button>
            <h2>Recommendations for <span style={{color:'red'}}>{bookTitle}</span></h2>
            {loading ? (
                <div className="loading">Loading recommendations...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <BookList books={recommendations} onBookClick={(book) => navigate('/recommend', { state: { bookTitle: book['Book-Title'] } })} />
            )}
        </div>
    );
};

export default Recommend;
