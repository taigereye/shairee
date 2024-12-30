import { useState } from 'react';
import axios from 'axios';


const useHandleSongClick = () => {
  const [selectedSongMetadata, setSelectedSongMetadata] = useState(null);
  const [selectedSongLyrics, setSelectedSongLyrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSongClick = async (selectedSong, navigate) => {
    setLoading(true);

    try {
      // 1. Make API call to get song metadata via serverless function

      const metadataResponse = await axios.get('/api/geniusServerless', {
        params: { title: selectedSong.title },
      });

      const { metadata } = metadataResponse.data;
      if (!metadata) throw new Error('Song metadata not found');

      const songMetadata = new SongMetadata(
        metadata.id,
        metadata.title,
        selectedSong.film,
        metadata.artst,
      )
      setSelectedSongMetadata(songMetadata);

      // 2. Make API call to get song lyrics via serverless function

      const lyricsResponse = await axios.get('/api/geniusServerless', {
        params: { songId: songMetadata.id },
      });

      const { lyrics } = lyricsResponse.data;
      if (!lyrics) throw new Error('Song lyrics not found');

      const songLyrics = new SongLyrics(lyrics)
      setSelectedSongLyrics(songLyrics);

      // 3. Navigate to the /lyrics page with all song data

      navigate('/lyrics', {
        state: { 
          song: { 
            title: metadata.title,
            artist: metadata.artist,
            albumArt: metadata.albumArt,
            lyricsText: lyrics 
          } 
        },
      });
    } 
    catch (error) {
      setError('Error fetching song details');
      console.error('Error fetching song details: ', error);
    } 
    finally {
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
