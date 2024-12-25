import { useState, useEffect } from 'react';
import { fetchSongs } from './api'; // Import the fetch function from api.js


// Custom hook to fetch songs on page load
const useFetchSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const fetchedSongs = await fetchSongs();
        setSongs(fetchedSongs);
      } catch (err) {
        setError("Error fetching songs.");
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, []); // Empty array to run this effect once when the component is mounted

  return { songs, loading, error };
};

export default useFetchSongs;
