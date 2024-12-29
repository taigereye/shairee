import React from 'react';


const NoSongResults = ({ filteredSongs }) => {
  if (filteredSongs.length === 0) {
    return <div><br></br><p>sorry, no songs match!</p></div>;
  }
  return null;
};

export default NoSongResults;
