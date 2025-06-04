// QuickNote Organizer constants

// Theme colors
export const COLORS = {
  PRIMARY: '#4A90E2',
  SECONDARY: '#FFFFFF',
  ACCENT: '#F5A623',
};

// Font and styling constants
export const FONT_FAMILY = 'SF Pro Text, Helvetica, Arial, sans-serif';
export const CARD_BORDER_RADIUS = '8px';
export const SHADOW = '0 2px 10px rgba(0, 0, 0, 0.1)';

// Category constants (predefined categories)
export interface Category {
  id: string;
  label: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All', color: COLORS.PRIMARY },
  { id: 'personal', label: 'Personal', color: '#6ABE30' },
  { id: 'work', label: 'Work', color: '#E53935' },
  { id: 'ideas', label: 'Ideas', color: '#FF9800' },
  { id: 'tasks', label: 'Tasks', color: '#9C27B0' },
];

// Animation constants
export const CARD_ANIMATION_DURATION = 15; // frames
export const FADE_ANIMATION_DURATION = 10; // frames
export const STAGGER_DELAY = 3; // frames delay between items
