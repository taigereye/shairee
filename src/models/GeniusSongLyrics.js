const cheerio = require('cheerio');

class GeniusSongLyrics {
  constructor(html) {
    this.htmlRaw = html;
    this.contentRaw = '';
    this.contentFormatted;
  }

  getHtmlRaw() {
    return this.htmlRaw;
  }

  setHtmlRaw(html) {
    this.htmlRaw = html;
  }

  getContentRaw() {
    return this.htmlRaw;
  }

  setContentRaw(raw) {
    this.contentRaw = raw;
  }

  getContentFormatted() {
    return this.contentFormatted;
  }

  setContentFormatted(formatted) {
    this.contentFormatted = formatted;
  }

  extractLyricsFromHtml() {
    const $ = cheerio.load(this.htmlRaw);

    const contentFormatted = [];
    // Indicate which HTML blocks from which to extract lyrics
    const markers = ['Chorus', 'Verse'];

    $('div[data-lyrics-container="true"]').each((index, element) => {
      let type = '';
      let order = '';
      let words = '';

      // 1. Handle header (Chorus, Verse, etc.)

      $(element).find('h2').each((_, el) => {
        const headerText = $(el).text().trim();
        markers.forEach(marker => {
          if (headerText.includes(marker)) {
            type = marker.toLowerCase();
            // Extract number of chorus/verse
            order = headerText.replace(/\D/g, '');
          }
        });
      });

      // 2. Format lyrics content so they can be reconstructed in order

      let rawContent = $(element).html();
      // Makes splitting easier
      rawContent = rawContent.replace(/<br>/g, '\n');
      const lines = rawContent.split('\n');
      this.contentRaw = lines

      words = lines.map(line => {
        const trimmedLine = line.trim();

        if (trimmedLine && !trimmedLine.startsWith('<h2>')) {
          return `<p>${trimmedLine}</p>`;
        }
        else if (trimmedLine.startsWith('<h2>')) {
          // Don't want chorus/verse text to be too large
          return trimmedLine.replace('<h2>', '<h3>').replace('</h2>', '</h3>');
        }
        else {
          // Drop empty lines
          return '';
        }
      }).join('<br>');


      if (type) {
        finalContent.push({
          type: type,
          order: order,
          words: words
        });
      }
    });

    this.setContentFormatted(finalContent); 
  }
}

module.exports = GeniusSongLyrics;
