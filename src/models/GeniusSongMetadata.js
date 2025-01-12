class GeniusSongMetadata {
  constructor(id, title, film, artists, album, albumArtUrl, urlGenius) {
    this.id = id;
    this.title = title;
    this.film = film;
    this.artists = artists;
    this.album = album || '';
    this.urlAlbumArt = urlAlbumArt || '';
    this.urlGenius = urlGenius || '';
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
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

  getArtists() {
    return this.artists;
  }

  setArtists(artists) {
    this.artists = artists;
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

module.exports = GeniusSongMetadata;
