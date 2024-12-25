import React, { useState } from "react";

import './App.css';
import { SONGS_ALL } from './songs';
import GeniusService from './geniusService';
import useFetchSongs from "./hooks/useFetchSongs";  // Import the custom hook


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { songs, loading, error } = useFetchSongs(searchTerm);

  return (
    <div className="app-container">
      <h1 className="title">Shairee</h1>

      <input
        type="text"
        placeholder="Search for a song..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <ul>
        {songs && songs.map((song, index) => (
          <li key={index}>
            <strong>{song.title}</strong> — {song.primary_artist.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;





// import React, { useState, useEffect } from "react";

// import './App.css';
// import { fetchSongs } from "./genius"; // for Genius API
// import useFetchSongs from "./hooks/useFetchSongs";

// import SearchBar from "./components/SearchBar";
// import SongResults from "./components/SongResults";
// import NoSongResults from "./components/NoSongResults";


// const App = () => {
//   console.log("App component is rendering");

//   const [searchTerm, setSearchTerm] = useState("");

//   // Use the custom hook to fetch songs based on the searchTerm
//   const { songs, loading, error } = useFetchSongs(searchTerm);

//   useEffect(() => {
//     if (!SONGS || SONGS.length === 0) {
//       return;
//     }

//     const fuse = new Fuse(SONGS, {
//       keys: ["title", "artists"],
//       includeScore: false,
//       threshold: 0.3, // for fuzzy search
//     });

//     if (searchTerm.trim() === "") {
//       setFilteredSongs([]);
//       setHasSearched(false);
//     } else {
//       const results = fuse.search(searchTerm) || [];
//       setFilteredSongs(results.map(result => result.item));
//       setHasSearched(true);
//     }
//   }, [searchTerm]);

//   return (
//     <div className="app-container">
//       <div className="content-container">
//         <h1 className="title">शायरी</h1>
//         <h1 className="title">Shairee</h1>

//         <p className="description">
//           A humble place to understand and appreciate the lyrical beauty of Urdu & Hindi songs.
//         </p>

//         {/* Use SearchBar component here */}
//         <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

//         <SongResults filteredSongs={filteredSongs} searchTerm={searchTerm} />
//         <NoSongResults filteredSongs={filteredSongs} searchTerm={searchTerm} />
//       </div>
//     </div>
//   );
// }

// export default App;
