import React, { useState } from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../constants';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { NoteList } from './NoteList';
import { AddNoteButton } from './AddNoteButton';
import { NoteForm } from './NoteForm';
import { useNotes } from '../hooks/useNotes';
import { Note } from '../models/Note';

/**
 * Main container component for the QuickNote Organizer application
 */
export const MainContainer: React.FC = () => {
  const { width, height } = useVideoConfig();
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  
  // Use our custom notes hook for state management
  const {
    notes,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    addNote,
    updateNote,
    deleteNote
  } = useNotes();
  
  // Handle adding a new note
  const handleAddNote = () => {
    setNoteToEdit(null);
    setShowNoteForm(true);
  };
  
  // Handle editing an existing note
  const handleEditNote = (note: Note) => {
    setNoteToEdit(note);
    setShowNoteForm(true);
  };
  
  // Handle saving a note (create or update)
  const handleSaveNote = (noteData: { title: string; content: string; category: string }) => {
    if (noteToEdit) {
      updateNote(noteToEdit.id, noteData);
    } else {
      addNote(noteData.title, noteData.content, noteData.category);
    }
    setShowNoteForm(false);
    setNoteToEdit(null);
  };
  
  // Handle cancelling note form
  const handleCancelNoteForm = () => {
    setShowNoteForm(false);
    setNoteToEdit(null);
  };
  
  // Main container styles
  const containerStyle: React.CSSProperties = {
    backgroundColor: '#F5F7FA',
    fontFamily: FONT_FAMILY,
  };
  
  const headerStyle: React.CSSProperties = {
    width: '100%',
    padding: '20px 16px',
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.SECONDARY,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };
  
  const titleStyle: React.CSSProperties = {
    margin: '0',
    fontSize: '24px',
    fontWeight: 600,
  };
  
  const subtitleStyle: React.CSSProperties = {
    margin: '4px 0 0 0',
    fontSize: '14px',
    fontWeight: 400,
    opacity: 0.8,
  };
  
  const contentContainerStyle: React.CSSProperties = {
    paddingTop: '10px',
    height: 'calc(100% - 80px)',
    display: 'flex',
    flexDirection: 'column',
  };
  
  return (
    <AbsoluteFill style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>QuickNote Organizer</h1>
        <p style={subtitleStyle}>Organize your thoughts with ease</p>
      </div>
      
      {/* Content Area */}
      <div style={contentContainerStyle}>
        {/* Search Bar */}
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        
        {/* Category Filters */}
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
        
        {/* Notes List */}
        <NoteList 
          notes={notes}
          onEditNote={handleEditNote}
          onDeleteNote={deleteNote}
        />
      </div>
      
      {/* Floating Action Button */}
      <AddNoteButton onClick={handleAddNote} />
      
      {/* Note Form (Modal) */}
      {showNoteForm && (
        <NoteForm 
          note={noteToEdit}
          onSave={handleSaveNote}
          onCancel={handleCancelNoteForm}
        />
      )}
    </AbsoluteFill>
  );
};
