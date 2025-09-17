import React, { useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, searchTerm, isOpen, onClose }) => {
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  const handleClose = () => {
    onSearch('');
    onClose();
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          ref={inputRef}
          type="text"
          placeholder="Post search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        <button className="search-close" onClick={handleClose}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9" stroke="#9B9B9B" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
