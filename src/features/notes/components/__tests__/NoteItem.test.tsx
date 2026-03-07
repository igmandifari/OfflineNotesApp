import React from 'react';
import { render } from '@testing-library/react-native';
import NoteItem from '../../components/NoteItem';

describe('NoteItem', () => {
  it('renders note title', () => {
    const note = {
      id: '1',
      title: 'Test Note',
      content: 'Content',
      created_at: Date.now(),
      updated_at: Date.now(),
      is_deleted: 0,
    };

    const { getByText } = render(<NoteItem note={note} />);

    expect(getByText('Test Note')).toBeTruthy();
  });
});