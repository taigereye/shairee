import { useState, useEffect } from "react";


// Custom hook to filter songs based on search term
const useFetchSongs = (searchTerm) => {
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const filterSongs = () => {
      // Skip filtering if no search term
      if (!searchTerm) return;

      const results = SONGS_ALL.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSongs(results);
    };

    filterSongs();
  }, [searchTerm]);

  return { filteredSongs, loading, error };
};

export default useFetchSongs;
