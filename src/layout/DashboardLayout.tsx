import React, { ReactNode, useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  RefreshControl,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import DashboardNavbar from '../components/DashboardNavbar';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
  userRole: 'admin' | 'approver' | 'assistant';
  label: string;
  loading?: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  contentContainerStyle?: object;
}

// Custom theme for Paper Provider
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2563EB',
    accent: '#0F172A',
  },
};

const DashboardLayout = ({ 
  children, 
  userRole, 
  label,
  loading = false,
  onRefresh,
  isRefreshing = false,
  contentContainerStyle,
}: Props) => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState('');

  // Role-based navigation handlers
  const navHandlers = useMemo(() => ({
    onNavigateToProfile: () => console.log('Navigate to Profile'),
    onManageUsers: () => userRole === 'admin' && console.log('Manage Users'),
    onViewAllUsers: () => userRole === 'approver' && console.log('All Users'),
    onViewHistory: () => userRole === 'approver' && console.log('View History'),
    onLogout: () => logout(),
  }), [navigation, userRole, logout]);

  // Toggle search and handle search query changes
  const toggleSearch = () => {
    if (searchActive && query) {
      setQuery('');  // Clear query when closing search
    }
    setSearchActive(prev => !prev);
  };

  const handleSearchChange = (text: string) => {
    setQuery(text);
    // Implement debounced search here if needed
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
          translucent={Platform.OS === 'android'}
        />
        
        <DashboardNavbar
          label={label}
          userRole={userRole}
          showSearch={searchActive}
          searchValue={query}
          onSearchChange={handleSearchChange}
          onToggleSearch={toggleSearch}
          {...navHandlers}
        />

        <KeyboardAvoidingView 
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2563EB" />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              refreshControl={
                onRefresh ? (
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                    colors={['#2563EB']}
                    tintColor="#2563EB"
                  />
                ) : undefined
              }
            >
              {children}
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default DashboardLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});