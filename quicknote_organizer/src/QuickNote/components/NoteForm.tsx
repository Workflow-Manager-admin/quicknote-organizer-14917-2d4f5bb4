import React, { useState, useEffect } from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, CATEGORIES, FONT_FAMILY, SHADOW, CARD_BORDER_RADIUS } from '../constants';
import { Note } from '../models/Note';

interface NoteFormProps {
  note: Note | null;
  onSave: (noteData: { title: string; content: string; category: string }) => void;
  onCancel: () => void;
}

/**
 * NoteForm component for adding and editing notes
 */
export const NoteForm: React.FC<NoteFormProps> = ({ note, onSave, onCancel }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isEdit = !!note;
  
  // Initialize form state from note or empty values
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [category, setCategory] = useState(note ? note.category : 'personal');
  
  // Animation properties
  const opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 15 },
  });
  
  const scale = spring({
    frame,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 15 },
  });
  
  // Reset form when note changes
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
    }
  }, [note]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, content, category });
  };
  
  // Styles
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    opacity,
  };
  
  const formContainerStyle: React.CSSProperties = {
    width: '90%',
    maxWidth: '500px',
    backgroundColor: COLORS.SECONDARY,
    borderRadius: CARD_BORDER_RADIUS,
    padding: '20px',
    boxShadow: SHADOW,
    transform: `scale(${scale})`,
  };
  
  const formHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  };
  
  const titleTextStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: '24px',
    fontWeight: 600,
    color: '#333',
    margin: 0,
  };
  
  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#999',
    fontSize: '24px',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    margin: '8px 0 16px',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
    fontFamily: FONT_FAMILY,
    fontSize: '16px',
    boxSizing: 'border-box',
  };
  
  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
  };
  
  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    height: '45px',
    cursor: 'pointer',
  };
  
  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '16px',
  };
  
  const buttonStyle: React.CSSProperties = {
    padding: '10px 16px',
    borderRadius: '4px',
    fontFamily: FONT_FAMILY,
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
  };
  
  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: '#F5F5F5',
    color: '#666',
  };
  
  const saveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: COLORS.PRIMARY,
    color: COLORS.SECONDARY,
  };
  
  const labelStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: '14px',
    fontWeight: 500,
    color: '#666',
  };
  
  return (
    <div style={overlayStyle}>
      <div style={formContainerStyle}>
        <div style={formHeaderStyle}>
          <h2 style={titleTextStyle}>{isEdit ? 'Edit Note' : 'New Note'}</h2>
          <button style={closeButtonStyle} onClick={onCancel}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#999"/>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle} htmlFor="title">Title</label>
            <input
              id="title"
              style={inputStyle}
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label style={labelStyle} htmlFor="content">Content</label>
            <textarea
              id="content"
              style={textareaStyle}
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label style={labelStyle} htmlFor="category">Category</label>
            <select
              id="category"
              style={selectStyle}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <div style={buttonContainerStyle}>
            <button type="button" style={cancelButtonStyle} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" style={saveButtonStyle}>
              {isEdit ? 'Update' : 'Create'} Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
