import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY, SHADOW } from '../constants';

/**
 * SearchBar component for finding notes
 */
export const SearchBar = ({ searchTerm, onSearchChange }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Animate the search bar entrance
  const translateY = spring({
    frame,
    fps,
    from: -50,
    to: 0,
    config: {
      damping: 15,
    },
  });
  
  // Animate opacity
  const opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 15,
    },
  });
  
  const containerStyle = {
    width: '100%',
    padding: '10px 16px',
    transform: `translateY(${translateY}px)`,
    opacity,
  };
  
  const searchBarStyle = {
    width: '100%',
    height: '48px',
    background: COLORS.SECONDARY,
    border: `1px solid #E0E0E0`,
    borderRadius: '24px',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: SHADOW,
  };
  
  const searchIconStyle = {
    marginRight: '10px',
    width: '20px',
    height: '20px',
    color: '#9E9E9E',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const inputStyle = {
    flex: 1,
    height: '100%',
    border: 'none',
    background: 'none',
    fontSize: '16px',
    fontFamily: FONT_FAMILY,
    color: '#333',
  };

  // Create a simple search icon
  const SearchIcon = () => (
    <div style={searchIconStyle}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 00-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#9E9E9E"/>
      </svg>
    </div>
  );
  
  return (
    <div style={containerStyle}>
      <div style={searchBarStyle}>
        <SearchIcon />
        <input
          style={inputStyle}
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};
