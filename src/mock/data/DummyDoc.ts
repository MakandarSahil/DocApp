export interface Document {
  id: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected' | 'correction';
  date: string;
  role: 'admin' | 'approver' | 'assistant';
}

export const dummyDocuments: Document[] = [

  //pendig tab data
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

]

export const getFilteredDocuments = (
  status: Document['status'],
  role: Document['role'],
  query: string
): Document[] => {
  return dummyDocuments.filter(
    (doc) =>
      doc.status === status &&
      doc.role === role &&
      doc.name.toLowerCase().includes(query.toLowerCase())
  );
};