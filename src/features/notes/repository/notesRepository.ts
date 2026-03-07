import uuid from 'react-native-uuid';
import dayjs from 'dayjs';

import {
  insertNote,
  updateNote,
  softDeleteNote,
  getNotes,
  searchNotes,
  updateNoteStatus,
} from '../storage/notesStorage';
import { useNotesStore } from '../store/useNotesStore';
import { Note, SyncStatus } from '../types/note.types';

const PAGE_SIZE = 10;
const simulateSync = (id: string) => {
    setTimeout(async () => {
  
      const success = Math.random() > 0.5; 
  
      if (success) {
        await updateNoteStatus(id, 'synced');
        useNotesStore.getState().updateSyncStatus(id, 'synced');
      } else {
        await updateNoteStatus(id, 'failed');
        useNotesStore.getState().updateSyncStatus(id, 'failed');
      }
  
    }, 1500);
  };
export const NotesRepository = {
  sync_status: 'pending' as SyncStatus,
    
  async createNote(title: string, content?: string): Promise<Note> {
    const now = dayjs().valueOf();

    const note: Note = {
      id: uuid.v4() as string,
      title,
      content,
      created_at: now,
      updated_at: now,
      is_deleted: 0,
      sync_status: 'pending',
    };

    await insertNote(note);
    simulateSync(note.id);
    return note;
  },

  async editNote(note: Note) {
    const updatedNote: Note = {
      ...note,
      updated_at: Date.now(),
      sync_status: 'pending' as SyncStatus,
    };
  
    await updateNote(updatedNote);
  
    simulateSync(note.id);
  },

  async deleteNote(id: string): Promise<void> {
    await softDeleteNote(id);
  },

  async fetchNotes(page: number, sortBy: 'created' | 'updated') {
    const offset = page * PAGE_SIZE;
  
    return getNotes(PAGE_SIZE, offset, sortBy);
  },

  async search(query: string, page: number, sortBy: 'created' | 'updated') {
    const offset = page * PAGE_SIZE;
  
    return searchNotes(query, PAGE_SIZE, offset, sortBy);
  }
};