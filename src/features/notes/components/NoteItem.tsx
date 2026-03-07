import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Note } from '../types/note.types';

interface Props {
  note: Note;
}

const NoteItem = ({ note }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{note.title}</Text>

      <Text numberOfLines={2} style={styles.preview}>
        {note.content}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.date}>
          {new Date(note.updated_at).toLocaleString()}
        </Text>

        <Text style={styles.sync}>{note.sync_status}</Text>
      </View>
    </View>
  );
};

export default React.memo(NoteItem);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  preview: {
    marginTop: 6,
    color: '#666',
  },

  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  date: {
    fontSize: 12,
    color: '#999',
  },

  sync: {
    fontSize: 12,
    color: '#007AFF',
  },
});