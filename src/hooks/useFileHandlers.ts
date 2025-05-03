import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import axios from 'axios';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import config from '../utils/config';

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const binary = String.fromCharCode(...new Uint8Array(buffer));
  if (typeof global.btoa === 'function') {
    return global.btoa(binary);
  }
  // Polyfill for btoa
  return Buffer.from(binary, 'binary').toString('base64');
};

const requestStoragePermission = async () => {
  if (Platform.OS !== 'android') return true;

  try {
    let permissionsToRequest = [];
    
    if (Platform.Version >= 33) {
      permissionsToRequest = [
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ];
    } else {
      permissionsToRequest = [
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ];
    }

    const granted = await PermissionsAndroid.requestMultiple(permissionsToRequest);
    
    return Object.values(granted).every(
      status => status === PermissionsAndroid.RESULTS.GRANTED
    );
  } catch (err) {
    console.warn('Permission error:', err);
    return false;
  }
};

export const downloadAndOpenPdf = async (filename: string) => {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Cannot download the file.');
      return;
    }

    const fileUrl = `${config.API_URL}/file/download-pdf/${filename}`; // Replace with your local IP
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${filename}`;
    console.log("localFilePath", localFilePath);
    const response = await axios.get(fileUrl, {
      responseType: 'arraybuffer',
    });

    const base64Data = arrayBufferToBase64(response.data);
    await RNFS.writeFile(localFilePath, base64Data, 'base64');

    await FileViewer.open(localFilePath, { showOpenWithDialog: true });
  } catch (err) {
    console.error('Download error:', err);
    Alert.alert('Download failed', 'Could not download or open the PDF');
  }
};

