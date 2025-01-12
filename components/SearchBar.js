import React, { useState, useEffect } from 'react'; // Add useState and useEffect import

import styles from '../styles/components/SearchBar.module.css';


const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [hasSearched, setHasSearched] = useState(false); // Track if search has been made

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setHasSearched(false);
    } else {
      setHasSearched(true);
    }
  }, [searchTerm]);

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search for a song... gana... गाना..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchBar}
      />
    </div>
  );
};

export default SearchBar;
