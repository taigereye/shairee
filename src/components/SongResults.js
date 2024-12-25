import React from 'react';


const SongResults = ({ filteredSongs, searchTerm }) => {
  return (
    <div>
      {searchTerm && filteredSongs.length > 0 && (
        <ul className="song-results">
          {filteredSongs.map((song, index) => (
            <li key={index} className="song-item" onClick={() => handleSongClick(song)}>
              <div className="song-title">{song.title}</div>
              <div className="song-artists">
                — {song.artists.join(", ")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SongResults;
