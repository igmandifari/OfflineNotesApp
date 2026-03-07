import { create } from 'zustand';
import { Note } from '../types/note.types';
import { NotesRepository } from '../repository/notesRepository';

interface NotesState {
  notes: Note[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  searchQuery: string;

  deletedNote?: Note;
  undoTimer?: ReturnType<typeof setTimeout>;

  fetchNotes: () => Promise<void>;
  refreshNotes: () => Promise<void>;
  searchNotes: (query: string) => Promise<void>;

  createNote: (title: string, content?: string) => Promise<void>;
  updateNote: (note: Note) => Promise<void>;

  deleteNote: (note: Note) => Promise<void>;
  undoDelete: () => void;

  sortBy: 'created' | 'updated';
  setSortBy: (sort: 'created' | 'updated') => void;
  
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  loading: false,
  page: 0,
  hasMore: true,
  searchQuery: '',

  deletedNote: undefined,
  undoTimer: undefined,
  
  sortBy: 'updated',
  setSortBy: (sort) => {
    set({ sortBy: sort, page: 0, notes: [] });
    get().fetchNotes();
  },

  fetchNotes: async () => {
    const { page, notes, searchQuery,sortBy } = get();

    set({ loading: true });

    const data = searchQuery
        ? await NotesRepository.search(searchQuery, page, sortBy)
        : await NotesRepository.fetchNotes(page, sortBy);

    set({
      notes: [...notes, ...data],
      page: page + 1,
      hasMore: data.length > 0,
      loading: false,
    });
  },

  refreshNotes: async () => {
    set({ page: 0, notes: [] });
    await get().fetchNotes();
  },

  searchNotes: async (query: string) => {
    set({
      searchQuery: query,
      page: 0,
      notes: [],
    });

    await get().fetchNotes();
  },

  createNote: async (title, content) => {
    const note = await NotesRepository.createNote(title, content);

    set((state) => ({
      notes: [note, ...state.notes],
    }));
  },

  updateNote: async (note) => {
    await NotesRepository.editNote(note);

    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === note.id ? { ...note } : n
      ),
    }));
  },

  deleteNote: async (note) => {
    const timer = setTimeout(async () => {
      await NotesRepository.deleteNote(note.id);
  
      set({ deletedNote: undefined });
    }, 5000);
  
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== note.id),
      deletedNote: note,
      undoTimer: timer,
    }));
  },

  undoDelete: () => {
    const { deletedNote, undoTimer } = get();
  
    if (!deletedNote) return;
  
    if (undoTimer) {
      clearTimeout(undoTimer);
    }
  
    set((state) => ({
      notes: [deletedNote, ...state.notes],
      deletedNote: undefined,
      undoTimer: undefined,
    }));
  },
}));