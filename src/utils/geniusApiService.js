import axios from 'axios';
import fs from 'fs';


class GeniusApiService {
  constructor() {
    this.apiToken = process.env.GENIUS_API_KEY;
    this.baseUrl = 'https://api.genius.com';
  }

  // Helper function to format song query params
  formatSongQuery(title) {
    return encodeURIComponent(title.trim());
  }

  // Get song metadata based on params
  async getSongMetadata(title) {
    try {
      const query = this.formatSongQuery(title);
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: { q: query },
        headers: { Authorization: `Bearer ${this.apiToken}` },
      });

      const songData = response.data.response.hits[0]?.result;
      
      if (!songData) throw new Error('Song not found by title search');
      
      return {
        id: songData.id,
        title: songData.full_title,
        albumArt: songData.song_art_image_url,
        url: songData.url,
      };
    } catch (e) {
      throw new Error('Error fetching song metadata: ' + e.message);
    }
  }

  // Get song lyrics based on song ID
  async getSongLyrics(songId) {
    try {
      const response = await axios.get(`${this.baseUrl}/songs/${songId}`, {
        headers: { Authorization: `Bearer ${this.apiToken}` },
      });

      const lyricsPath = response.data.response.song.path;

      if (!lyricsPath) throw new Error('Song lyrics URL not found');

      const lyricsPage = await axios.get('https://genius.com' + lyricsPath);


      const $ = require('cheerio').load(lyricsPage.data);

      return $('#lyrics').text().trim();


      // fs.writeFileSync('lyricsPage.html', lyricsPage.data, 'utf8');
      // return 'HTML saved to lyricsPage.html for inspection';
    } 
    catch (e) {
      throw new Error('Error fetching song lyrics: ' + e.message);
    }
  }

}

export default GeniusApiService;
