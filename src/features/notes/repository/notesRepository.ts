import uuid from 'react-native-uuid';
import dayjs from 'dayjs';

import {
  insertNote,
  updateNote,
  softDeleteNote,
  getNotes,
  searchNotes,
} from '../storage/notesStorage';

import { Note } from '../types/note.types';

const PAGE_SIZE = 10;

export const NotesRepository = {
  async createNote(title: string, content?: string): Promise<Note> {
    const now = dayjs().valueOf();

    const note: Note = {
      id: uuid.v4() as string,
      title,
      content,
      created_at: now,
      updated_at: now,
      is_deleted: 0,
    };

    await insertNote(note);

    return note;
  },

  async editNote(note: Note): Promise<void> {
    const updatedNote: Note = {
      ...note,
      updated_at: dayjs().valueOf(),
    };

    await updateNote(updatedNote);
  },

  async deleteNote(id: string): Promise<void> {
    await softDeleteNote(id);
  },

  async fetchNotes(page: number) {
    const offset = page * PAGE_SIZE;

    return getNotes(PAGE_SIZE, offset);
  },

  async search(query: string, page: number) {
    const offset = page * PAGE_SIZE;

    return searchNotes(query, PAGE_SIZE, offset);
  },
};