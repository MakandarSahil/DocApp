import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';

export const requestPermission = async ():Promise<void> => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }
  await messaging().requestPermission();
};

export const getFCMToken = async () => {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  return token;
};

export const setupListeners = () => {
  // Foreground messages
  messaging().onMessage(async remoteMessage => {
    Alert.alert('New Notification', remoteMessage.notification?.title || '');
  });

  // Background/quit state messages (optional for tracking if user clicked)
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in background!', remoteMessage);
  });
};
