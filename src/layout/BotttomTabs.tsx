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
import { useDocuments } from '../context/DocumentsContext';

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
  const { status, setStatus } = useDocuments();
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
        listeners={({ navigation }) => ({
          tabPress: () => {
            setStatus('pending');
          }
        })}
      />
      <Tab.Screen
        name="Approved"
        component={createScreenWrapper(ApprovedScreen)}
        options={{ tabBarLabel: 'Approved' }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            setStatus('approved');
          }
        })}
      />
      <Tab.Screen
        name="Correction"
        component={createScreenWrapper(CorrectionScreen)}
        options={{ tabBarLabel: 'Correction' }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            setStatus('correction');
          }
        })}
      />
      <Tab.Screen
        name="Rejected"
        component={createScreenWrapper(RejectedScreen)}
        options={{ tabBarLabel: 'Rejected' }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            setStatus('rejected');
          }
        })}
      />
    </Tab.Navigator>
  );
}
