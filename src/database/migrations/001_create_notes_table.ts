import { executeQuery } from '../Database';

export const createNotesTable = async () => {
  await executeQuery(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      content TEXT,
      created_at INTEGER,
      updated_at INTEGER,
      sync_status TEXT,
      is_deleted INTEGER DEFAULT 0
    );
  `);
};