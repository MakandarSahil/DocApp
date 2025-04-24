import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DashboardNavbar from '../../components/DashboardNavbar';
import { useAuth } from '../../context/AuthContext';
import UsersList from '../../components/UsersList';

const AllUsers = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState('');

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
    <View style={styles.container}>
      <DashboardNavbar
        label='All Users'
        showSearch={searchActive}
        searchValue={query}
        onSearchChange={handleSearchChange}
        onToggleSearch={toggleSearch}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <UsersList query={query} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // This is important for layout
    backgroundColor: '#fff',
  },
});

export default AllUsers;
