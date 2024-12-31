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
    <ul className={styles.songResults}>
      {filteredSongs.map((song) => (
        <li
          key={song.id}
          className={styles.songItem}
          onClick={() => handleSongSelection(song)}
        >
          <div className="song-title"><strong>{song.title}</strong></div>
          <div className="song-film">— {song.film}</div>
        </li>
      ))}
    </ul>
  );
};

export default SongResults;
