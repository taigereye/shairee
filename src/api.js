import axios from 'axios';
import { GENIUS_API_TOKEN } from './config';

// Function to fetch song data
export const fetchSongData = async (query) => {
  try {
    const response = await axios.get('https://api.genius.com/search', {
      params: { q: query },
      headers: {
        Authorization: `Bearer ${GENIUS_API_TOKEN}`,
      },
    });
    return response.data.response.hits;
  } catch (error) {
    console.error("Error fetching song data:", error);
    return [];
  }
};
