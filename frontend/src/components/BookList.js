import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onBookClick }) => (
    <div className="book-list">
        {books.map((book, index) => (
            <BookCard key={index} book={book} onClick={() => onBookClick(book)} />
        ))}
    </div>
);

export default BookList;
