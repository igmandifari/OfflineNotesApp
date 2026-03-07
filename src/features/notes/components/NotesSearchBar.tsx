import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface Props {
  onSearch: (text: string) => void;
}

let timer: ReturnType<typeof setTimeout>;

const NotesSearchBar = ({ onSearch }: Props) => {
  const [value, setValue] = useState('');

  const handleSearch = (text: string) => {
    setValue(text);

    clearTimeout(timer);

    timer = setTimeout(() => {
      onSearch(text);
    }, 400);
  };

  return (
    <TextInput
      placeholder="Search notes..."
      style={styles.input}
      value={value}
      onChangeText={handleSearch}
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