import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NotesListScreen from '@/features/notes/screens/NotesListScreen';
import NoteEditorScreen from '@/features/notes/screens/NoteEditorScreen';
import { Note } from '@/features/notes/types/note.types';

export type RootStackParamList = {
  NotesList: undefined;
  NoteEditor: { note?: Note };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NotesList"
          component={NotesListScreen}
          options={{ title: 'Notes' }}
        />

        <Stack.Screen
          name="NoteEditor"
          component={NoteEditorScreen}
          options={{ title: 'Note' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;