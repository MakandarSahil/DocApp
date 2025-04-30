import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import axios from 'axios';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import config from '../utils/config';

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to download files.',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};


export const downloadAndOpenPdf = async (filename: string) => {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert("Permission denied", "Cannot access storage");
      return;
    }

    const fileUrl = `${config.API_URL}/file/download-pdf/${filename}`; // Replace with your server IP 
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${filename}`;

    const response = await axios.get(fileUrl, {
      responseType: 'blob', // or 'arraybuffer' for binary
    });

    const base64Content = await response.data.text(); // since you send it as utf8
    const pdfBuffer = Buffer.from(base64Content, 'base64'); // convert to buffer
    await RNFS.writeFile(localFilePath, pdfBuffer.toString('base64'), 'base64');

    await FileViewer.open(localFilePath, { showOpenWithDialog: true });
  } catch (error) {
    console.error("Download error:", error);
    Alert.alert("Error", "Failed to download or open PDF");
  }
};

