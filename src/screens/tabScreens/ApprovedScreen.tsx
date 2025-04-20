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
  { id: '31', name: 'Doc A1.pdf', status: 'approved', date: '2023-06-05', role: 'approver' },
  { id: '32', name: 'Doc A2.pdf', status: 'approved', date: '2023-06-04', role: 'approver' },
  { id: '33', name: 'Doc A3.pdf', status: 'approved', date: '2023-06-03', role: 'approver' },
  { id: '34', name: 'Doc A4.pdf', status: 'approved', date: '2023-06-02', role: 'approver' },
  { id: '35', name: 'Doc A5.pdf', status: 'approved', date: '2023-06-01', role: 'approver' },
  { id: '36', name: 'Doc A6.pdf', status: 'approved', date: '2023-05-31', role: 'approver' },
  { id: '37', name: 'Doc A7.pdf', status: 'approved', date: '2023-05-30', role: 'approver' },
  { id: '38', name: 'Doc A8.pdf', status: 'approved', date: '2023-05-29', role: 'approver' },
  { id: '39', name: 'Doc A9.pdf', status: 'approved', date: '2023-05-28', role: 'approver' },
  { id: '40', name: 'Doc A10.pdf', status: 'approved', date: '2023-05-27', role: 'approver' },

  { id: '41', name: 'Doc B1.pdf', status: 'approved', date: '2023-06-05', role: 'assistant' },
  { id: '42', name: 'Doc B2.pdf', status: 'approved', date: '2023-06-04', role: 'assistant' },
  { id: '43', name: 'Doc B3.pdf', status: 'approved', date: '2023-06-03', role: 'assistant' },
  { id: '44', name: 'Doc B4.pdf', status: 'approved', date: '2023-06-02', role: 'assistant' },
  { id: '45', name: 'Doc B5.pdf', status: 'approved', date: '2023-06-01', role: 'assistant' },
  { id: '46', name: 'Doc B6.pdf', status: 'approved', date: '2023-05-31', role: 'assistant' },
  { id: '47', name: 'Doc B7.pdf', status: 'approved', date: '2023-05-30', role: 'assistant' },
  { id: '48', name: 'Doc B8.pdf', status: 'approved', date: '2023-05-29', role: 'assistant' },
  { id: '49', name: 'Doc B9.pdf', status: 'approved', date: '2023-05-28', role: 'assistant' },
  { id: '50', name: 'Doc B10.pdf', status: 'approved', date: '2023-05-27', role: 'assistant' },

  { id: '51', name: 'Doc C1.pdf', status: 'approved', date: '2023-06-05', role: 'admin' },
  { id: '52', name: 'Doc C2.pdf', status: 'approved', date: '2023-06-04', role: 'admin' },
  { id: '53', name: 'Doc C3.pdf', status: 'approved', date: '2023-06-03', role: 'admin' },
  { id: '54', name: 'Doc C4.pdf', status: 'approved', date: '2023-06-02', role: 'admin' },
  { id: '55', name: 'Doc C5.pdf', status: 'approved', date: '2023-06-01', role: 'admin' },
  { id: '56', name: 'Doc C6.pdf', status: 'approved', date: '2023-05-31', role: 'admin' },
  { id: '57', name: 'Doc C7.pdf', status: 'approved', date: '2023-05-30', role: 'admin' },
  { id: '58', name: 'Doc C8.pdf', status: 'approved', date: '2023-05-29', role: 'admin' },
  { id: '59', name: 'Doc C9.pdf', status: 'approved', date: '2023-05-28', role: 'admin' },
  { id: '60', name: 'Doc C10.pdf', status: 'approved', date: '2023-05-27', role: 'admin' },
];

const ApprovedScreen = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const userRole = 'approver'; // will be dynamic later
  const status = 'approved';

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

export default ApprovedScreen;
