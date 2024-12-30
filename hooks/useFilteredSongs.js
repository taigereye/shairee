import { useState, useEffect } from 'react';

import { SONGS_ALL } from '../src/utils/songsAll';


const useFilteredSongs = (searchTerm) => {
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => 
    {
      // Do not show any results if user has not typed a search term
      if (searchTerm.trim() === "") {
        setFilteredSongs([]);  
      } 
      else {
        const filtered = SONGS_ALL.filter(song =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSongs(filtered);
      }
    },
    // Re-run when searchTerm changes
    [searchTerm]
  );  

  return filteredSongs;  
};

export default useFilteredSongs;
