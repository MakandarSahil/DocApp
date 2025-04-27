import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentItem from './DocumentItem';
import { Document } from '../types/document';
import { useAuth } from '../context/AuthContext';
import { useDocuments, User } from '../context/DocumentsContext'; // Import User from the same file
import { useNavigation } from '@react-navigation/native';
import { downloadDocument } from '../utils/documentHandlers';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

interface Props {
  query?: string;
  isAllDocsScreen?: boolean;
  createdBy?: User | null; // New prop to filter by creator
}

const DocumentList: React.FC<Props> = ({ query, isAllDocsScreen = false, createdBy }) => {
  const {
    documents,
    isLoading,
    status,
    refreshDocuments,
    setCreatedBy
  } = useDocuments();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [refreshing, setRefreshing] = useState(false);
  const userRole = useAuth()?.user?.role;

  // Set the createdBy filter when the prop changes
  useEffect(() => {
    if (createdBy !== undefined) {
      setCreatedBy(createdBy);
    }
  }, [createdBy, setCreatedBy]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshDocuments().finally(() => setRefreshing(false));
  }, [refreshDocuments]);

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

  if (isLoading && !refreshing) {
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
        {isAllDocsScreen
          ? 'All Documents'
          : `${status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Documents'} (${filterDocument.length})`}
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
              {createdBy
                ? `No documents found created by ${createdBy.fullName}`
                : `No ${status?.toLowerCase() ?? 'documents'} found for ${userRole}.`}
            </Text>
            {query && (
              <Text style={styles.emptySubText}>
                Check Search Spelling
              </Text>
            )}
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3B82F6"
          />
        }
      />
    </View>
  );
};

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
  },
});

export default DocumentList;