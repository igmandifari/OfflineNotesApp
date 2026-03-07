import { createNotesTable } from './migrations/001_create_notes_table';

export const runMigrations = async () => {
  await createNotesTable();
};