import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import DocumentItem from './DocumentItem';

interface Document {
  id: string;
  name: string;
  status: string;
  date: string;
  role: string;
}

interface Props {
  documents: Document[];
  status: string;
  userRole: string;
}

const DocumentList: React.FC<Props> = ({ documents, status, userRole }) => {
  return (
    <FlatList
      data={documents}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DocumentItem document={item} />}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No {status} documents for {userRole}.</Text>
      }
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#aaa',
  },
});

export default DocumentList;
