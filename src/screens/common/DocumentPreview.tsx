import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from '../../utils/config';

// Define the route params
type RootStackParamList = {
  DocumentPreview: { url: string };
};

type DocumentPreviewRouteProp = RouteProp<RootStackParamList, 'DocumentPreview'>;

const DocumentPreview = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name: filename } = route.params;

  const fileUrl = `${config.API_URL}/file/download-pdf/${filename}`;

  console.log("url", fileUrl);
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <WebView source={{ uri: fileUrl }} startInLoadingState style={styles.webView} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  webView: {
    flex: 1,
  },
});

export default DocumentPreview;
