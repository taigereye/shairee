import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import './App.css';
import { SONGS } from "./data";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");  // track the search term
  const [hasSearched, setHasSearched] = useState(false); // track if the user has searched
  const [filteredSongs, setFilteredSongs] = useState([]);  // initially display no songs
  
  useEffect(() => {
    console.log(SONGS)
    // Prevent search if no songs are loaded
    if (!SONGS || SONGS.length === 0) {
      return; 
    }

    const fuse = new Fuse(SONGS, {
      keys: ["title", "artists"],
      includeScore: false,
      threshold: 0.3,  // for fuzzy search
    });

    // If the search term is empty display nothing, otherwise, filter based on the term(s)
    if (searchTerm.trim() === "") {
      setFilteredSongs([]);
      setHasSearched(false);
    } else {
      // Safely handle no search results
      const results = fuse.search(searchTerm) || [];
      setFilteredSongs(results.map(result => result.item));
      setHasSearched(true);
    }
  }, [searchTerm]); // re-run when the search term changes

  return (
    <div className="app-container">
      {/* Content container */}
      <div className="content-container">

        {/* Title */}
        <h1 className="title">शायरी</h1>
        <h1 className="title">Shairee</h1>

        {/* Description */}
        <p className="description">
          A humble place to understand and appreciate the lyrical beauty of Urdu & Hindi songs.
        </p>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search for a song... gana... गाना..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {/* Song results dropdown */}
        {searchTerm && filteredSongs.length > 0 && (
          <ul className="song-results">
            {filteredSongs.map((song, index) => (
              <li key={index} className="song-item" onClick={() => handleSongClick(song)}>
                <div className="song-title">{song.title}</div> {/* Bold song title */}
                <div className="song-artists">
                  — {song.artists.join(", ")}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* No song results message */}
        {searchTerm && filteredSongs.length === 0 && (
          <p className="no-results">No songs found</p>
        )}
      </div>
    </div>
  );
}

export default App;
