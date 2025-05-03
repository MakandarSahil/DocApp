import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import DocumentsProvider from './src/context/DocumentsContext';
import notifee from '@notifee/react-native';
import NotificationProvider from './src/context/NotificationContext';
import { requestUserPermission } from './src/utils/PushNotificationService';


const App = () => {
  useEffect(() => {
    const initNotifications = async () => {
      const permissionGranted = await requestUserPermission();
      if (permissionGranted) {
        console.log('permission granted');
        // listenToNotifications();
        // registerBackgroundHandler();
        // // Optionally subscribe to topics
        // await subscribeToTopic('general');
      } else {
        console.log('permission not granted');
      }
    };
    initNotifications();

  },[]);
  // useEffect(() => {
  //   const setupBadge = async () => {
  //     try {
  //       await notifee.requestPermission();
  //       await notifee.setBadgeCount(5);
  //     } catch (error) {
  //       console.error('Error setting badge:', error);
  //     }
  //   };

  //   setupBadge();
  // }, []);
  return (
    <SafeAreaProvider>
      <NotificationProvider>
        <NavigationContainer>
          <AuthProvider>
            <DocumentsProvider>
              <AppNavigator />
            </DocumentsProvider>
          </AuthProvider>
        </NavigationContainer>
      </NotificationProvider>
    </SafeAreaProvider>
  );
};

export default App;
