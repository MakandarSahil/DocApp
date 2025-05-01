import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentItem from './DocumentItem';
import { Document } from '../types/document';
import { useAuth } from '../context/AuthContext';
import { useDocuments } from '../context/DocumentsContext';
import { User } from '../types/user'
import { useNavigation } from '@react-navigation/native';
import { downloadDocument } from '../utils/documentHandlers';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { downloadAndOpenPdf } from '../hooks/useFileHandlers';

interface Props {
  query?: string;
  isAllDocsScreen?: boolean;
  createdBy?: string;
}

// Define filter types
interface Filters {
  status: string | null;
  documentType: string | null;
  dateRange: string | null;
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

  // Filter modal state
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: null,
    documentType: null,
    dateRange: null
  });

  // Status options for filter
  const statusOptions = ['All', 'Pending', 'Approved', 'Rejected'];
  const documentTypeOptions = ['All', 'PDF', 'DOCX', 'JPG', 'PNG'];
  const dateRangeOptions = ['All', 'Today', 'This Week', 'This Month', 'This Year'];

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
    navigation.navigate('DocumentPreview', {
      name: document.fileUniqueName
    });
  };

  const handleDownload = (document: Document) => {
    try {
      // downloadDocument(document);
      downloadAndOpenPdf(document.fileUniqueName);
      Alert.alert("Download Started", `${document.title} is being downloaded.`);
    } catch (error) {
      Alert.alert("Download Error", "Unable to download this document. Please try again later.");
    }
  };

  const handleOpen = (document: Document) => {
    navigation.navigate('DocumentDetails', { document });
  };


  const applyFilters = () => {
    // Close the filter modal
    setFilterModalVisible(false);
    // Actual filter logic would be implemented here and in the filterDocuments function
  };

  const resetFilters = () => {
    setFilters({
      status: null,
      documentType: null,
      dateRange: null
    });
  };

  const filterDocuments = useCallback(() => {
    let filteredDocs = documents;

    // Apply search query filter
    if (query) {
      filteredDocs = filteredDocs.filter((doc: Document) =>
        doc.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply status filter if selected
    if (filters.status && filters.status !== 'All') {
      filteredDocs = filteredDocs.filter((doc: Document) =>
        doc.status?.toLowerCase() === filters.status?.toLowerCase()
      );
    }

    // Apply document type filter if selected
    if (filters.documentType && filters.documentType !== 'All') {
      filteredDocs = filteredDocs.filter((doc: Document) => {
        const fileExtension = doc.fileUrl?.split('.').pop()?.toUpperCase();
        return fileExtension === filters.documentType;
      });
    }

    // Apply date range filter if selected
    if (filters.dateRange && filters.dateRange !== 'All') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      filteredDocs = filteredDocs.filter((doc: Document) => {
        const docDate = new Date(doc.createdDate);

        switch (filters.dateRange) {
          case 'Today':
            return docDate >= today;
          case 'This Week':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            return docDate >= weekStart;
          case 'This Month':
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            return docDate >= monthStart;
          case 'This Year':
            const yearStart = new Date(today.getFullYear(), 0, 1);
            return docDate >= yearStart;
          default:
            return true;
        }
      });
    }

    return filteredDocs;
  }, [documents, query, filters]);

  const filteredDocuments = useMemo(() => filterDocuments(), [documents, query, filters]);


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
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>
          {isAllDocsScreen
            ? 'All Documents'
            : `${status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Documents'} (${filteredDocuments.length})`}
        </Text>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Icon name="filter-variant" size={22} color="#3B82F6" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredDocuments}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={({ item }) => (
          <DocumentItem
            document={item}
            onPreview={handlePreview}
            onDownload={handleDownload}
            onOpen={handleOpen}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          filteredDocuments.length === 0 && styles.emptyListContent
        ]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="file-document-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>
              {createdBy
                ? `No documents found created by ${createdBy}`
                : `No ${status?.toLowerCase() ?? 'documents'} found for ${userRole}.`}
            </Text>
            {query && (
              <Text style={styles.emptySubText}>
                Check Search Spelling
              </Text>
            )}
            {(filters.status || filters.documentType || filters.dateRange) && (
              <Text style={styles.emptySubText}>
                Try changing your filters
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


      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Documents</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Icon name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Status Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Status</Text>
              <View style={styles.filterOptions}>
                {statusOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      filters.status === option && styles.selectedFilterOption
                    ]}
                    onPress={() => setFilters({ ...filters, status: option === 'All' ? null : option })}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.status === option && styles.selectedFilterOptionText
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Document Type Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Document Type</Text>
              <View style={styles.filterOptions}>
                {documentTypeOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      filters.documentType === option && styles.selectedFilterOption
                    ]}
                    onPress={() => setFilters({ ...filters, documentType: option === 'All' ? null : option })}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.documentType === option && styles.selectedFilterOptionText
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Date Range Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Date Range</Text>
              <View style={styles.filterOptions}>
                {dateRangeOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      filters.dateRange === option && styles.selectedFilterOption
                    ]}
                    onPress={() => setFilters({ ...filters, dateRange: option === 'All' ? null : option })}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.dateRange === option && styles.selectedFilterOptionText
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetFilters}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  filterButtonText: {
    marginLeft: 4,
    color: '#3B82F6',
    fontWeight: '500',
    fontSize: 14,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 10,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  filterOption: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    margin: 4,
  },
  selectedFilterOption: {
    backgroundColor: '#DBEAFE',
  },
  filterOptionText: {
    color: '#4B5563',
    fontSize: 14,
  },
  selectedFilterOptionText: {
    color: '#3B82F6',
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resetButtonText: {
    color: '#4B5563',
    fontWeight: '500',
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default DocumentList;