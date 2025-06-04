import React from 'react';
import { NoteCard } from './NoteCard';

/**
 * NoteList component for displaying a collection of notes
 */
export const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 16px',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 180px)', // Allow scrolling
  };
  
  const emptyStateStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0',
    textAlign: 'center',
    color: '#999',
    fontFamily: 'SF Pro Text, Helvetica, Arial, sans-serif',
  };
  
  // If no notes match the filters, show empty state
  if (notes.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={emptyStateStyle}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="#CCCCCC"/>
            <path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#CCCCCC"/>
          </svg>
          <h3>No notes found</h3>
          <p>Try changing your search or category filter</p>
        </div>
      </div>
    );
  }
  
  return (
    <div style={containerStyle}>
      {notes.map((note, index) => (
        <NoteCard
          key={note.id}
          note={note}
          index={index}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  );
};
