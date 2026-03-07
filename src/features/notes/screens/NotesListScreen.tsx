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
import { Pressable } from 'react-native';

const NotesListScreen = () => {
  const {
    notes,
    loading,
    hasMore,
    fetchNotes,
    refreshNotes,
    searchNotes,
  } = useNotesStore();
  type NavigationProp = NativeStackNavigationProp<RootStackParamList,'NotesList'>;
  const navigation = useNavigation<NavigationProp>();
  const sortBy = useNotesStore((s) => s.sortBy);
  const setSortBy = useNotesStore((s) => s.setSortBy);
  const renderItem: ListRenderItem<Note> = useCallback(
      ({ item }) => <NoteItem note={item} />,
      []
    );
    
    const renderFooter = () => {
        if (!loading) return null;
        
        return <ActivityIndicator style={{ margin: 20 }} />;
    };
    
    const selectionMode = useNotesStore((s) => s.selectionMode);
    const selectedNotes = useNotesStore((s) => s.selectedNotes);
    const deleteSelected = useNotesStore((s) => s.deleteSelected);
    const clearSelection = useNotesStore((s) => s.clearSelection);
    useEffect(() => {
        fetchNotes();
      }, []);
      

  return (
    <View style={styles.container}>
      <NotesSearchBar onSearch={searchNotes} />
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort:</Text>

        <Pressable
            style={[
            styles.sortButton,
            sortBy === 'updated' && styles.sortActive,
            ]}
            onPress={() => setSortBy('updated')}
        >
            <Text>Updated</Text>
        </Pressable>

        <Pressable
            style={[
            styles.sortButton,
            sortBy === 'created' && styles.sortActive,
            ]}
            onPress={() => setSortBy('created')}
        >
            <Text>Created</Text>
        </Pressable>
    </View>
    {selectionMode && (
    <View style={styles.bulkBar}>
        <Text>{selectedNotes.length} selected</Text>

        <TouchableOpacity onPress={deleteSelected}>
        <Text style={{ color: 'red' }}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clearSelection}>
        <Text>Cancel</Text>
        </TouchableOpacity>
    </View>
    )}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoteItem note={item} />}
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
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NoteEditor', {})}>
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
    bottom: 20,
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
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  sortLabel: {
    marginRight: 8,
    fontWeight: '500',
  },
  
  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  
  sortActive: {
    backgroundColor: '#007AFF',
  },

  bulkBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
});