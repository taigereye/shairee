import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/components/SongResults.module.css';


const SongResults = ({ filteredSongs, handleSongClick }) => {
  const navigate = useNavigate();

  return (
    <ul className="song-results">
      {filteredSongs.map((song) => (
        <li 
          key={song.id} 
          className="song-item" 
          onClick={() => { handleSongClick(song, navigate); }}
        >
          <div className="song-title"><strong>{song.title}</strong></div>
          <div className="song-film">— {song.film}</div>
        </li>
      ))}
    </ul>
  );
};

export default SongResults;
