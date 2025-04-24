import { View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import DashboardNavbar from '../../components/DashboardNavbar'
import { useAuth } from '../../context/AuthContext'
import DocumentList from '../../components/DocumenList'

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
    <View>
      <DashboardNavbar
        label='All Users'
        showSearch={searchActive}
        searchValue={query}
        onSearchChange={handleSearchChange}
        onToggleSearch={toggleSearch}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  )
}

export default AllUsers
