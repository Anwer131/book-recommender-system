import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onSearch, onClear }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleClear = () => {
        setQuery('');
        onClear();
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-input-container">
                <input 
                    type="text" 
                    placeholder="Search for a book..." 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    className="search-input"
                />
                {query && (
                    <button type="button" className="clear-button" onClick={handleClear}>
                        <FaTimes />
                    </button>
                )}
                <button type="submit" className="search-button">
                    <FaSearch />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
