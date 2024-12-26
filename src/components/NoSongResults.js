import React from 'react';


const NoSongResults = ({ filteredSongs }) => {
  if (filteredSongs.length === 0) {
    return <p>No songs found</p>;
  }
  return null;
};

export default NoSongResults;
