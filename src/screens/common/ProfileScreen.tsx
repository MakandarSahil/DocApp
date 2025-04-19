import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext'; // Adjust the import path as needed
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const user = {
  name: 'Sahil Makandar',
  initials: 'SM',
  role: 'Admin',
  phone: '+91-9579891114',
  birthDate: '1/23/2005',
  gender: 'Male',
  location: 'India, 416 410',
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleCall = () => Linking.openURL(`tel:${user.phone}`);
  const handleWhatsApp = () => Linking.openURL(`https://wa.me/${user.phone.replace(/[^0-9]/g, '')}`);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'AuthStack' }], // Adjust based on your navigation structure
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <LinearGradient colors={['#0ea5e9', '#2563eb']} style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.initials}</Text>
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.roleBadge}>
              <Ionicons name="shield-checkmark" size={14} color="white" />
              <Text style={styles.roleText}>{user.role}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Contact Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={styles.actionBox} 
            onPress={handleCall}
            activeOpacity={0.7}
          >
            <Ionicons name="call-outline" size={24} color="#0ea5e9" />
            <Text style={styles.actionLabel}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionBox} 
            onPress={handleWhatsApp}
            activeOpacity={0.7}
          >
            <Ionicons name="logo-whatsapp" size={24} color="#22c55e" />
            <Text style={styles.actionLabel}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Info Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {[
            { icon: 'call-outline', label: 'Mobile Number', value: user.phone },
            { icon: 'calendar-outline', label: 'Birth Date', value: user.birthDate },
            { icon: 'person-outline', label: 'Gender', value: user.gender },
            { icon: 'location-outline', label: 'Location', value: user.location },
          ].map((item, index) => (
            <View key={index} style={styles.cardRow}>
              <Ionicons name={item.icon} size={20} color="#6b7280" style={styles.cardIcon} />
              <View>
                <Text style={styles.cardLabel}>{item.label}</Text>
                <Text style={styles.cardValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Account Settings Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <TouchableOpacity 
            style={styles.settingRow}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={20} color="#22c55e" style={styles.cardIcon} />
            <Text style={styles.settingText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.settingRow, { borderBottomWidth: 0 }]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={20} color="#ef4444" style={styles.cardIcon} />
            <Text style={[styles.settingText, { color: '#ef4444' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContainer: { paddingBottom: 24 },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#e0f2fe',
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: '#0ea5e9',
    fontSize: 28,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 6,
  },
  roleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: -28,
    marginBottom: 16,
  },
  actionBox: {
    backgroundColor: '#fff',
    width: 120,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  actionLabel: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  cardLabel: {
    fontSize: 13,
    color: '#6b7280',
  },
  cardValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
    flex: 1,
  },
  chevron: {
    marginLeft: 'auto',
  },
});