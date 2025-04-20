import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Menu } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


type UserRole = 'admin' | 'approver' | 'assistant';

interface Props {
  label?: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  onToggleSearch?: () => void;
  onNavigateToProfile?: () => void;
  onManageUsers?: () => void;
  onViewAllUsers?: () => void;
  onViewHistory?: () => void;
  onLogout?: () => void;
  userRole?: UserRole; 
}

const DashboardNavbar = memo(({
  label = 'Dashboard',
  showSearch,
  searchValue,
  onSearchChange,
  onToggleSearch,
  onNavigateToProfile,
  onManageUsers,
  onLogout,
  onViewAllUsers,
  onViewHistory,
  userRole,
}: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  
  // Animation when search toggle happens
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showSearch ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [showSearch]);

  const closeMenu = useCallback(() => setMenuVisible(false), []);
  const openMenu = useCallback(() => setMenuVisible(true), []);
  
  const handleMenuItemPress = useCallback((callback?: () => void) => {
    return () => {
      closeMenu();
      callback?.();
    };
  }, [closeMenu]);

  // Memoized menu items based on user role
  const renderMenuItems = useCallback(() => {
    const items = [
      <Menu.Item
        key="profile"
        onPress={handleMenuItemPress(onNavigateToProfile)}
        title="Profile"
        titleStyle={styles.menuItemText}
        leadingIcon={() => <Ionicons name="person-outline" size={20} color="#4B5563" />}
      />
    ];

    if (userRole === 'admin') {
      items.push(
        <Menu.Item
          key="manage-users"
          onPress={handleMenuItemPress(onManageUsers)}
          title="Manage Users"
          titleStyle={styles.menuItemText}
          leadingIcon={() => <Ionicons name="people-outline" size={20} color="#4B5563" />}
        />
      );
    }
    
    if (userRole === 'approver') {
      items.push(
        <Menu.Item
          key="all-users"
          onPress={handleMenuItemPress(onViewAllUsers)}
          title="All Users"
          titleStyle={styles.menuItemText}
          leadingIcon={() => <Ionicons name="list-outline" size={20} color="#4B5563" />}
        />
      );
      
      items.push(
        <Menu.Item
          key="history"
          onPress={handleMenuItemPress(onViewHistory)}
          title="History"
          titleStyle={styles.menuItemText}
          leadingIcon={() => <Ionicons name="time-outline" size={20} color="#4B5563" />}
        />
      );
    }
    
    items.push(
      <Menu.Item
        key="logout"
        onPress={handleMenuItemPress(onLogout)}
        title="Logout"
        titleStyle={styles.menuItemText}
        leadingIcon={() => <Ionicons name="log-out-outline" size={20} color="#dc3545" />}
      />
    );
    
    return items;
  }, [userRole, handleMenuItemPress, onNavigateToProfile, onManageUsers, onViewAllUsers, onViewHistory, onLogout]);

  return (
    <SafeAreaView style={[
      styles.navbar,
      { paddingTop: Platform.OS === 'ios' ? insets.top : 8 }
    ]}>
      {/* Left: Menu */}
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <View collapsable={false}>
            <TouchableOpacity
              onPress={openMenu}
              style={styles.menuIcon}
              activeOpacity={0.7}
            >
              <Ionicons name="menu-outline" size={28} color="#4B5563" />
            </TouchableOpacity>
          </View>
        }
        contentStyle={styles.menuContent}
      >
        {renderMenuItems()}
      </Menu>

      {/* Center: Title or Search */}
      <View style={styles.centerContent}>
        {showSearch ? (
          <Animated.View style={{ opacity: fadeAnim }}>
            <TextInput
              value={searchValue}
              onChangeText={onSearchChange}
              autoFocus
              placeholder="Search documents..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
          </Animated.View>
        ) : (
          <Animated.View style={{ opacity: Animated.subtract(1, fadeAnim) }}>
            <Text style={styles.title}>{label}</Text>
          </Animated.View>
        )}
      </View>

      {/* Right: Search Icon */}
      <TouchableOpacity 
        onPress={onToggleSearch}
        style={styles.iconButton}
        activeOpacity={0.7}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Ionicons
          name={showSearch ? 'close-outline' : 'search-outline'}
          size={24}
          color="#4B5563"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export default DashboardNavbar;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    zIndex: 10,
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
  },
  menuIcon: {
    padding: 4,
  },
  iconButton: {
    padding: 4,
    borderRadius: 20,
  },
  centerContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: '#1F2937',
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
    color: '#1F2937',
  },
  menuContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    zIndex: 20,
    minWidth: 180,
    marginTop: 40,
  },
  menuItemText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '500',
  },
});