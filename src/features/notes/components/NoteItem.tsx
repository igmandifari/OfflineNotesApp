import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Note } from '../types/note.types';
import { Swipeable } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNotesStore } from '../store/useNotesStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/navigation/AppNavigator';

interface Props {
  note: Note;
}
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NotesList'
>;
const NoteItem = ({ note }: Props) => {
const deleteNote = useNotesStore((s) => s.deleteNote);
const navigation = useNavigation<NavigationProp>();
const selectionMode = useNotesStore((s) => s.selectionMode);
const selectedNotes = useNotesStore((s) => s.selectedNotes);
const isSelected = selectedNotes.includes(note.id);
const toggleSelectionMode = useNotesStore((s) => s.toggleSelectionMode);
const toggleSelectNote = useNotesStore((s) => s.toggleSelectNote);
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
      <Pressable
        onPress={() => {
          if (selectionMode) {
            toggleSelectNote(note.id);
          } else {
            navigation.navigate('NoteEditor', { note });
          }
        }}
        onLongPress={() => {
          if (!selectionMode) {
            toggleSelectionMode();
          }
          toggleSelectNote(note.id);
        }}
      >
        <View
          style={[
            styles.card,
            isSelected && styles.selectedCard
          ]}
        >
          <Text style={styles.title}>{note.title}</Text>
  
          {note.content ? (
            <Text numberOfLines={2} style={styles.preview}>
              {note.content}
            </Text>
          ) : null}
  
          <View style={styles.footer}>
            <Text style={styles.date}>
              {new Date(note.updated_at).toLocaleString()}
            </Text>
          </View>
        </View>
      </Pressable>
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

  selectedCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#EAF2FF',
  },
});