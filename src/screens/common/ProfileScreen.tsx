import React, { use, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { RootStackParamList } from '../../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

// const user = {
//   name: 'Sahil Makandar',
//   initials: 'SM',
//   role: 'Admin',
//   phone: '+91-9579891114',
//   birthDate: '1/23/2005',
//   gender: 'Male',
//   location: 'India, 416 410',
// };

const ProfileScreen = () => {

  const { user } = useAuth();

  const initials = useMemo(() => {
    return user?.fullName?.split(' ')?.[0]?.charAt(0).toUpperCase();
  }, [user]);

  console.log(user)
  const { logout } = useAuth();
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleLogout = async () => await logout();

  const handleNotifications = () => {
    console.log('notification'); // Adjust as needed for your app's navigation structure
  };

  const handleCall = () => Linking.openURL(`tel:+91 9579891114`);
  const handleWhatsApp = () => Linking.openURL(`https://wa.me/9579891114/g, '')}`);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <LinearGradient colors={['#1e40af', '#2563eb']} style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <Text style={styles.userName}>{user?.fullName}</Text>
            <View style={styles.roleBadge}>
              <Ionicons name="heart" size={14} color="white" />
              <Text style={styles.roleText}>{user?.role}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Contact Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBox} onPress={handleCall}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="call-outline" size={20} color="#0ea5e9" />
            </View>
            <Text style={styles.actionLabel}>Call Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBox} onPress={handleWhatsApp}>
            <View style={[styles.actionIconContainer, { backgroundColor: '#d1fae5' }]}>
              <Ionicons name="logo-whatsapp" size={20} color="#10b981" />
            </View>
            <Text style={styles.actionLabel}>WhatsApp Admin</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Info Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.cardRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="call-outline" size={20} color="#0ea5e9" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Mobile Number</Text>
              <Text style={styles.cardValue}>{user?.mobileNo}</Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="calendar-outline" size={20} color="#0ea5e9" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Birth Date</Text>
              <Text style={styles.cardValue}>Birthday</Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="person-outline" size={20} color="#0ea5e9" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Gender</Text>
              <Text style={styles.cardValue}>Male</Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="location-outline" size={20} color="#0ea5e9" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Location</Text>
              <Text style={styles.cardValue}>Location</Text>
            </View>
          </View>
        </View>

        {/* Account Settings Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <TouchableOpacity style={styles.settingRow} >
            <View style={[styles.settingIconContainer, { backgroundColor: '#d1fae5' }]}>
              <Ionicons name="notifications-outline" size={20} color="#10b981" />
            </View>
            <Text style={styles.settingText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} onPress={handleLogout}>
            <View style={[styles.settingIconContainer, { backgroundColor: '#fee2e2' }]}>
              <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            </View>
            <Text style={styles.settingText}>Logout</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" style={styles.chevron} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  scrollContainer: {
    paddingBottom: 24
  },
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
    shadowRadius: 4,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionLabel: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '500',
    color: '#374151',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
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
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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