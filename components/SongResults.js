import React from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/components/SongResults.module.css';


const SongResults = ({ filteredSongs, handleSongClick }) => {
  const router = useRouter();

  const handleSongSelection = (song) => {
    handleSongClick(song);
    router.push('/lyrics');
  };

  return (
    <div className={styles.songResultsContainer}>
      <ul className={styles.songResults}>
        {filteredSongs.map((song) => (
          <li
            key={song.id}
            className={styles.songItem}
            onClick={() => handleSongSelection(song)}
          >
            <div className={styles.songTitle}><strong>{song.title}</strong></div>
            <div className={styles.songFilm}>— {song.film}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongResults;
