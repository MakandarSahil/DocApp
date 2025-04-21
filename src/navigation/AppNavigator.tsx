import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import LoginScreen from '../screens/common/LoginScreen';
import BottomTabs from '../layout/BotttomTabs';
import ProfileScreen from '../screens/common/ProfileScreen';
import DocumentDetailsScreen from '../screens/common/DocumentDetailScreen';

import { useAuth } from '../context/AuthContext';
import { Document } from '../types/document';

export type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
  Profile: undefined;
  DocumentDetails: { document: Document };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0d6efd" />
      </View>
    );
  }

  return (

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

  );
};

export default AppNavigator;
