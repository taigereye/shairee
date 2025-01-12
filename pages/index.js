import { useState, useEffect } from 'react';
import Link from 'next/link';

import useHandleSongClick from '../hooks/useHandleSongClick';
import useFilteredSongs from '../hooks/useFilteredSongs';

import HeaderShairee from '../components/HeaderShairee';
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
    <div className={styles.appContainer}>
      <div className={styles.contentContainer}>

        <HeaderShairee/>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search for a song... gana... गाना..." />
        
        <SongResults filteredSongs={filteredSongs} handleSongClick={handleSongClick} />

        {hasSearched && filteredSongs.length === 0 && <NoSongResults/>}
 
      </div>
    </div>
  );
};

export default HomePage;
