import axios from 'axios';
import { GENIUS_API_TOKEN } from './config';


class GeniusService {
  constructor(apiToken) {
    this.apiToken = apiToken || GENIUS_API_TOKEN;
    this.baseUrl = 'https://api.genius.com';
  }

  // Helper function to format song query
  formatSongQuery(title, artists = []) {
    const artistString = artists.length > 0 ? artists.join(' & ') : '';
    return `${title} ${artistString}`.trim();
  }

  // Get song metadata based on title
  async getSongMetadata(title, artists = []) {
    try {
      const query = this.formatSongQuery(title, artists);
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: { q: query },
        headers: { Authorization: `Bearer ${this.apiToken}` },
      });
      
      const songData = response.data.response.hits[0]?.result;
      if (!songData) throw new Error('No song found');
      
      return {
        id: songData.id,
        title: songData.full_title,
        albumArt: songData.song_art_image_url,
        url: songData.url,
      };
    } catch (error) {
      throw new Error('Error fetching song metadata: ' + error.message);
    }
  }

  // Get song lyrics based on song ID
  async getSongLyrics(songId) {
    try {
      const response = await axios.get(`${this.baseUrl}/songs/${songId}`, {
        headers: { Authorization: `Bearer ${this.apiToken}` },
      });
      const lyricsPath = response.data.response.song.path;
      const lyricsPage = await axios.get(lyricsPath);
      const $ = require('cheerio').load(lyricsPage.data);
      return $('#lyrics').text().trim();
    } catch (error) {
      throw new Error('Error fetching song lyrics: ' + error.message);
    }
  }
}

export default GeniusService;
