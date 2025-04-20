import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Document } from '../types/document';

interface DocumentItemProps {
  document: Document;
  onPreview: (document: Document) => void;
  onDownload: (document: Document) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onPreview, onDownload }) => {
  return (
    <View style={styles.documentCard}>
      <View style={styles.documentInfo}>
        <Icon name="file-document-outline" size={28} color="#4B5563" style={styles.fileIcon} />
        <View style={styles.textContainer}>
          <Text style={styles.documentName}>{document.name}</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>{document.date}</Text>
            <View style={[styles.statusBadge, 
              document.status === 'approved' ? styles.statusApproved :
              document.status === 'pending' ? styles.statusPending :
              styles.statusRejected
            ]}>
              <Text style={styles.statusText}>{document.status}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton && styles.actionButton1}
          onPress={() => onPreview(document)}
          activeOpacity={0.7}
        >
          <Icon name="eye-outline" size={18} color="#3B82F6" />
          <Text style={styles.actionText1}>Preview</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton && styles.actionButton2}
          onPress={() => onDownload(document)}
          activeOpacity={0.7}
        >
          <Icon name="download-outline" size={18} color="#10B981" />
          <Text style={styles.actionText2}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  // Your existing styles
  documentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusApproved: {
    backgroundColor: '#D1FAE5',
  },
  statusPending: {
    backgroundColor: '#FEF3C7', 
  },
  statusRejected: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  actionButton1: {
    width: '50%',
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton2: {
    width: '50%',
    backgroundColor: '#E8F5E9',
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionText1: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#1E88E5',
  },
  actionText2: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#43A047',
  }
});

export default DocumentItem;
