import axios from 'axios';

const API_URL = 'https://book-recommender-system-backend.onrender.com';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
});

export const fetchPopularBooks = async () => {
    const response = await axiosInstance.get('/popular-books');
    return response.data;
};

export const searchBooks = async (query, limit = 20, offset = 0) => {
    const response = await axiosInstance.get('/search-books', {
        params: { query, limit, offset },
    });
    return response.data;
};

export const recommendBooks = async (userInput) => {
    try {
        const response = await axiosInstance.post('/recommend-books', { user_input: userInput });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return { data: [] };
    }
};
