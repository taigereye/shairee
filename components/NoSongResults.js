import React from 'react';

import styles from '../styles/components/NoSongResults.module.css';


const NoSongResults = ({ filteredSongs }) => {
  if (filteredSongs.length === 0) {
    return <div><br></br><p>sorry, no songs match!</p></div>;
  }
  return null;
};

export default NoSongResults;
