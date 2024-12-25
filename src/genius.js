import axios from 'axios';
import { GENIUS_API_TOKEN } from './config';  // Make sure to import the API token


class GeniusService {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.baseURL = 'https://api.genius.com/';
  }

  // Format the song query, combining title and artists (if any)
  formatSongQuery(title, artists = []) {
    let query = title;
    if (artists.length > 0) {
      query += ' ' + artists.join(' ');
    }
    return query;
  }

  // Get song metadata from Genius based on the title
  async getSongMetadata(title) {
    try {
      const query = this.formatSongQuery(title);
      const url = `${this.baseURL}search?q=${encodeURIComponent(query)}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      });

      if (response.data.response.hits.length > 0) {
        const song = response.data.response.hits[0].result;
        return {
          title: song.full_title,
          artist: song.primary_artist.name,
          albumArt: song.song_art_image_url,
          url: song.url,
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching song metadata:', error);
      throw error;
    }
  }

  // Get the lyrics of a song based on its ID
  async getSongLyrics(songId) {
    try {
      const url = `${this.baseURL}songs/${songId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      });

      if (response.data.response.song.lyrics) {
        return response.data.response.song.lyrics;
      }
      return 'No lyrics found';
    } catch (error) {
      console.error('Error fetching lyrics:', error);
      throw error;
    }
  }
}

// Create an instance of the GeniusService class
const geniusService = new GeniusService(GENIUS_API_TOKEN);

// Export the instance to use in other parts of the application
export default geniusService;
