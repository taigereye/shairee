import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import './App.css';
import { SONGS } from "./data";
import SearchBar from "./SearchBar";
import SongResults from "./SongResults";
import NoSongResults from "./NoSongResults";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    // Prevent search if no songs are loaded
    if (!SONGS || SONGS.length === 0) {
      return; 
    }

    const fuse = new Fuse(SONGS, {
      keys: ["title", "artists"],
      includeScore: false,
      threshold: 0.3,
    });

    if (searchTerm.trim() === "") {
      setFilteredSongs([]);
      setHasSearched(false);
    } else {
      const results = fuse.search(searchTerm) || [];
      setFilteredSongs(results.map(result => result.item));
      setHasSearched(true);
    }
  }, [searchTerm]);

  return (
    <div className="app-container">
      <div className="content-container">
        <h1 className="title">शायरी</h1>
        <h1 className="title">Shairee</h1>

        <p className="description">
          A humble place to understand and appreciate the lyrical beauty of Urdu & Hindi songs.
        </p>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <SongResults filteredSongs={filteredSongs} searchTerm={searchTerm} />

        <NoSongResults filteredSongs={filteredSongs} searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default App;
