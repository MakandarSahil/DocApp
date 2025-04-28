import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DashboardNavbar from '../../components/DashboardNavbar';
import { useAuth } from '../../context/AuthContext';
import DocumentList from '../../components/DocumenList';
import { useDocuments } from '../../context/DocumentsContext';
import { User } from '../../types/user';

interface AllDocumentsProps {
  route?: {
    params?: {
      createdBy?: string;
    };
  };
}


const AllDocuments: React.FC<AllDocumentsProps> = ({ route }) => {
  const { createdBy } = route?.params || {};
  const navigation = useNavigation();
  const { user } = useAuth();
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState('');
  const { setStatus, status, setCreatedBy } = useDocuments();

  useEffect(() => {
    if (createdBy !== undefined) {
      setCreatedBy(createdBy);
    }
  }, [createdBy, setCreatedBy]);

  useFocusEffect(
    React.useCallback(() => {
      setStatus('pending-rejected-correction-approved');
      return () => setStatus(status); // Ensure we reset status only when it's changed
    }, [setStatus])
  );
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <DashboardNavbar
        label="All Documents"
        showSearch={searchActive}
        searchValue={query}
        onSearchChange={handleSearchChange}
        onToggleSearch={toggleSearch}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={{ paddingHorizontal: 16, flex: 1, paddingTop: 14, backgroundColor: '#FFFFFF', paddingBottom: 16 }}>
        <DocumentList query={query} isAllDocsScreen={true} />
      </View>
    </SafeAreaView>
  );
};

export default AllDocuments;
