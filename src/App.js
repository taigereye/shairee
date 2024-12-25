import React, { useState, useEffect } from "react";

import './App.css';
import { fetchSongs } from "./genius"; // for Genius API
import useFetchSongs from "./hooks/useFetchSongs";

import SearchBar from "./components/SearchBar";
import SongResults from "./components/SongResults";
import NoSongResults from "./components/NoSongResults";


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const { songs, loading, error } = useFetchSongs();

  useEffect(() => {
    if (!songs || songs.length === 0) {
      return;
    }

    const fuse = new Fuse(songs, {
      keys: ["title", "artists"],
      includeScore: false,
      threshold: 0.3,
    });

    if (searchTerm.trim() === "") {
      setFilteredSongs([]);
    } else {
      const results = fuse.search(searchTerm) || [];
      setFilteredSongs(results.map(result => result.item));
    }
  }, [searchTerm, songs]);

  return (
    <div className="app-container">
      <div className="content-container">
        <h1 className="title">शायरी</h1>
        <h1 className="title">Shairee</h1>

        <p className="description">
          A humble place to understand and appreciate the lyrical beauty of Urdu & Hindi songs.
        </p>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {loading && <p>Loading songs...</p>} {/* Show loading state */}
        {error && <p>{error}</p>} {/* Show error if there's one */}

        <SongResults filteredSongs={filteredSongs} />
        <NoSongResults filteredSongs={filteredSongs} />
      </div>
    </div>
  );
}

export default App;
