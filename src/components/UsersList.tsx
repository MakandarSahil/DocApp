// UsersList.tsx
import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import UserItem from './UserItem';
import config from '../utils/config';
import { User } from '../types/user';

interface Props {
  query?: string;
}

const UsersList: React.FC<Props> = ({ query }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const { user } = useAuth();
  const userRole = user?.role;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!userRole) return;

    const getAllUsers = async () => {
      try {
        setIsLoading(true);
        const getUserUrl = config.API_URL + '/user/get-users';
        const response = await axios.get(getUserUrl);

        const mappedUsers = response.data.users.map((user: any) => ({
          id: user._id,
          name: user.fullName,
          email: user.email,
          role: user.role,
          phone: user.mobileNo,
          isActive: user.isActive,
        }));

        setUsers(mappedUsers);
        setIsLoading(false);
      } catch (err: any) {
        console.error('Error fetching users: ', err);
        setError('Failed to fetch users.');
        setIsLoading(false);
      }
    };

    getAllUsers();
  }, [userRole]);

  const filteredUsers = query
    ? users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    )
    : users;

  console.log(filteredUsers)

  // const handleProfilePress = (userId: string) => {
  //   navigation.navigate('Profile', { userId });
  // };

  if (isLoading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContent}>
        <Icon name="account-alert-outline" size={48} color="#EF4444" />
        <Text style={styles.emptyText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>All Users ({filteredUsers.length})</Text>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserItem user={item} />
        )}
        contentContainerStyle={[styles.listContent, filteredUsers.length === 0 && styles.centerContent]}
        ListEmptyComponent={
          <View style={styles.centerContent}>
            <Icon name="account-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>No users found.</Text>
            {query ? <Text style={styles.emptySubText}>Check your search keyword</Text> : null}
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    color: '#1F2937',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#9CA3AF',
  },
  emptySubText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default UsersList;
