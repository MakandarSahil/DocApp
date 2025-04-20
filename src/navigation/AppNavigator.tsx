// AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/common/LoginScreen';
import { useAuth } from '../context/AuthContext';
import ProfileScreen from '../screens/common/ProfileScreen';
import BottomTabs from '../layout/BotttomTabs';
import { Document } from '../types/document';
import DocumentDetailsScreen from '../screens/common/DocumentDetailScreen';

export type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
  Profile: undefined;
  DocumentDetails: { document: Document }; // ✅ Add this
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="MainApp" component={BottomTabs} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="DocumentDetails" component={DocumentDetailsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
