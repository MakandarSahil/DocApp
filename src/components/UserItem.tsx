import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes';

interface UserItemProps {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleProfilePress = () => {
    navigation.navigate('Profile', { userId: user.id });
  };

  const handleCallPress = () => {
    // Linking.openURL(`tel:${user.mobileNo}`);
    console.log("send mobile no from backend")
  };

  const handleDocumentPress = () => {
    console.log(`Viewing documents for ${user.name}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleProfilePress}
        style={styles.touchableArea}
      >
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name[0].toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {user.name}
              </Text>
              {user.role && (
                <View style={styles.roleBadge}>
                  <Text style={styles.roleText}>{user.role}</Text>
                </View>
              )}
            </View>

            <Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">
              {user.email}
            </Text>
          </View>

          <Icon
            name="chevron-right"
            size={24}
            color="#CBD5E0"
            style={styles.chevron}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={handleCallPress}
          style={[styles.actionButton, styles.callButton]}
          activeOpacity={0.8}
        >
          <Icon name="phone" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDocumentPress}
          style={[styles.actionButton, styles.docButton]}
          activeOpacity={0.8}
        >
          <Icon name="file-document-outline" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Documents</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 7,
    marginBottom: 8,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  touchableArea: {
    borderRadius: 12,
  },
  userCard: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2563eb', // More vibrant color
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A202C',
    maxWidth: '70%',
  },
  email: {
    fontSize: 12,
    color: '#718096',
  },
  roleBadge: {
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#4A5568',
  },
  chevron: {
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    margin: 8,
  },
  callButton: {
    backgroundColor: '#81C784', // Green for call
  },
  docButton: {
    backgroundColor: '#64B5F6', // Purple for documents
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default UserItem;