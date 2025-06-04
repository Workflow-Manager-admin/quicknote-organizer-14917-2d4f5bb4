/**
 * Note model representing a single note in the QuickNote Organizer
 */
export class Note {
  /**
   * Create a new note
   * @param {string} id - Unique identifier
   * @param {string} title - Note title
   * @param {string} content - Note content
   * @param {string} category - Note category ID
   * @param {Date} createdAt - Creation date
   * @param {Date} updatedAt - Last update date
   */
  constructor(id, title, content, category = 'personal', createdAt = new Date(), updatedAt = new Date()) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Create a new note with generated ID
   * @param {string} title - Note title
   * @param {string} content - Note content
   * @param {string} category - Note category ID
   * @returns {Note} New note object
   */
  static create(title, content, category) {
    const id = `note_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    return new Note(id, title, content, category);
  }

  /**
   * Update an existing note
   * @param {object} data - Updated data (title, content, category)
   * @returns {Note} Updated note object
   */
  update(data) {
    const updatedNote = new Note(
      this.id,
      data.title || this.title,
      data.content || this.content,
      data.category || this.category,
      this.createdAt,
      new Date()
    );
    return updatedNote;
  }
  
  /**
   * Get a snippet of the note content
   * @param {number} length - Max length of snippet
   * @returns {string} Content snippet
   */
  getContentSnippet(length = 80) {
    if (this.content.length <= length) return this.content;
    return this.content.substring(0, length) + '...';
  }
}
