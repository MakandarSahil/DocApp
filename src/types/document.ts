export interface Document {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'correction';
  createdDate: string;
  createdBy: {
    username: string;
    fullName: string;
  };
  role: 'admin' | 'approver' | 'assistant';
  fileUrl?: string; // Optional file preview/download link
}