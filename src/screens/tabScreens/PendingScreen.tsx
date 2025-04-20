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
  // Approver
  { id: '1', name: 'Doc A1.pdf', status: 'pending', date: '2023-06-15', role: 'approver' },
  { id: '2', name: 'Doc A2.pdf', status: 'pending', date: '2023-06-14', role: 'approver' },
  { id: '3', name: 'Doc A3.pdf', status: 'pending', date: '2023-06-13', role: 'approver' },
  { id: '4', name: 'Doc A4.pdf', status: 'pending', date: '2023-06-12', role: 'approver' },
  { id: '5', name: 'Doc A5.pdf', status: 'pending', date: '2023-06-11', role: 'approver' },
  { id: '6', name: 'Doc A6.pdf', status: 'pending', date: '2023-06-10', role: 'approver' },
  { id: '7', name: 'Doc A7.pdf', status: 'pending', date: '2023-06-09', role: 'approver' },
  { id: '8', name: 'Doc A8.pdf', status: 'pending', date: '2023-06-08', role: 'approver' },
  { id: '9', name: 'Doc A9.pdf', status: 'pending', date: '2023-06-07', role: 'approver' },
  { id: '10', name: 'Doc A10.pdf', status: 'pending', date: '2023-06-06', role: 'approver' },

  // Assistant
  { id: '11', name: 'Doc B1.pdf', status: 'pending', date: '2023-06-15', role: 'assistant' },
  { id: '12', name: 'Doc B2.pdf', status: 'pending', date: '2023-06-14', role: 'assistant' },
  { id: '13', name: 'Doc B3.pdf', status: 'pending', date: '2023-06-13', role: 'assistant' },
  { id: '14', name: 'Doc B4.pdf', status: 'pending', date: '2023-06-12', role: 'assistant' },
  { id: '15', name: 'Doc B5.pdf', status: 'pending', date: '2023-06-11', role: 'assistant' },
  { id: '16', name: 'Doc B6.pdf', status: 'pending', date: '2023-06-10', role: 'assistant' },
  { id: '17', name: 'Doc B7.pdf', status: 'pending', date: '2023-06-09', role: 'assistant' },
  { id: '18', name: 'Doc B8.pdf', status: 'pending', date: '2023-06-08', role: 'assistant' },
  { id: '19', name: 'Doc B9.pdf', status: 'pending', date: '2023-06-07', role: 'assistant' },
  { id: '20', name: 'Doc B10.pdf', status: 'pending', date: '2023-06-06', role: 'assistant' },

  // Admin
  { id: '21', name: 'Doc C1.pdf', status: 'pending', date: '2023-06-15', role: 'admin' },
  { id: '22', name: 'Doc C2.pdf', status: 'pending', date: '2023-06-14', role: 'admin' },
  { id: '23', name: 'Doc C3.pdf', status: 'pending', date: '2023-06-13', role: 'admin' },
  { id: '24', name: 'Doc C4.pdf', status: 'pending', date: '2023-06-12', role: 'admin' },
  { id: '25', name: 'Doc C5.pdf', status: 'pending', date: '2023-06-11', role: 'admin' },
  { id: '26', name: 'Doc C6.pdf', status: 'pending', date: '2023-06-10', role: 'admin' },
  { id: '27', name: 'Doc C7.pdf', status: 'pending', date: '2023-06-09', role: 'admin' },
  { id: '28', name: 'Doc C8.pdf', status: 'pending', date: '2023-06-08', role: 'admin' },
  { id: '29', name: 'Doc C9.pdf', status: 'pending', date: '2023-06-07', role: 'admin' },
  { id: '30', name: 'Doc C10.pdf', status: 'pending', date: '2023-06-06', role: 'admin' },
];


const PendingScreen = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const userRole = 'approver'; // will be dynamic later
  const status = 'pending';

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
