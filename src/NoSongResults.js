import React from 'react';

const NoResults = ({ filteredSongs, searchTerm }) => {
  return (
    <div>
      {searchTerm && filteredSongs.length === 0 && (
        <p className="no-results">No songs found</p>
      )}
    </div>
  );
}

export default NoResults;
