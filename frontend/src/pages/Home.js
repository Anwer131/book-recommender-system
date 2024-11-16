import React, { useEffect, useState } from 'react';
import { fetchPopularBooks, searchBooks } from '../api';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [isSearching, setIsSearching] = useState(false);

    // Fetch popular books on component mount
    useEffect(() => {
        fetchPopularBooks().then(setBooks);
    }, []);

    // Handle search functionality
    const handleSearch = async (searchQuery) => {
        setQuery(searchQuery);
        setIsSearching(true);
        const data = await searchBooks(searchQuery);
        setSearchResults(data.data);
        setOffset(20);
    };

    // Handle loading more search results
    const handleLoadMore = async () => {
        const data = await searchBooks(query, 20, offset);
        setSearchResults((prevResults) => [...prevResults, ...data.data]);
        setOffset(offset + 20);
    };

    // Handle clearing the search and displaying popular books
    const handleClearSearch = () => {
        setQuery('');
        setIsSearching(false);
        setSearchResults([]);
    };

    return (
        <div className="home">
            <h2>Popular Books</h2>

            {/* Search Bar with Clear Functionality */}
            <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

            {/* Conditional rendering based on search results */}
            {isSearching ? (
                <>
                    <h3>Search Results for "{query}"</h3>
                    <BookList books={searchResults} />
                    {searchResults.length > 0 && (
                        <button className="load-more" onClick={handleLoadMore}>
                            Load More
                        </button>
                    )}
                </>
            ) : (
                <>
                    <h3>Explore Popular Books</h3>
                    <BookList books={books} />
                </>
            )}
        </div>
    );
};

export default Home;
