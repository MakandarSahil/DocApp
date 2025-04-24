import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import { getMessaging, requestPermission as requestMessagingPermission, getToken, onMessage, setBackgroundMessageHandler } from '@react-native-firebase/messaging';

const messaging = getMessaging(getApp());

export const requestPermission = async (): Promise<void> => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }
  await requestMessagingPermission(messaging);
};

export const getFCMToken = async (): Promise<string> => {
  const token = await getToken(messaging);
  console.log('FCM Token:', token);
  return token;
};

export const setupListeners = () => {
  onMessage(messaging, async remoteMessage => {
    Alert.alert('New Notification', remoteMessage.notification?.title || '');
  });

  setBackgroundMessageHandler(messaging, async remoteMessage => {
    console.log('Handled in background:', remoteMessage);
  });
};
