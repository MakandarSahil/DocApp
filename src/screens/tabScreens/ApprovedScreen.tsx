import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import DocumentList from '../../components/DocumenList'; 
import { getFilteredDocuments } from '../../mock/data/DummyDoc';
import { downloadDocument } from '../../utils/documentHandlers';
import { Document } from '../../types/document';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

interface Props {
  query: string;
  userRole?: 'admin' | 'approver' | 'assistant';
}

const ApprovedScreen: React.FC<Props> = ({ query, userRole }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const status = 'approved';

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!userRole) return;

    setLoading(true);
    const filtered = getFilteredDocuments(status, userRole, query);
    setDocuments(filtered);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [status, userRole, query]);

  const handlePreview = (document: Document) => {
    navigation.navigate('DocumentDetails', { document });
  };

  const handleDownload = (document: Document) => {
    try {
      downloadDocument(document);
      Alert.alert("Download Started", `${document.name} is being downloaded.`);
    } catch (error) {
      Alert.alert("Download Error", "Unable to download this document. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <DocumentList 
        documents={documents} 
        userRole={userRole || ''} 
        status={status}
        onPreview={handlePreview}
        onDownload={handleDownload}
        isLoading={loading}
        query={query}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default ApprovedScreen;
