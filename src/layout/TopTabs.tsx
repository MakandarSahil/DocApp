// layout/TopTabs.tsx
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import PendingScreen from '../screens/tabScreens/PendingScreen';
import ApprovedScreen from '../screens/tabScreens/ApprovedScreen';
import CorrectionScreen from '../screens/tabScreens/CorrectionScreen';
import RejectedScreen from '../screens/tabScreens/RejectedScreen';
import DashboardLayout from './DashboardLayout';
import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const createScreenWrapper = (
  ScreenComponent: React.ComponentType<{ query: string; userRole?: 'admin' | 'approver' | 'assistant' }>
) => {
  return () => {
    const navigation = useNavigation();

    const handleProfilePress = () => {
      navigation.navigate('Profile');
    };

    return (
      <DashboardLayout onNavigateToProfile={handleProfilePress}>
        {({ query, userRole }) => {
          const validUserRole = ['admin', 'approver', 'assistant'].includes(userRole || '')
            ? (userRole as 'admin' | 'approver' | 'assistant')
            : undefined;

          return (
            <ScreenComponent query={query} userRole={validUserRole} />
          );
        }}
      </DashboardLayout>
    );
  };
};

export default function TopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#2563EB' },
        tabBarLabelStyle: { fontWeight: '600', fontSize: 14 },
        tabBarStyle: { backgroundColor: '#fff' },
        swipeEnabled: true,
        lazy: true,
      }}
    >
      <Tab.Screen name="Pending" component={createScreenWrapper(PendingScreen)} />
      <Tab.Screen name="Approved" component={createScreenWrapper(ApprovedScreen)} />
      <Tab.Screen name="Correction" component={createScreenWrapper(CorrectionScreen)} />
      <Tab.Screen name="Rejected" component={createScreenWrapper(RejectedScreen)} />
    </Tab.Navigator>
  );
}
