import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const LyricsPage = () => {
  // Retrieve song data passed via the router
  const location = useLocation();
  const { selectedSong } = location.state || {};

  const [songMetadata, setSongMetadata] = useState(null);
  const [songLyrics, setSongLyrics] = useState(null);

  // Set song data passed from home page
  useEffect(() => {
    if (selectedSong) {
      setSongMetadata({
        title: selectedSong.title,
        artist: selectedSong.artist,
        albumArt: selectedSong.albumArt,
        url: selectedSong.url,
      });

      setSongLyrics(selectedSong.lyrics);
    }
  }, [selectedSong]);

  // If no song was selected, allow user to go back
  if (!selectedSong) {
    return <div><br></br><p>back to home</p></div>;
  }

  return (
    <div>
      <h2>{songMetadata?.title}</h2>
      <h3>{songMetadata?.artist}</h3>
      <img src={songMetadata?.albumArt} alt={songMetadata?.title} />
      <p>{songLyrics}</p>
      <a href={songMetadata?.url} target="_blank" rel="noopener noreferrer">View on Genius</a>
    </div>
  );
};

export default LyricsPage;
