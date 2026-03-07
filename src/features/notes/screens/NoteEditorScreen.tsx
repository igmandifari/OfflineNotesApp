import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import { useNotesStore } from '../store/useNotesStore';
import { useNavigation } from '@react-navigation/native';

const NoteEditorScreen = () => {
  const createNote = useNotesStore((s) => s.createNote);
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSave = async () => {
    if (!title.trim()) return;
  
    await createNote(title, content);
  
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.title}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Write your note..."
        style={styles.content}
        value={content}
        onChangeText={setContent}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={onSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteEditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },

  content: {
    flex: 1,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});