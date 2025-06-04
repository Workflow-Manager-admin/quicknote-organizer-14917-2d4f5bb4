import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, SHADOW } from '../constants';

interface AddNoteButtonProps {
  onClick: () => void;
}

/**
 * AddNoteButton component - Floating action button for adding new notes
 */
export const AddNoteButton: React.FC<AddNoteButtonProps> = ({ onClick }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Animate button entrance
  const scale = spring({
    frame: frame - 30, // Delay entrance
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 200 },
  });
  
  const rotation = spring({
    frame: frame - 30,
    fps,
    from: -45,
    to: 0,
    config: { damping: 15 },
  });
  
  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: COLORS.ACCENT,
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transform: `scale(${scale}) rotate(${rotation}deg)`,
    transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',
    fontSize: '24px',
  };
  
  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      title="Add new note"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="white"/>
      </svg>
    </button>
  );
};
