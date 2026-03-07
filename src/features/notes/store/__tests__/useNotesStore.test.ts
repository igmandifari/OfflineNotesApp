import { useNotesStore } from "../../store/useNotesStore";

describe('useNotesStore', () => {
  it('should add note to state', async () => {
    const store = useNotesStore.getState();

    await store.createNote('Test', 'Content');

    const notes = useNotesStore.getState().notes;

    expect(notes.length).toBeGreaterThan(0);
  });
});