const GeniusSongLyrics = require('../src/models/GeniusSongLyrics');
const fs = require('fs');

const html = `
<div data-lyrics-container="true">
  <h2>Chorus 1</h2>
  जिया जले, जान जले<br>नैनों तले धूँआ चले<br>धुआँ चले
</div>
<div data-lyrics-container="true">
  <h2>Verse 1</h2>
  रात भर धुआँ चले<br>जानूँ ना, जानूँ ना, जानूँ ना सखी रे
</div>
`;

const songLyrics = new GeniusSongLyrics(html);

// Extract lyrics and store in the instance
songLyrics.extractLyricsFromHtml();

// Get the extracted lyrics
const extractedLyrics = songLyrics.getLyrics();

// Log the results for verification
console.log(JSON.stringify(extractedLyrics, null, 2));
