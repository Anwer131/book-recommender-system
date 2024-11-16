import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { recommendBooks } from '../api';
import BookList from '../components/BookList';

const Recommend = () => {
    const location = useLocation();
    const bookTitle = location.state.bookTitle;
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        recommendBooks(bookTitle).then((data) => setRecommendations(data.data));
    }, [bookTitle]);

    return (
        <div className="recommend">
            <h2>Recommendations for "{bookTitle}"</h2>
            <BookList books={recommendations} />
        </div>
    );
};

export default Recommend;
