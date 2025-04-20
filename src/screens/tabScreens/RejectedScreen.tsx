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
    // ===== REJECTED =====
    { id: '61', name: 'Doc A1.pdf', status: 'rejected', date: '2023-06-20', role: 'approver' },
    { id: '62', name: 'Doc A2.pdf', status: 'rejected', date: '2023-06-19', role: 'approver' },
    { id: '63', name: 'Doc A3.pdf', status: 'rejected', date: '2023-06-18', role: 'approver' },
    { id: '64', name: 'Doc A4.pdf', status: 'rejected', date: '2023-06-17', role: 'approver' },
    { id: '65', name: 'Doc A5.pdf', status: 'rejected', date: '2023-06-16', role: 'approver' },
    { id: '66', name: 'Doc A6.pdf', status: 'rejected', date: '2023-06-15', role: 'approver' },
    { id: '67', name: 'Doc A7.pdf', status: 'rejected', date: '2023-06-14', role: 'approver' },
    { id: '68', name: 'Doc A8.pdf', status: 'rejected', date: '2023-06-13', role: 'approver' },
    { id: '69', name: 'Doc A9.pdf', status: 'rejected', date: '2023-06-12', role: 'approver' },
    { id: '70', name: 'Doc A10.pdf', status: 'rejected', date: '2023-06-11', role: 'approver' },
  
    { id: '71', name: 'Doc B1.pdf', status: 'rejected', date: '2023-06-20', role: 'assistant' },
    { id: '72', name: 'Doc B2.pdf', status: 'rejected', date: '2023-06-19', role: 'assistant' },
    { id: '73', name: 'Doc B3.pdf', status: 'rejected', date: '2023-06-18', role: 'assistant' },
    { id: '74', name: 'Doc B4.pdf', status: 'rejected', date: '2023-06-17', role: 'assistant' },
    { id: '75', name: 'Doc B5.pdf', status: 'rejected', date: '2023-06-16', role: 'assistant' },
    { id: '76', name: 'Doc B6.pdf', status: 'rejected', date: '2023-06-15', role: 'assistant' },
    { id: '77', name: 'Doc B7.pdf', status: 'rejected', date: '2023-06-14', role: 'assistant' },
    { id: '78', name: 'Doc B8.pdf', status: 'rejected', date: '2023-06-13', role: 'assistant' },
    { id: '79', name: 'Doc B9.pdf', status: 'rejected', date: '2023-06-12', role: 'assistant' },
    { id: '80', name: 'Doc B10.pdf', status: 'rejected', date: '2023-06-11', role: 'assistant' },
  
    { id: '81', name: 'Doc C1.pdf', status: 'rejected', date: '2023-06-20', role: 'admin' },
    { id: '82', name: 'Doc C2.pdf', status: 'rejected', date: '2023-06-19', role: 'admin' },
    { id: '83', name: 'Doc C3.pdf', status: 'rejected', date: '2023-06-18', role: 'admin' },
    { id: '84', name: 'Doc C4.pdf', status: 'rejected', date: '2023-06-17', role: 'admin' },
    { id: '85', name: 'Doc C5.pdf', status: 'rejected', date: '2023-06-16', role: 'admin' },
    { id: '86', name: 'Doc C6.pdf', status: 'rejected', date: '2023-06-15', role: 'admin' },
    { id: '87', name: 'Doc C7.pdf', status: 'rejected', date: '2023-06-14', role: 'admin' },
    { id: '88', name: 'Doc C8.pdf', status: 'rejected', date: '2023-06-13', role: 'admin' },
    { id: '89', name: 'Doc C9.pdf', status: 'rejected', date: '2023-06-12', role: 'admin' },
    { id: '90', name: 'Doc C10.pdf', status: 'rejected', date: '2023-06-11', role: 'admin' },
  
];

const PendingScreen = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const userRole = 'approver'; // will be dynamic later
  const status = 'rejected';

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

export default PendingScreen;
