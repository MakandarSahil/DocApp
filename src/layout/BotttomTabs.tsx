// layout/BottomTabs.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import PendingScreen from '../screens/tabScreens/PendingScreen';
import ApprovedScreen from '../screens/tabScreens/ApprovedScreen';
import CorrectionScreen from '../screens/tabScreens/CorrectionScreen';
import RejectedScreen from '../screens/tabScreens/RejectedScreen';
import DashboardLayout from './DashboardLayout';
import CustomTabBar from '../components/CustomTabBar';
import ProfileScreen from '../screens/common/ProfileScreen';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const createScreenWrapper = (
  ScreenComponent: React.ComponentType<{ query: string }>
) => {
  return () => {
    const navigation = useNavigation();

    const handleProfilePress = () => {
      navigation.navigate('Profile');
    };

    return (
      <DashboardLayout onNavigateToProfile={handleProfilePress}>
        {({ query }) => {
          return (
            <ScreenComponent query={query} />
          );
        }}
      </DashboardLayout>
    );
  };
};


export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
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
