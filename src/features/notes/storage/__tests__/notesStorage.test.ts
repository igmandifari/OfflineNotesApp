import { insertNote } from '../notesStorage';

describe('notesStorage', () => {
  it('should insert note without error', async () => {
    const note = {
      id: '1',
      title: 'Test Note',
      content: 'Hello world',
      created_at: Date.now(),
      updated_at: Date.now(),
      is_deleted: 0,
    };

    await expect(insertNote(note)).resolves.not.toThrow();
  });
});