
//import { PermissionsAndroid, Platform } from 'react-native';
//import { getApp } from '@react-native-firebase/app';
 //import {
 //  getMessaging,
//   requestPermission as requestMessagingPermission,
//   getToken,
//   onMessage,
//   setBackgroundMessageHandler,
//   messaging
 //} from '@react-native-firebase/messaging';
//import notifee, { AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

//Tej: getApp() is used for WED SDK and not for react native SDK. Commented for now. Please confirm before removing.
//const messaging = getMessaging(getApp());


// Request Notification Permission
//Tej: Created new function below. This function is android specific.
/*
export const requestPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('❌ Android POST_NOTIFICATIONS permission denied');
        return false;
      }
    }

    console.log('getting permission for notification');
    const authStatus = await messaging().requestPermission();
    console.log('authstatus is:',authStatus);
   // const authStatus = await requestMessagingPermission(messaging);
    
    const enabled = authStatus === 1 || authStatus === 2;

    if (enabled) {
      console.log('✅ Notification permission granted');
    } else {
      console.log('❌ Notification permission not granted');
    }

    return enabled;
  } catch (error) {
    console.error('❌ Failed to request notification permission:', error);
    return false;
  }
};*/

export const requestUserPermission = async (): Promise<boolean> => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  if (enabled) {
    console.log('✅ Notification permission granted');
    console.log('Authorization status:', authStatus);
    //await getFCMToken();
    return true;
  } else {
    console.log('❌ Notification permission not granted');
  }
  
  return false;
};

// Create Notification Channel
//Tej: Not sure why we need to create a channel. Will update after confirmation.
/*
export const createNotificationChannel = async () => {
  try {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      sound: 'default',
      vibration: true,
      vibrationPattern: [300, 500],
      badge: true,
      lights: true,
      lightColor: '#FF231F7C',
      // ❌ REMOVE smallIcon from here
    });
    console.log('✅ Notification Channel Created');
  } catch (error) {
    console.error('❌ Failed to create notification channel:', error);
  }
};
*/


// Get FCM Token
export const getFCMToken = async (): Promise<string> => {
  try {
    const token = await messaging().getToken();
    console.log('✅ FCM Token:', token);
    return token;
  } catch (error) {
    console.error('❌ Failed to get FCM Token:', error);
    return '';
  }
};

// Setup Listeners
/*
export const setupListeners = () => {
  console.log('🔔 Setting up Notification Listeners...');

  // Foreground Notification
  onMessage(messaging, async (remoteMessage) => {
    console.log('📩 Received Foreground FCM Message:', remoteMessage);

    if (remoteMessage?.notification) {
      const currentBadge = await notifee.getBadgeCount();
      console.log('📍 Current Badge Count (Foreground):', currentBadge);

      await notifee.displayNotification({
        title: remoteMessage.notification.title || 'New Notification',
        body: remoteMessage.notification.body || '',
        data: remoteMessage.data,
        ios: {
          sound: 'default',
          badgeCount: currentBadge + 1,
          foregroundPresentationOptions: {
            alert: true,
            badge: true,
            sound: true,
          },
        },
        android: {
          channelId: 'default',
          smallIcon: 'ic_stat_notifications_none', // ✅ Correct place for smallIcon
          color: '#FF231F7C',
          sound: 'default',
          pressAction: {
            id: 'default',
          },
        },
      });

      await notifee.setBadgeCount(currentBadge + 1);
    }
  });

  // Background Notification
  setBackgroundMessageHandler(messaging, async (remoteMessage) => {
    console.log('📩 Handled Background FCM Message:', remoteMessage);

    if (remoteMessage?.notification) {
      const currentBadge = await notifee.getBadgeCount();
      console.log('📍 Current Badge Count (Background):', currentBadge);

      await notifee.displayNotification({
        title: remoteMessage.notification.title || 'New Notification',
        body: remoteMessage.notification.body || '',
        data: remoteMessage.data,
        ios: {
          sound: 'default',
          badgeCount: currentBadge + 1,
        },
        android: {
          channelId: 'default',
          smallIcon: 'ic_stat_notifications_none',
          color: '#FF231F7C',
          sound: 'default',
          pressAction: {
            id: 'default',
          },
        },
      });

      await notifee.setBadgeCount(currentBadge + 1);
    }
  });

  // Background Events
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log('⚡ Background Event:', type, detail);
    if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
      console.log('📲 Notification was pressed (Background)');
    }
  });
};*/
