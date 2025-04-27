import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import DocumentList from '../../components/DocumenList';
import { dummyDocuments, getFilteredDocuments } from '../../mock/data/DummyDoc';
import { downloadDocument } from '../../utils/documentHandlers';
import { Document } from '../../types/document';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContext';
import { useDocuments } from "../../context/DocumentsContext"
import { ActivityIndicator } from 'react-native-paper';

interface Props {
  query: string;
}

const PendingScreen: React.FC<Props> = ({ query }) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <DocumentList query={query} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  }
});

export default PendingScreen;
