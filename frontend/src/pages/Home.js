import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPopularBooks, searchBooks } from '../api';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);

    const navigate = useNavigate();

    // Fetch popular books on component mount
    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            const fetchedBooks = await fetchPopularBooks();
            setBooks(fetchedBooks);
            setLoading(false);
        };
        fetchBooks();
    }, []);

    // Handle search functionality
    const handleSearch = async (searchQuery) => {
        setQuery(searchQuery);
        setIsSearching(true);
        setSearchLoading(true);
        const data = await searchBooks(searchQuery);
        setSearchResults(data.data);
        setTotalResults(data.total);
        setOffset(20); // Reset offset for pagination
        setSearchLoading(false);
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
        setTotalResults(0);
    };

    // Handle book click for recommendations
    const onBookClick = (book) => {
        if (book['Book-Title']) {
            navigate('/recommend', { state: { bookTitle: book['Book-Title'] } });
        } else {
            alert('No details available for this book.');
        }
    };

    return (
        <div className="home">
            <h2>Explore Popular Books</h2>
            <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

            {isSearching ? (
                <>
                    {searchLoading ? (
                        <div className="loading">Searching for books...</div>
                    ) : (
                        <>
                            <h3>
                                {totalResults > 0
                                    ? `Found ${totalResults} books for "${query}"`
                                    : `No books found for "${query}"`}
                            </h3>
                            <BookList books={searchResults} onBookClick={onBookClick} />
                            {searchResults.length < totalResults && (
                                <button className="load-more" onClick={handleLoadMore}>
                                    Load More
                                </button>
                            )}
                        </>
                    )}
                </>
            ) : (
                <>
                    <h3><span style={{color:'red'}}>Top 50</span> Popular Books</h3>
                    <h4>Click on any book to get <span style={{color:'yellow'}}>similar</span> recommendations</h4>
                    <BookList books={books} onBookClick={onBookClick} />
                </>
            )}
            {loading && <div className="loading">Loading popular books...</div>}
        </div>
    );
};

export default Home;
