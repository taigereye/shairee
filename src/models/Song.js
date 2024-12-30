import SongMetadata from './SongMetadata';
import SongLyrics from './SongLyrics';


class Song {
  constructor(songMetadata, songLyrics) {
    this.metadata = songMetadata;
    this.lyrics = songLyrics;
  }

  getMetadata() {
    return this.metadata;
  }

  setMetadata(songMetadata) {
    this.metadata = songMetadata;
  }

  getLyrics() {
    return this.lyrics;
  }

  setLyrics(songLyrics) {
    this.lyrics = songLyrics;
  }

  // Convenience disply method
  displaySong() {
    console.log(`Title: ${this.metadata.getTitle()}`);
    console.log(`Artist: ${this.metadata.getArtist()}`);
    console.log(`Album: ${this.metadata.getAlbum()}`);
    console.log(`Genius URL: ${this.metadata.getUrl()}`);
  }
}

export default Song;
