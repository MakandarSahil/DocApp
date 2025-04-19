import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DashboardLayout from '../../layout/DashboardLayout';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ApproverHome'>;

export default function ApproverHome() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <DashboardLayout
      userRole="approver"
      label="Approver"
      onNavigateToProfile={() => navigation.navigate('Profile')}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome, Approver!</Text>
      </View>
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
});
