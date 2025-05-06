import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppState } from 'react-native';
import { getFCMToken, requestUserPermission, setupListeners, createNotificationChannel } from "../utils/firebaseUtils";
import notifee from '@notifee/react-native';

type NotificationContextType = {
  fcmToken: string;
};

const NotificationContext = createContext<NotificationContextType>({
  fcmToken: "",
});

export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [fcmToken, setFcmToken] = useState<string>("");

  useEffect(() => {
    const initNotifications = async () => {
      try {
        console.log('🔔 Initializing Notifications...');
        const permissionGranted = await requestUserPermission();
        console.log('🔔 Permission Granted:', permissionGranted);

        if (permissionGranted) {
          //Why we want to create notification channel?
          // await createNotificationChannel();
           const token = await getFCMToken();
           console.log('🔔 Received FCM Token:', token);

          // if (token) {
          //   setFcmToken(token);
          //   setupListeners();
          // }

          // await notifee.setBadgeCount(0);
          // console.log('🔔 Badge count reset to 0.');
        }
      } catch (error) {
        console.error("❌ Notification setup failed:", error);
      }
    };

    initNotifications();

    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      console.log('🔁 AppState changed to:', nextAppState);
      if (nextAppState === 'active') {
        await notifee.setBadgeCount(0);
        console.log('🔔 Badge count reset to 0 on App Resume.');
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <NotificationContext.Provider value={{ fcmToken }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
