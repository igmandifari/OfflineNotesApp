import React, { useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  ListRenderItem
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNotesStore } from '../store/useNotesStore';
import NoteItem from '../components/NoteItem';
import NotesSearchBar from '../components/NotesSearchBar';
import EmptyState from '../components/EmptyState';
import { Note } from '../types/note.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/navigation/AppNavigator';
import UndoSnackbar from '../components/UndoSnackbar';

const NotesListScreen = () => {
  const {
    notes,
    loading,
    hasMore,
    fetchNotes,
    refreshNotes,
    searchNotes,
  } = useNotesStore();
  useEffect(() => {
      fetchNotes();
    }, []);
    
  type NavigationProp = NativeStackNavigationProp<RootStackParamList,'NotesList'>;
  const navigation = useNavigation<NavigationProp>();

  const renderItem: ListRenderItem<Note> = useCallback(
    ({ item }) => <NoteItem note={item} />,
    []
  );

  const renderFooter = () => {
    if (!loading) return null;

    return <ActivityIndicator style={{ margin: 20 }} />;
  };


  return (
    <View style={styles.container}>
      <NotesSearchBar onSearch={searchNotes} />

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={() => {
          if (!loading && hasMore) {
            fetchNotes();
          }
        }}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={refreshNotes}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={!loading ? <EmptyState /> : null}
      />
      <UndoSnackbar />
    <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NoteEditor')}>
        <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
    </View>
  );
};

export default NotesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fabText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
  },
});