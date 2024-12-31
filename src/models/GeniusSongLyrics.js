const cheerio = require('cheerio');

class GeniusSongLyrics {
  constructor(html) {
    this.htmlRaw = html;
    this.lyrics = [];
  }

  getHtmlRaw() {
    return this.htmlRaw;
  }

  setHtmlRaw(html) {
    this.htmlRaw = html;
  }

  getLyrics() {
    return this.lyrics;
  }

  setLyrics(lyrics) {
    this.lyrics = lyrics;
  }

  static extractLyricsFromHtml() {
    const $ = cheerio.load(this.htmlRaw);

    const lyricsData = [];
    const markers = ['Chorus', 'Verse'];

    // 1. Extract lyrics text from blocks that contain HTML markers

    $('div[data-lyrics-container="true"]').each((index, element) => {
      let type = '';
      let order = '';
      let words = '';

      $(element).find('h2').each((_, el) => {
        const headerText = $(el).text().trim();
        markers.forEach(marker => {
          if (headerText.includes(marker)) {
            type = marker.toLowerCase();
            order = headerText.replace(/\D/g, '');
          }
        });
      });

      // 2. Structure lyrics such that they can be reconstructed in order

      let lyricContent = $(element).html();
      lyricContent = lyricContent.replace(/<br>/g, '\n');
      const lines = lyricContent.split('\n');
      words = lines.map(line => `<p>${line.trim()}</p>`).join('<br>');

      if (type) {
        lyricsData.push({
          type: type,
          order: order,
          words: words
        });
      }
    });

    this.setLyrics(lyricsData); 
  }
}

export default GeniusSongLyrics;
