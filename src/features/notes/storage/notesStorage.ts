import { executeQuery } from '@/database/Database';
import { Note } from '../types/note.types';

const mapRows = (result: any) => {
  const rows = [];

  for (let i = 0; i < result[0].rows.length; i++) {
    rows.push(result[0].rows.item(i));
  }

  return rows;
};

export const insertNote = async (note: Note) => {
  await executeQuery(
    `INSERT INTO notes 
    (id, title, content, created_at, updated_at, is_deleted)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      note.id,
      note.title,
      note.content,
      note.created_at,
      note.updated_at,
      note.is_deleted,
    ]
  );
};

export const updateNote = async (note: Note) => {
  await executeQuery(
    `UPDATE notes 
     SET title=?, content=?, updated_at=?
     WHERE id=?`,
    [
      note.title,
      note.content,
      note.updated_at,
      note.id,
    ]
  );
};

export const softDeleteNote = async (id: string) => {
  await executeQuery(
    `UPDATE notes 
     SET is_deleted=1 
     WHERE id=?`,
    [id]
  );
};

export const getNotes = async (
    limit: number,
    offset: number,
    sortBy: 'created' | 'updated'
  ): Promise<Note[]> => {
    const column = sortBy === 'created' ? 'created_at' : 'updated_at';
  
    const query = `
      SELECT *
      FROM notes
      WHERE is_deleted = 0
      ORDER BY ${column} DESC
      LIMIT ? OFFSET ?
    `;
  
    const result = await executeQuery(query, [limit, offset]);
  
    const rows = result[0].rows;
  
    const notes: Note[] = [];
  
    for (let i = 0; i < rows.length; i++) {
      notes.push(rows.item(i));
    }
  
    return notes;
  };

  export const searchNotes = async (
    query: string,
    limit: number,
    offset: number,
    sortBy: 'created' | 'updated'
  ): Promise<Note[]> => {
    const column = sortBy === 'created' ? 'created_at' : 'updated_at';
  
    const sql = `
      SELECT *
      FROM notes
      WHERE is_deleted = 0
      AND (title LIKE ? OR content LIKE ?)
      ORDER BY ${column} DESC
      LIMIT ? OFFSET ?
    `;
  
    const searchQuery = `%${query}%`;
  
    const result = await executeQuery(sql, [
      searchQuery,
      searchQuery,
      limit,
      offset,
    ]);
  
    const rows = result[0].rows;
  
    const notes: Note[] = [];
  
    for (let i = 0; i < rows.length; i++) {
      notes.push(rows.item(i));
    }
  
    return notes;
  };