import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import DocumentList from '../../components/DocumenList'; 
import { dummyDocuments, Document, getFilteredDocuments } from '../../mock/data/DummyDoc';



interface Props {
  query: string;
  userRole?: 'admin' | 'approver' | 'assistant';
}



const CorrectionScreen: React.FC<Props> = ({ query, userRole }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const status = 'correction';

  // const fetchFilteredDocuments = useCallback(() => {
  //   if (!userRole) return;
  //   const filtered = dummyDocuments.filter(
  //     (doc) =>
  //       doc.status === status &&
  //       doc.role === userRole &&
  //       doc.name.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setDocuments(filtered);
  // }, [status, userRole, query]);

  useEffect(() => {
    if (!userRole) return;
    const filtered = getFilteredDocuments(status, userRole, query);
    setDocuments(filtered);
  }, [status, userRole, query]);

  return (
    <View style={styles.container}>
      <DocumentList documents={documents} userRole={userRole || ''} status={status} />
    </View>
  );
};

export default CorrectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


