import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';
import { getFCMToken, requestPermission, setupListeners } from "../utils/firebaseUtils"
import firebase from '@react-native-firebase/app';

type NotificationContextType = {
  fcmToken: string,
}
const NotificationContext = createContext<NotificationContextType>({
  fcmToken: "",
});

export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [fcmToken, setFcmToken] = useState<string>("");
  useEffect(() => {
    console.log('Firebase initialized:', firebase.app().name); // should not be undefined
    const setToken = async () => {
      const token = await getFCMToken();
      setFcmToken(token);
      console.log("FCM Token:", token);
    }
    setToken();
    requestPermission();
    setupListeners();
  }, []);

  return (
    <NotificationContext.Provider value={{ fcmToken }}>
      {children}
    </NotificationContext.Provider>
  )
};

export default NotificationProvider;
