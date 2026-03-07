import { create } from 'zustand';
import { Note } from '../types/note.types';
import { NotesRepository } from '../repository/notesRepository';

interface NotesState {
  notes: Note[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  searchQuery: string;

  deletedNotes: Note[];
  undoTimer?: ReturnType<typeof setTimeout>;

  sortBy: 'created' | 'updated';
  setSortBy: (sort: 'created' | 'updated') => void;

  selectionMode: boolean;
  selectedNotes: string[];

  toggleSelectionMode: () => void;
  toggleSelectNote: (id: string) => void;
  clearSelection: () => void;
  deleteSelected: () => Promise<void>;

  fetchNotes: () => Promise<void>;
  refreshNotes: () => Promise<void>;
  searchNotes: (query: string) => Promise<void>;

  createNote: (title: string, content?: string) => Promise<void>;
  updateNote: (note: Note) => Promise<void>;

  deleteNote: (note: Note) => Promise<void>;
  undoDelete: () => void;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  loading: false,
  page: 0,
  hasMore: true,
  searchQuery: '',

  deletedNotes: [],
  undoTimer: undefined,

  sortBy: 'updated',

  selectionMode: false,
  selectedNotes: [],

  setSortBy: (sort) => {
    set({ sortBy: sort, page: 0, notes: [] });
    get().fetchNotes();
  },

  toggleSelectionMode: () => {
    set((state) => ({
      selectionMode: !state.selectionMode,
      selectedNotes: [],
    }));
  },

  toggleSelectNote: (id) => {
    set((state) => {
      const exists = state.selectedNotes.includes(id);

      return {
        selectedNotes: exists
          ? state.selectedNotes.filter((n) => n !== id)
          : [...state.selectedNotes, id],
      };
    });
  },

  clearSelection: () => {
    set({
      selectionMode: false,
      selectedNotes: [],
    });
  },

  deleteSelected: async () => {
    const { selectedNotes, notes } = get();
  
    const notesToDelete = notes.filter((n) =>
      selectedNotes.includes(n.id)
    );
  
    const timer = setTimeout(async () => {
      for (const note of notesToDelete) {
        await NotesRepository.deleteNote(note.id);
      }
  
      set({ deletedNotes: [] });
    }, 5000);
  
    set({
      notes: notes.filter((n) => !selectedNotes.includes(n.id)),
      deletedNotes: notesToDelete,
      undoTimer: timer,
      selectedNotes: [],
      selectionMode: false,
    });
  },

  fetchNotes: async () => {
    const { page, notes, searchQuery, sortBy } = get();

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
      set({ deletedNotes: [] });
    }, 5000);
  
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== note.id),
      deletedNotes: [note],
      undoTimer: timer,
    }));
  },

  undoDelete: () => {
    const { deletedNotes, undoTimer } = get();
  
    if (!deletedNotes.length) return;
  
    if (undoTimer) {
      clearTimeout(undoTimer);
    }
  
    set((state) => ({
      notes: [...deletedNotes, ...state.notes],
      deletedNotes: [],
      undoTimer: undefined,
    }));
  },
}));