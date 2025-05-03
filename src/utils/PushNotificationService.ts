import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

// Store for unsubscribe functions
// let foregroundSubscription: () => void;
// let backgroundSubscription: () => void;

/**
 * Request permission to receive push notifications
 * @returns Promise<boolean> indicating if permission was granted
 */
export const requestUserPermission = async (): Promise<boolean> => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  if (enabled) {
    console.log('Authorization status:', authStatus);
    await getFCMToken();
    return true;
  }
  
  return false;
};

/**
 * Get the FCM token for this device
 * @returns Promise<string | null> The FCM token
 */
export const getFCMToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    // Store this token in your backend for sending push notifications
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};