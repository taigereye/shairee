import { useState, useEffect } from "react";
import { getSongsFromGenius } from "../genius";


const useFetchSongs = (searchTerm) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!searchTerm) return; // Skip API call if no search term
      
      setLoading(true);
      try {
        const fetchedSongs = await getSongsFromGenius(searchTerm);
        setSongs(fetchedSongs);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [searchTerm]);

  return { songs, loading, error };
};

export default useFetchSongs;
