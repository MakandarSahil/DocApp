import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import DocumentList from '../../components/DocumenList';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

interface Props {
  query: string;
}

const RejectedScreen: React.FC<Props> = ({ query }) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // const { documents, loading, setStatus, status, isLoading } = useDocuments()


  // useFocusEffect(
  //   useCallback(() => {
  //     setStatus('pending');
  //   }, [])
  // );



  // const handlePreview = (document: Document) => {
  //   navigation.navigate('DocumentDetails', { document });
  // };

  // const handleDownload = (document: Document) => {
  //   try {
  //     downloadDocument(document);
  //     Alert.alert("Download Started", `${document.title} is being downloaded.`);
  //   } catch (error) {
  //     Alert.alert("Download Error", "Unable to download this document. Please try again later.");
  //   }
  // };

  return (
    <View style={styles.container}>
      <DocumentList query={query} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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

export default RejectedScreen;
