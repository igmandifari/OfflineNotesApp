import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNotesStore } from '../store/useNotesStore';

const UndoSnackbar = () => {
  const deletedNote = useNotesStore((s) => s.deletedNote);
  const undoDelete = useNotesStore((s) => s.undoDelete);

  if (!deletedNote) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Note deleted</Text>

      <TouchableOpacity onPress={undoDelete}>
        <Text style={styles.undo}>UNDO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UndoSnackbar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    color: 'white',
  },

  undo: {
    color: '#4DA6FF',
    fontWeight: '600',
  },
});