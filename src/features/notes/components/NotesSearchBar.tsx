import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface Props {
  onSearch: (text: string) => void;
}

const NotesSearchBar = ({ onSearch }: Props) => {
  return (
    <TextInput
      placeholder="Search notes..."
      style={styles.input}
      onChangeText={onSearch}
    />
  );
};

export default NotesSearchBar;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
});