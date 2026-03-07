import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Note } from '../types/note.types';
import { Swipeable } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { useNotesStore } from '../store/useNotesStore';

interface Props {
  note: Note;
}

const NoteItem = ({ note }: Props) => {
const deleteNote = useNotesStore((s) => s.deleteNote);
const getStatusColor = () => {
    switch (note.sync_status) {
      case 'synced':
        return 'green';
      case 'pending':
        return 'orange';
      case 'failed':
        return 'red';
    }
  };
const renderRightActions = () => {
  return (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteNote(note)}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );
};
  return (
    <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.card}>
        <Text style={styles.title}>{note.title}</Text>

        <Text numberOfLines={2} style={styles.preview}>
            {note.content}
        </Text>

        <View style={styles.footer}>
            <Text style={styles.date}>
            {new Date(note.updated_at).toLocaleString()}
            </Text>

            <Text style={[styles.sync, { color: getStatusColor() }]}>
            ● {note.sync_status}
            </Text>
        </View>
        </View>
    </Swipeable>
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

  deleteButton: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    marginBottom: 12,
    borderRadius: 10,
  },
  
  deleteText: {
    color: 'white',
    fontWeight: '600',
  },
});