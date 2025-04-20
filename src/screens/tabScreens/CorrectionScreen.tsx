import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DocumentList from '../../components/DocumenList';

interface Document {
  id: string;
  name: string;
  status: string;
  date: string;
  role: string;
}

// Simulated filtered fetch
const dummyDocuments: Document[] = [
  // ===== CORRECTION =====
  { id: '91', name: 'Doc A1.pdf', status: 'correction', date: '2023-06-25', role: 'approver' },
  { id: '92', name: 'Doc A2.pdf', status: 'correction', date: '2023-06-24', role: 'approver' },
  { id: '93', name: 'Doc A3.pdf', status: 'correction', date: '2023-06-23', role: 'approver' },
  { id: '94', name: 'Doc A4.pdf', status: 'correction', date: '2023-06-22', role: 'approver' },
  { id: '95', name: 'Doc A5.pdf', status: 'correction', date: '2023-06-21', role: 'approver' },
  { id: '96', name: 'Doc A6.pdf', status: 'correction', date: '2023-06-20', role: 'approver' },
  { id: '97', name: 'Doc A7.pdf', status: 'correction', date: '2023-06-19', role: 'approver' },
  { id: '98', name: 'Doc A8.pdf', status: 'correction', date: '2023-06-18', role: 'approver' },
  { id: '99', name: 'Doc A9.pdf', status: 'correction', date: '2023-06-17', role: 'approver' },
  { id: '100', name: 'Doc A10.pdf', status: 'correction', date: '2023-06-16', role: 'approver' },

  { id: '101', name: 'Doc B1.pdf', status: 'correction', date: '2023-06-25', role: 'assistant' },
  { id: '102', name: 'Doc B2.pdf', status: 'correction', date: '2023-06-24', role: 'assistant' },
  { id: '103', name: 'Doc B3.pdf', status: 'correction', date: '2023-06-23', role: 'assistant' },
  { id: '104', name: 'Doc B4.pdf', status: 'correction', date: '2023-06-22', role: 'assistant' },
  { id: '105', name: 'Doc B5.pdf', status: 'correction', date: '2023-06-21', role: 'assistant' },
  { id: '106', name: 'Doc B6.pdf', status: 'correction', date: '2023-06-20', role: 'assistant' },
  { id: '107', name: 'Doc B7.pdf', status: 'correction', date: '2023-06-19', role: 'assistant' },
  { id: '108', name: 'Doc B8.pdf', status: 'correction', date: '2023-06-18', role: 'assistant' },
  { id: '109', name: 'Doc B9.pdf', status: 'correction', date: '2023-06-17', role: 'assistant' },
  { id: '110', name: 'Doc B10.pdf', status: 'correction', date: '2023-06-16', role: 'assistant' },

  { id: '111', name: 'Doc C1.pdf', status: 'correction', date: '2023-06-25', role: 'admin' },
  { id: '112', name: 'Doc C2.pdf', status: 'correction', date: '2023-06-24', role: 'admin' },
  { id: '113', name: 'Doc C3.pdf', status: 'correction', date: '2023-06-23', role: 'admin' },
  { id: '114', name: 'Doc C4.pdf', status: 'correction', date: '2023-06-22', role: 'admin' },
  { id: '115', name: 'Doc C5.pdf', status: 'correction', date: '2023-06-21', role: 'admin' },
  { id: '116', name: 'Doc C6.pdf', status: 'correction', date: '2023-06-20', role: 'admin' },
  { id: '117', name: 'Doc C7.pdf', status: 'correction', date: '2023-06-19', role: 'admin' },
  { id: '118', name: 'Doc C8.pdf', status: 'correction', date: '2023-06-18', role: 'admin' },
  { id: '119', name: 'Doc C9.pdf', status: 'correction', date: '2023-06-17', role: 'admin' },
  { id: '120', name: 'Doc C10.pdf', status: 'correction', date: '2023-06-16', role: 'admin' },
];

const CorrectionScreen = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const userRole = 'approver'; // will be dynamic later
  const status = 'correction';

  useEffect(() => {
    // simulate fetching from backend
    const fetchDocs = async () => {
      const filtered = dummyDocuments.filter(
        (doc) => doc.status === status && doc.role === userRole
      );
      setDocuments(filtered);
    };
    fetchDocs();
  }, [userRole, status]);

  return (
    <View style={styles.container}>
      <DocumentList documents={documents} userRole={userRole} status={status} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CorrectionScreen;
