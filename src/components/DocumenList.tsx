import React from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentItem from './DocumentItem';
import { Document } from '../types/document'; // Import the shared interface

interface Props {
  documents: Document[];
  status: string;
  userRole: string;
  onPreview: (document: Document) => void;
  onDownload: (document: Document) => void;
  isLoading?: boolean;
  query?: string;
}

const DocumentList: React.FC<Props> = ({ 
  documents, 
  status, 
  userRole, 
  onPreview, 
  onDownload,
  isLoading = false,
  query = ''
}) => {
  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading documents...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {status.charAt(0).toUpperCase() + status.slice(1)} Documents ({documents.length})
      </Text>
      
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DocumentItem 
            document={item} 
            onPreview={onPreview} 
            onDownload={onDownload} 
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          documents.length === 0 && styles.emptyListContent
        ]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="file-document-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>
              No {status.toLowerCase()} documents found for {userRole}.
            </Text>
            {query ? (
              <Text style={styles.emptySubText}>
                Try adjusting your search query.
              </Text>
            ) : null}
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    color: '#111827',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#9CA3AF',
  },
  emptySubText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#9CA3AF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  }
});

export default DocumentList;
