import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission as requestMessagingPermission,
  getToken,
  onMessage,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native'; 

const messaging = getMessaging(getApp());

// Request Notification Permission
export const requestPermission = async (): Promise<void> => {
  try {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }
    await requestMessagingPermission(messaging);
    console.log('Notification permission granted.');
  } catch (error) {
    console.error('Failed to request notification permission:', error);
  }
};

// Get FCM Token
export const getFCMToken = async (): Promise<string> => {
  try {
    const token = await getToken(messaging);
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Failed to get FCM Token:', error);
    return '';
  }
};

// Setup Listeners
export const setupListeners = () => {
  // Foreground notification
  onMessage(messaging, async (remoteMessage) => {
    console.log('Received a foreground FCM message:', remoteMessage);

    // Show Alert
    Alert.alert(
      remoteMessage.notification?.title || 'New Notification',
      remoteMessage.notification?.body || ''
    );

    // Increment badge count using Notifee
    const currentBadge = await notifee.getBadgeCount();
    await notifee.setBadgeCount(currentBadge + 1);
    console.log(`Foreground badge count updated to ${currentBadge + 1}`);
  });

  // Background notification
  setBackgroundMessageHandler(messaging, async (remoteMessage) => {
    console.log('Handled background FCM message:', remoteMessage);

    const currentBadge = await notifee.getBadgeCount();
    await notifee.setBadgeCount(currentBadge + 1);
    console.log(`Background badge count updated to ${currentBadge + 1}`);
  });
};
