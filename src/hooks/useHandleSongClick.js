import { useState } from "react";
import GeniusApiService from "../geniusApiService";


const useHandleSongClick = () => {
  const [selectedSongMetadata, setSelectedSongMetadata] = useState(null);
  const [selectedSongLyrics, setSelectedSongLyrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSongClick = async (song, navigate) => {
    const geniusService = new GeniusService();

    setLoading(true);

    try {
      const songMetadata = await geniusService.getSongMetadata(song.title);

      if (metadata) {
        setSelectedSongMetadata(songMetadata);

        const songLyrics = await geniusService.getSongLyrics(songMetadata.id);

        setSelectedSongLyrics(songLyrics);
        
        navigate('/lyrics', { state: { selectedSong: song } });
      }
    }
    catch (e) {
      setError('Error fetching song details');
      console.error('Error fetching song details: ', e);
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
