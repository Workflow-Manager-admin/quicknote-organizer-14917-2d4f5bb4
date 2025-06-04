import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CATEGORIES, COLORS, FONT_FAMILY, SHADOW, STAGGER_DELAY, Category } from '../constants';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

/**
 * CategoryFilter component for filtering notes by category
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const containerStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 16px',
    display: 'flex',
    overflowX: 'auto',
    gap: '10px',
    alignItems: 'center',
  };
  
  const filterStyle = (category: Category): React.CSSProperties => {
    const isSelected = category.id === selectedCategory;
    const baseStyle = {
      padding: '6px 16px',
      borderRadius: '20px',
      fontFamily: FONT_FAMILY,
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      boxShadow: isSelected ? SHADOW : 'none',
      background: isSelected ? category.color : '#F0F0F0',
      color: isSelected ? COLORS.SECONDARY : '#333',
    };
    return baseStyle;
  };
  
  // Generate filters from categories
  return (
    <div style={containerStyle}>
      {CATEGORIES.map((category, index) => {
        // Animate each category chip with a staggered delay
        const delay = index * STAGGER_DELAY;
        
        const translateY = spring({
          frame: frame - delay,
          fps,
          from: 30,
          to: 0,
          config: { damping: 15 },
        });
        
        const opacity = spring({
          frame: frame - delay,
          fps,
          from: 0,
          to: 1,
          config: { damping: 15 },
        });
        
        return (
          <div 
            key={category.id}
            style={{
              ...filterStyle(category),
              transform: `translateY(${translateY}px)`,
              opacity,
            }}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </div>
        );
      })}
    </div>
  );
};
