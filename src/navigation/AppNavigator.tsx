import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/common/LoginScreen';
// Placeholder dashboard screens
import AdminHome from '../screens/admin/AdminHome';
import AssistantHome from '../screens/assistant/AssistantHome';
import ApproverHome from '../screens/approver/ApproverHome';

import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : user.role === 'ADMIN' ? (
          <Stack.Screen name="AdminHome" component={AdminHome} />
        ) : user.role === 'ASSISTANT' ? (
          <Stack.Screen name="AssistantHome" component={AssistantHome} />
        ) : (
          <Stack.Screen name="ApproverHome" component={ApproverHome} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
