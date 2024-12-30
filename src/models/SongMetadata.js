class SongMetadata {
  constructor(title, film, artist, album, albumArtUrl, urlGenius) {
    this.title = title;
    this.film = film;
    this.artist = artist;
    this.album = album || '';
    this.urlAlbumArt = urlAlbumArt || '';
    this.urlGenius = urlGenius || '';
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getFilm() {
    return this.film;
  }

  setFilm(film) {
    this.film = film;
  }

  getArtist() {
    return this.artist;
  }

  setArtist(artist) {
    this.artist = artist;
  }

  getAlbum() {
    return this.album;
  }

  setAlbum(album) {
    this.album = album;
  }

  getUrlAlbumArt() {
    return this.urlAlbumArt;
  }

  setUrlAlbumArt(url) {
    this.urlAlbumArt = url;
  }

  getUrlGenius() {
    return this.urlGenius;
  }

  setUrl(url) {
    this.urlGenius = url;
  }
}

export default SongMetadata;
