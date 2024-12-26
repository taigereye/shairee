import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';  // Add this import

import './App.css';
import { SONGS_ALL } from './songs';

import GeniusService from './geniusService';
import useFetchSongs from "./hooks/useFetchSongs";
import useHandleSongClick from "./hooks/useHandleSongClick";

import SearchBar from './components/SearchBar';
import SongResults from './components/SongResults';
import NoSongResults from './components/NoSongResults';
import LyricsPage from './components/LyricsPage';


const App = () => {
  const geniusService = new GeniusService();

  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { filteredSongs } = useFetchSongs(searchTerm);
  const { handleSongClick, selectedSongMetadata, selectedSongLyrics, loading, error } = useHandleSongClick();

  // Handle search for songs based on title
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      // Flip when user starts typing
      setHasSearched(true);
    } else {
      setFilteredSongs([]);
      // Flip back when search term is empty
      setHasSearched(false);
    }
  }, [searchTerm]);

  // Filter songs based on the search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      // Clear songs when no search term
      setFilteredSongs([]);
    }
    else {
      const results = SONGS_ALL.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSongs(results);
    }
    
  }, [searchTerm]);

  // Content that will be rendered
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
          {/* Display results of search on home page */}
          <Route
            path="/"
            element={<SongResults filteredSongs={filteredSongs} handleSongClick={handleSongClick} />}
          />
          {/* Navigate to different page for song with lyrics */}
          <Route
            path="/lyrics"
            element={<LyricsPage selectedSongMetadata={selectedSongMetadata} selectedSongLyrics={selectedSongLyrics} />}
          />
        </Routes>
        
        {/* No song results message */}
        {hasSearched && filteredSongs.length === 0 && (
          <NoSongResults />
        )}
      </div>
    </div>
  );
};

export default App;