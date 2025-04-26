import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import NotificationProvider from './src/context/NotificationContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import DocumentsProvider from './src/context/DocumentsContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <NotificationProvider>
        <NavigationContainer>
          {/* <AuthProvider> */}
          <DocumentsProvider>
            <AppNavigator />
          </DocumentsProvider>
          {/* </AuthProvider> */}
        </NavigationContainer>
      </NotificationProvider>
    </SafeAreaProvider>
  );
};

export default App;
