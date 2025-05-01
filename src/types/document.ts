export interface Document {
  id: string;
  title: string;
  fileUniqueName: string;
  status: 'pending' | 'approved' | 'rejected' | 'correction';
  createdDate: string;
  correctionDate?: string; // Optional correction date for correction status
  approvedDate?: string; // Optional approval date for approved status
  rejectedDate?: string; // Optional rejection date for rejected status
  approvedBy?: {
    username: string;
    fullName: string;
  };
  rejectedBy?: {
    username: string;
    fullName: string;
  };
  correctionBy?: {
    username: string;
    fullName: string;
  };
  createdBy: {
    username: string;
    fullName: string;
  };
  remarks?: string; // Optional remarks for rejection or correction
  role: 'admin' | 'approver' | 'assistant';
  department: {
    departmentId: string;
    departmentName: string;
  };
  fileUrl?: string; // Optional file preview/download link
  documentUrl?: string; // Optional document preview/download link
}
