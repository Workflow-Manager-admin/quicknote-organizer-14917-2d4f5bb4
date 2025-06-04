import React, { useState } from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CATEGORIES, COLORS, FONT_FAMILY, SHADOW, CARD_BORDER_RADIUS } from '../constants';
import { Note } from '../models/Note';

interface NoteCardProps {
  note: Note;
  index: number;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
}

/**
 * NoteCard component for displaying a single note
 */
export const NoteCard: React.FC<NoteCardProps> = ({ note, index, onEdit, onDelete }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [showActions, setShowActions] = useState(false);
  
  // Delay animation based on index for staggered effect
  const delay = index * 5;
  
  // Animate card entrance
  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 15 },
  });
  
  const opacity = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 15 },
  });

  // Get category details
  const category = CATEGORIES.find(c => c.id === note.category) || CATEGORIES[0];
  
  // Format date
  const formatDate = (date: Date): string => {
    if (!(date instanceof Date)) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  
  const cardStyle: React.CSSProperties = {
    background: COLORS.SECONDARY,
    borderRadius: CARD_BORDER_RADIUS,
    padding: '16px',
    marginBottom: '12px',
    boxShadow: SHADOW,
    transform: `scale(${scale})`,
    opacity,
    position: 'relative',
  };
  
  const titleStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: '18px',
    fontWeight: 600,
    color: '#333',
    margin: '0 0 8px 0',
  };
  
  const contentStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: '14px',
    color: '#666',
    margin: '0 0 12px 0',
    lineHeight: '1.4',
  };
  
  const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  const categoryBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    background: category.color,
    color: COLORS.SECONDARY,
    fontSize: '12px',
    fontFamily: FONT_FAMILY,
    fontWeight: 500,
  };
  
  const dateStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#999',
    fontFamily: FONT_FAMILY,
  };
  
  const actionButtonsStyle: React.CSSProperties = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    display: 'flex',
    gap: '8px',
    opacity: showActions ? 1 : 0,
    transition: 'opacity 0.2s ease-in-out',
  };
  
  const buttonStyle: React.CSSProperties = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
  };
  
  const editButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: COLORS.PRIMARY,
    color: COLORS.SECONDARY,
  };
  
  const deleteButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: '#F44336',
    color: COLORS.SECONDARY,
  };
  
  return (
    <div 
      style={cardStyle}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <h3 style={titleStyle}>{note.title}</h3>
      <p style={contentStyle}>{note.getContentSnippet(120)}</p>
      
      <div style={footerStyle}>
        <div style={categoryBadgeStyle}>{category.label}</div>
        <div style={dateStyle}>{formatDate(note.updatedAt)}</div>
      </div>
      
      <div style={actionButtonsStyle}>
        <button 
          style={editButtonStyle}
          onClick={() => onEdit(note)}
          title="Edit note"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="white"/>
          </svg>
        </button>
        <button 
          style={deleteButtonStyle}
          onClick={() => onDelete(note.id)}
          title="Delete note"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
