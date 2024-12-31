import axios from 'axios';

import GeniusSong from '../models/GeniusSong'
import GeniusSongMetadata from '../models/GeniusSongMetadata';
import GeniusSongLyrics from '../models/GeniusSongMetadata';


class GeniusApiService {
  constructor() {
    this.apiToken = process.env.GENIUS_API_KEY;
    this.baseUrl = 'https://api.genius.com';
  }

  static formatSongQuery(title) {
    return encodeURIComponent(title.trim());
  }

  async getSongMetadata(title) {
    try {
      const query = this.formatSongQuery(title);
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: { q: query },
        headers: { Authorization: `Bearer ${this.apiToken}` },
      });

      const songData = response.data.response.hits[0]?.result;
      if (!songData) throw new Error('Song not found by title search');

      // Combine primary and featured artists
      const primaryArtist = songData.primary_artist.name;
      const featuredArtists = songData.artists ? songData.artists.map(artist => artist.name).join(', ') : '';
      const allArtists = featuredArtists ? `${primaryArtist}, ${featuredArtists}` : primaryArtist;

      const songMetadata = new GeniusSongMetadata(
        songData.full_title,
        allArtists,
        songData.album ? songData.album.name : '',
        songData.song_art_image_url,
        songData.url
      );

      return songMetadata;
    }
    catch (e) {
      throw new Error('Error fetching song metadata: ' + e.message);
    }
  }

  async getSongLyrics(songId) {
    try {
      const response = await axios.get(`${this.baseUrl}/songs/${songId}`, {
        headers: { Authorization: `Bearer ${this.apiToken}` },
      });

      const lyricsPath = response.data.response.song.path;
      if (!lyricsPath) throw new Error('Song lyrics URL not found');

      const lyricsPage = await axios.get('https://genius.com' + lyricsPath);
      if (!lyricsPage) throw new Error('Page with song lyrics not found');

      const songLyrics = new GeniusSongLyrics(lyricsPage.data);
      songLyrics.extractLyricsFromHtml();

      return songLyrics;
    }
    catch (e) {
      throw new Error('Error fetching song lyrics: ' + e.message);
    }

  }

  static createSong(songMetadata, songLyrics) {
    const song = new GeniusSong(songMetadata, songLyrics);
    return song;
  }

}

export default GeniusApiService;
