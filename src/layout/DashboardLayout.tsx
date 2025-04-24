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
  Text,
} from 'react-native';
import DashboardNavbar from '../components/DashboardNavbar';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: (props: { query: string; userRole?: 'admin' | 'approver' | 'assistant' }) => ReactNode;
  loading?: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  contentContainerStyle?: object;
  onNavigateToProfile?: () => void;
}

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
  loading = false,
  onRefresh,
  isRefreshing = false,
  contentContainerStyle,
  onNavigateToProfile,
}: Props) => {
  const { user, logout } = useAuth();
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState('');


  const userRole: 'admin' | 'approver' | 'assistant' | undefined = user?.role;

  const navHandlers = useMemo(() => ({
    onManageUsers: () => userRole === 'admin' && console.log('Manage Users'),
    onViewHistory: () => userRole === 'approver' && console.log('View History'),
    onLogout: () => logout(),
  }), [userRole, logout]);

  const toggleSearch = () => {
    if (searchActive && query) {
      setQuery('');
    }
    setSearchActive(prev => !prev);
  };

  const handleSearchChange = (text: string) => {
    setQuery(text);
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
          label={user ? `Welcome, ${user.username}` : 'Welcome'}
          userRole={userRole}
          showSearch={searchActive}
          searchValue={query}
          onSearchChange={handleSearchChange}
          onToggleSearch={toggleSearch}
          onNavigateToProfile={onNavigateToProfile}
          {...navHandlers}
        />
        {/* <Text>hii from dashboard layout</Text> */}

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
            <View style={[styles.scrollContent, contentContainerStyle]}>
              {children({ query })}
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

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

export default DashboardLayout;
