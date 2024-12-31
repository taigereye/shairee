import { useState, useEffect } from 'react';
import Link from 'next/link';

import useHandleSongClick from '../hooks/useHandleSongClick';
import useFilteredSongs from '../hooks/useFilteredSongs';

import SearchBar from '../components/SearchBar';
import SongResults from '../components/SongResults';
import NoSongResults from '../components/NoSongResults';

import styles from '../styles/components/HomePage.module.css';


const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const filteredSongs = useFilteredSongs(searchTerm);
  const { handleSongClick, selectedSongMetadata, selectedSongLyrics, loading, error } = useHandleSongClick();

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
        <SongResults filteredSongs={filteredSongs} handleSongClick={handleSongClick} />

        {/* No song results */}
        {hasSearched && filteredSongs.length === 0 && <NoSongResults filteredSongs={filteredSongs} />}


        {/* Link navigation */}
        <div>
          <Link href="/">
            <a>Go to Home Page</a>
          </Link>
          <Link href="/lyrics">
            <a>Go to Lyrics Page</a>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
