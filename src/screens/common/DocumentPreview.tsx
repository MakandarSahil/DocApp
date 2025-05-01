import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ActivityIndicator, Alert, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';
import config from '../../utils/config';

const DocumentPreview = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name: filename } = route.params;
  const [loading, setLoading] = useState(false);

  const fileUrl = `${config.API_URL}/file/download-pdf/${filename}`;

  const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      return (
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const downloadAndViewPdf = async () => {
    try {
      setLoading(true);

      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert('Permission required', 'Please grant storage permissions to download files');
        return;
      }

      // Define download path
      const downloadDir = Platform.select({
        ios: RNFS.DocumentDirectoryPath,
        android: RNFS.DownloadDirectoryPath,
      });
      const localFile = `${downloadDir}/${filename}`;

      // Check if file already exists
      const fileExists = await RNFS.exists(localFile);
      if (fileExists) {
        await FileViewer.open(localFile, { showOpenWithDialog: true });
        return;
      }

      // Download the file
      const options = {
        fromUrl: fileUrl,
        toFile: localFile,
        background: true,
        begin: (res) => console.log('Download started:', res),
        progress: (res) => {
          const percent = (res.bytesWritten / res.contentLength) * 100;
          console.log(`Download progress: ${percent.toFixed(0)}%`);
        },
      };

      const download = RNFS.downloadFile(options);
      const result = await download.promise;

      if (result.statusCode === 200) {
        await FileViewer.open(localFile, { showOpenWithDialog: true });
      } else {
        throw new Error(`Download failed with status ${result.statusCode}`);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to download or open the PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Preparing PDF viewer...</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.viewButton}
            onPress={downloadAndViewPdf}
            disabled={loading}
          >
            <Text style={styles.viewButtonText}>View PDF</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  viewButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});

export default DocumentPreview;