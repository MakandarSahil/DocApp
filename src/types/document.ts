export interface Document {
  id: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected' | 'correction';
  date: string;
  role: 'admin' | 'approver' | 'assistant';
  fileUrl?: string; // Optional file preview/download link
}