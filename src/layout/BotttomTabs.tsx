// layout/BottomTabs.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import PendingScreen from '../screens/tabScreens/PendingScreen';
import ApprovedScreen from '../screens/tabScreens/ApprovedScreen';
import CorrectionScreen from '../screens/tabScreens/CorrectionScreen';
import RejectedScreen from '../screens/tabScreens/RejectedScreen';
import DashboardLayout from './DashboardLayout';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const createScreenWrapper = (ScreenComponent: React.ComponentType) => () => {
  return (
    <DashboardLayout>
      <ScreenComponent />
    </DashboardLayout>
  );
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Pending" 
        component={createScreenWrapper(PendingScreen)}
        options={{ tabBarLabel: 'Pending' }}
      />
      <Tab.Screen 
        name="Approved" 
        component={createScreenWrapper(ApprovedScreen)}
        options={{ tabBarLabel: 'Approved' }}
      />
      <Tab.Screen 
        name="Correction" 
        component={createScreenWrapper(CorrectionScreen)}
        options={{ tabBarLabel: 'Correction' }}
      />
      <Tab.Screen 
        name="Rejected" 
        component={createScreenWrapper(RejectedScreen)}
        options={{ tabBarLabel: 'Rejected' }}
      />
    </Tab.Navigator>
  );
}