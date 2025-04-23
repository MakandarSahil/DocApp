import React, { use, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import DocumentList from '../../components/DocumenList';
import { getFilteredDocuments } from '../../mock/data/DummyDoc';
import { downloadDocument } from '../../utils/documentHandlers';
import { Document } from '../../types/document';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContext';
import { useDocuments } from '../../context/DocumentsContext';

interface Props {
  query: string;
}

const CorrectionScreen: React.FC<Props> = ({ query }) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { documents, loading, setStatus, status } = useDocuments()

  useFocusEffect(
    useCallback(() => {
      setStatus('correction');
    }, [])
  );

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

  return (
    <View style={styles.container}>
      <DocumentList
        documents={documents}
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
    backgroundColor: '#F9FAFB',
  },
});

export default CorrectionScreen;
