import { useState } from 'react';
import axios from 'axios';


const useHandleSongClick = () => {
  const [selectedSongMetadata, setSelectedSongMetadata] = useState(null);
  const [selectedSongLyrics, setSelectedSongLyrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSongClick = async (song, navigate) => {
    setLoading(true);

    try {
      // 1. Make API call to get song metadata via serverless function
      const metadataResponse = await axios.get('/api/geniusServerless', {
        params: { title: song.title, artist: song.artist },
      });

      const { metadata } = metadataResponse.data;
      if (!metadata) throw new Error('Song metadata not found');

      setSelectedSongMetadata(metadata);

      // 2. Make API call to get song lyrics via serverless function
      const lyricsResponse = await axios.get('/api/geniusServerless', {
        params: { songId: metadata.id },
      });

      const { lyrics } = lyricsResponse.data;
      if (!lyrics) throw new Error('Song lyrics not found');

      setSelectedSongLyrics(lyrics);

      // 3. Navigate to the /lyrics page with all song data
      navigate('/lyrics', {
        state: { song: { title: song.title, artist: song.artist, albumArt: song.albumArt, lyrics } },
      });
    } catch (error) {
      setError('Error fetching song details');
      console.error('Error fetching song details: ', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSongClick,
    selectedSongMetadata,
    selectedSongLyrics,
    loading,
    error,
  };
};

export default useHandleSongClick;
