import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";  // for getting the song details passed via the router


const LyricsPage = () => {
  const location = useLocation();
  const { selectedSong } = location.state || {};  // Retrieve the song data passed from the homepage
  
  const [songMetadata, setSongMetadata] = useState(null);
  const [songLyrics, setSongLyrics] = useState(null);

  useEffect(() => {
    if (selectedSong) {
      // Here you would fetch metadata and lyrics based on the song title.
      // This is an example. You'll need to fetch this information from the Genius API.
      setSongMetadata({
        title: selectedSong.title,
        artist: selectedSong.artist,
        albumArt: selectedSong.albumArt,
        url: selectedSong.url,
      });

      setSongLyrics("Lyrics of the song go here..."); // Placeholder for actual lyrics
    }
  }, [selectedSong]);

  if (!selectedSong) {
    return <p>Loading...</p>;
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
