// NotificationContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { getFCMToken, requestPermission, setupListeners } from "../utils/firebaseUtils";

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
        await requestPermission();
        const token = await getFCMToken();
        setFcmToken(token);
        setupListeners();
      } catch (error) {
        console.error("Notification setup failed:", error);
      }
    };

    initNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ fcmToken }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
