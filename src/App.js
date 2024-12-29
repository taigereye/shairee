import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';  
import './App.css';

import useHandleSongClick from './hooks/useHandleSongClick';
import useFilteredSongs from './hooks/useFilteredSongs';

import SearchBar from './components/SearchBar';
import SongResults from './components/SongResults';
import NoSongResults from './components/NoSongResults';
import LyricsPage from './components/LyricsPage';


const App = () => {
  // Manage search & filtering state
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Custom hook for filtering songs
  const filteredSongs = useFilteredSongs(searchTerm);

  // Custom hook for when a song is selected (API calls, metadata, lyrics)
  const { handleSongClick, selectedSongMetadata, selectedSongLyrics, loading, error } = useHandleSongClick();

  // Only show song results or no results if the user has searched for something
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      setHasSearched(true);
    } else {
      setHasSearched(false);
    }
  }, [searchTerm]);

  return (
    <div className="app-container">
      <div className="content-container">
        
        {/* Header */}
        <h1 className="title">शायरी</h1>
        <h1 className="title">Shairee</h1>
        <p className="description">
          A humble place to understand and appreciate the lyrical beauty of Urdu & Hindi songs.
        </p>

        {/* Search bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search for a song... gana... गाना..." />

        {/* Song results */}
        <Routes>
          <Route
            path="/"
            element={<SongResults filteredSongs={filteredSongs} handleSongClick={handleSongClick} />}
          />
          <Route
            path="/lyrics"
            element={<LyricsPage />}
          />
        </Routes>

        {/* No song results */}
        {hasSearched && filteredSongs.length === 0 && <NoSongResults filteredSongs={filteredSongs} />}
      </div>
    </div>
  );
};

export default App;
