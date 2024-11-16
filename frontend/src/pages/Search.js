import React, { useState } from 'react';
import { searchBooks } from '../api';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';

const Search = () => {
    const [books, setBooks] = useState([]);
    const [offset, setOffset] = useState(0);
    const [query, setQuery] = useState('');

    const handleSearch = async (searchQuery) => {
        setQuery(searchQuery);
        const data = await searchBooks(searchQuery);
        setBooks(data.data);
        setOffset(20);
    };

    const handleLoadMore = async () => {
        const data = await searchBooks(query, 20, offset);
        setBooks((prevBooks) => [...prevBooks, ...data.data]);
        setOffset(offset + 20);
    };

    return (
        <div className="search">
            <SearchBar onSearch={handleSearch} />
            <BookList books={books} />
            {books.length > 0 && <button onClick={handleLoadMore} className='load-more'>Load More</button>}
        </div>
    );
};

export default Search;
