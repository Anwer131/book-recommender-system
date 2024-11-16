import React from 'react';

const BookCard = ({ book, onClick }) => (
    <div className="book-card" onClick={onClick}>
        <img src={book['Image-URL-M']} alt={book['Book-Title']} />
        <h3>{book['Book-Title']}</h3>
        <p>by {book['Book-Author']}</p>
        <p>Ratings: {book['Avg-Rating'] ? book['Avg-Rating'].toFixed(1) : 'N/A'}</p>
        <p>People Rated: {book['Num-Rating'] || 'N/A'}</p>
    </div>
);

export default BookCard;
