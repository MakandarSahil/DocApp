//NOT USED


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Define the type of a document item
interface Document {
  name: string;
  date: string;
  status: string;
}

interface Props {
  document: Document;
}

const DocumentItem: React.FC<Props> = ({ document }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="insert-drive-file" size={24} color="#757575" />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{document.name}</Text>
        <Text style={styles.meta}>
          {document.date} • {document.status}
        </Text>
      </View>
      <Icon name="chevron-right" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: '#757575',
  },
});

export default DocumentItem;
