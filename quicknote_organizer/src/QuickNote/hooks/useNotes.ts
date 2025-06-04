import { useState, useCallback } from 'react';
import { Note } from '../models/Note';

// Sample initial notes data
const initialNotes = [
  new Note('note_1', 'Welcome to QuickNote Organizer', 'This is a simple note-taking application built with Remotion.', 'personal'),
  new Note('note_2', 'How to use', 'Click the "+" button to add a new note. Click on a note to edit it. Use the search bar to find notes.', 'ideas'),
  new Note('note_3', 'Meeting Notes', 'Discuss project timeline and resource allocation.', 'work'),
  new Note('note_4', 'Shopping List', 'Milk, eggs, bread, fruits, vegetables.', 'tasks'),
];

/**
 * Custom hook for managing notes collection
 * @returns {Object} Notes state and operations
 */
export const useNotes = () => {
  // State for notes collection
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  /**
   * Add a new note
   * @param {string} title - Note title
   * @param {string} content - Note content
   * @param {string} category - Note category
   */
  const addNote = useCallback((title: string, content: string, category: string) => {
    const newNote = Note.create(title, content, category);
    setNotes(prevNotes => [newNote, ...prevNotes]);
  }, []);
  
  /**
   * Update an existing note
   * @param {string} id - Note ID
   * @param {object} data - Updated data
   */
  const updateNote = useCallback((id: string, data: { title?: string; content?: string; category?: string }) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? note.update(data) : note
      )
    );
  }, []);
  
  /**
   * Delete a note by ID
   * @param {string} id - Note ID
   */
  const deleteNote = useCallback((id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }, []);
  
  /**
   * Get filtered notes based on search term and selected category
   */
  const filteredNotes = notes.filter(note => {
    // Filter by category if not "all"
    const categoryMatch = selectedCategory === 'all' || note.category === selectedCategory;
    
    // Filter by search term
    const searchMatch = 
      searchTerm === '' || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });
  
  return {
    notes: filteredNotes,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    addNote,
    updateNote,
    deleteNote
  };
};
