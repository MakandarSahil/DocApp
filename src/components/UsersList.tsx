import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import config from '../utils/config';
import { useAuth } from '../context/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface Props {
  query?: string;
}

const UsersList: React.FC<Props> = ({ query }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const userRole = useAuth()?.user?.role;

  useEffect(() => {
    if (!userRole) return;
    const getAllUsers = async () => {
      try {
        console.log('fetching users');
        setIsLoading(true);
        const getUserUrl = config.API_URL + '/user/get-users';
        console.log('API URL:', getUserUrl);
        const response = await axios.get(getUserUrl);
        console.log('Fetched users:', response.data);

        const mappedUsers = response.data.users.map((user: any) => ({
          id: user._id,
          name: user.fullName,
          email: user.email,
          role: user.role,
        }));

        setUsers(mappedUsers);
        setIsLoading(false);
      } catch (err: any) {
        console.log('error : ', err);
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
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.detailRow}>
                <Icon name="email-outline" size={16} color="#6B7280" />
                <Text style={styles.email}>{item.email}</Text>
              </View>
              {item.role && (
                <View style={styles.detailRow}>
                  <Icon name="shield-account-outline" size={16} color="#6B7280" />
                  <Text style={styles.role}>{item.role}</Text>
                </View>
              )}
            </View>
          </View>
        )}
        contentContainerStyle={[
          styles.listContent,
          filteredUsers.length === 0 && styles.centerContent,
        ]}
        ListEmptyComponent={
          <View style={styles.centerContent}>
            <Icon name="account-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>No users found.</Text>
            {query ? (
              <Text style={styles.emptySubText}>Check your search keyword</Text>
            ) : null}
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
  userCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  email: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  role: {
    marginLeft: 6,
    fontSize: 14,
    color: '#4B5563',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});

export default UsersList;
