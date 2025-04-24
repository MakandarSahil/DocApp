import React from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentItem from './DocumentItem';
import { Document } from '../types/document'; // Import the shared interface
import { useAuth } from '../context/AuthContext';
import { useDocuments } from '../context/DocumentsContext';
import { useNavigation } from '@react-navigation/native';
import { downloadDocument } from '../utils/documentHandlers';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

interface Props {
  // documents: Document[];
  // status: string;
  // onPreview: (document: Document) => void;
  // onDownload: (document: Document) => void;
  // isLoading?: boolean;
  query?: string;
  isAllDocsScreen?: boolean;
}

const DocumentList: React.FC<Props> = ({ query, isAllDocsScreen = false }) => {

  const { documents, isLoading, status, } = useDocuments();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePreview = (document: Document) => {
    navigation.navigate('DocumentDetails', { document });
  };

  const handleDownload = (document: Document) => {
    try {
      downloadDocument(document);
      Alert.alert("Download Started", `${document.title} is being downloaded.`);
    } catch (error) {
      Alert.alert("Download Error", "Unable to download this document. Please try again later.");
    }
  };

  const filterDocument = query
    ? documents.filter((doc: Document) =>
      doc.title.toLowerCase().includes(query.toLowerCase())
    )
    : documents;

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading documents...</Text>
      </View>
    );
  }

  const userRole = useAuth()?.user?.role;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {isAllDocsScreen
          ? 'All Documents'
          : `${status.charAt(0).toUpperCase() + status.slice(1)} Documents (${filterDocument.length})`}
      </Text>

      <FlatList
        data={filterDocument}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={({ item }) => (
          <DocumentItem
            document={item}
            onPreview={handlePreview}
            onDownload={handleDownload}
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
                Check Search Spelling
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
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 4,
    color: '#111827',
  },
  listContent: {
    padding: 4,
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
