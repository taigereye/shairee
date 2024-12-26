import { useState } from "react";
import GeniusService from "../geniusService";


const useHandleSongClick = () => {
  const [selectedSongMetadata, setSelectedSongMetadata] = useState(null);
  const [selectedSongLyrics, setSelectedSongLyrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSongClick = async (song, navigate) => {
    const geniusService = new GeniusService(); // Initialize GeniusService here
    setLoading(true);
    try {
      const metadata = await geniusService.getSongMetadata(song.title); // Fetch metadata
      if (metadata) {
        setSelectedSongMetadata(metadata);
        const songLyrics = await geniusService.getSongLyrics(metadata.id); // Fetch lyrics
        setSelectedSongLyrics(songLyrics);
        // Navigate to the lyrics page and pass the song data
        navigate('/lyrics', { state: { selectedSong: song } });
      }
    } catch (error) {
      setError('Error fetching song details');
      console.error('Error fetching song details:', error);
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
