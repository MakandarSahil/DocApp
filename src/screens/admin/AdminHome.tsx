import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DashboardLayout from '../../layout/DashboardLayout';

export default function AdminHome() {
  return (
    <DashboardLayout>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome, Admin!</Text>
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
