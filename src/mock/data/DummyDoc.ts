import { Document } from '../../types/document'; // Import the shared interface

// Sample document data with proper status types
export const dummyDocuments: Document[] = [
  // ----- APPROVED -----
  { id: '1', name: 'Financial Report Q1.pdf', status: 'approved', date: '2025-04-01', role: 'approver', fileUrl: 'https://example.com/docs/1.pdf' },
  { id: '2', name: 'Budget Allocation FY25.pdf', status: 'approved', date: '2025-04-02', role: 'approver', fileUrl: 'https://example.com/docs/2.pdf' },
  { id: '3', name: 'Hiring Plan.pdf', status: 'approved', date: '2025-04-03', role: 'assistant', fileUrl: 'https://example.com/docs/3.pdf' },
  { id: '4', name: 'Audit Summary.pdf', status: 'approved', date: '2025-04-04', role: 'admin', fileUrl: 'https://example.com/docs/4.pdf' },
  { id: '5', name: 'Product Design.pdf', status: 'approved', date: '2025-04-05', role: 'approver', fileUrl: 'https://example.com/docs/5.pdf' },
  { id: '6', name: 'Customer Feedback.pdf', status: 'approved', date: '2025-04-06', role: 'assistant', fileUrl: 'https://example.com/docs/6.pdf' },
  { id: '7', name: 'Vendor Agreement.pdf', status: 'approved', date: '2025-04-07', role: 'admin', fileUrl: 'https://example.com/docs/7.pdf' },
  { id: '8', name: 'Software License.pdf', status: 'approved', date: '2025-04-08', role: 'approver', fileUrl: 'https://example.com/docs/8.pdf' },
  { id: '9', name: 'Compliance Checklist.pdf', status: 'approved', date: '2025-04-09', role: 'assistant', fileUrl: 'https://example.com/docs/9.pdf' },
  { id: '10', name: 'Strategic Plan.pdf', status: 'approved', date: '2025-04-10', role: 'admin', fileUrl: 'https://example.com/docs/10.pdf' },

  // ----- PENDING -----
  { id: '11', name: 'New Project Proposal.pdf', status: 'pending', date: '2025-04-11', role: 'approver', fileUrl: 'https://example.com/docs/11.pdf' },
  { id: '12', name: 'Marketing Plan.pdf', status: 'pending', date: '2025-04-12', role: 'approver', fileUrl: 'https://example.com/docs/12.pdf' },
  { id: '13', name: 'Q2 Goals.pdf', status: 'pending', date: '2025-04-13', role: 'assistant', fileUrl: 'https://example.com/docs/13.pdf' },
  { id: '14', name: 'IT Infrastructure Plan.pdf', status: 'pending', date: '2025-04-14', role: 'approver', fileUrl: 'https://example.com/docs/14.pdf' },
  { id: '15', name: 'Annual Review Template.pdf', status: 'pending', date: '2025-04-15', role: 'approver', fileUrl: 'https://example.com/docs/15.pdf' },
  { id: '16', name: 'Workshop Schedule.pdf', status: 'pending', date: '2025-04-16', role: 'assistant', fileUrl: 'https://example.com/docs/16.pdf' },
  { id: '17', name: 'Job Descriptions.pdf', status: 'pending', date: '2025-04-17', role: 'admin', fileUrl: 'https://example.com/docs/17.pdf' },
  { id: '18', name: 'Team Structure.pdf', status: 'pending', date: '2025-04-18', role: 'approver', fileUrl: 'https://example.com/docs/18.pdf' },
  { id: '19', name: 'Vendor Quotes.pdf', status: 'pending', date: '2025-04-19', role: 'assistant', fileUrl: 'https://example.com/docs/19.pdf' },
  { id: '20', name: 'Meeting Notes.pdf', status: 'pending', date: '2025-04-20', role: 'admin', fileUrl: 'https://example.com/docs/20.pdf' },

  // ----- REJECTED -----
  { id: '21', name: 'Outdated Brochure.pdf', status: 'rejected', date: '2025-04-01', role: 'admin', fileUrl: 'https://example.com/docs/21.pdf' },
  { id: '22', name: 'Incomplete Timesheet.pdf', status: 'rejected', date: '2025-04-02', role: 'approver', fileUrl: 'https://example.com/docs/22.pdf' },
  { id: '23', name: 'Draft Policy.pdf', status: 'rejected', date: '2025-04-03', role: 'assistant', fileUrl: 'https://example.com/docs/23.pdf' },
  { id: '24', name: 'Client Onboarding Checklist.pdf', status: 'rejected', date: '2025-04-04', role: 'admin', fileUrl: 'https://example.com/docs/24.pdf' },
  { id: '25', name: 'Unformatted Resume.pdf', status: 'rejected', date: '2025-04-05', role: 'approver', fileUrl: 'https://example.com/docs/25.pdf' },
  { id: '26', name: 'Broken Image Links.pdf', status: 'rejected', date: '2025-04-06', role: 'assistant', fileUrl: 'https://example.com/docs/26.pdf' },
  { id: '27', name: 'Outdated Compliance File.pdf', status: 'rejected', date: '2025-04-07', role: 'admin', fileUrl: 'https://example.com/docs/27.pdf' },
  { id: '28', name: 'Duplicate Document.pdf', status: 'rejected', date: '2025-04-08', role: 'approver', fileUrl: 'https://example.com/docs/28.pdf' },
  { id: '29', name: 'Incorrect Metrics.pdf', status: 'rejected', date: '2025-04-09', role: 'assistant', fileUrl: 'https://example.com/docs/29.pdf' },
  { id: '30', name: 'Security Checklist Fail.pdf', status: 'rejected', date: '2025-04-10', role: 'admin', fileUrl: 'https://example.com/docs/30.pdf' },

  // ----- CORRECTION -----
  { id: '31', name: 'HR Manual Draft.pdf', status: 'correction', date: '2025-04-11', role: 'admin', fileUrl: 'https://example.com/docs/31.pdf' },
  { id: '32', name: 'Pending Invoices.pdf', status: 'correction', date: '2025-04-12', role: 'approver', fileUrl: 'https://example.com/docs/32.pdf' },
  { id: '33', name: 'Training Material.pdf', status: 'correction', date: '2025-04-13', role: 'assistant', fileUrl: 'https://example.com/docs/33.pdf' },
  { id: '34', name: 'Legal Notice.pdf', status: 'correction', date: '2025-04-14', role: 'admin', fileUrl: 'https://example.com/docs/34.pdf' },
  { id: '35', name: 'Policy Edits.pdf', status: 'correction', date: '2025-04-15', role: 'approver', fileUrl: 'https://example.com/docs/35.pdf' },
  { id: '36', name: 'Org Chart Update.pdf', status: 'correction', date: '2025-04-16', role: 'assistant', fileUrl: 'https://example.com/docs/36.pdf' },
  { id: '37', name: 'Review Notes.pdf', status: 'correction', date: '2025-04-17', role: 'admin', fileUrl: 'https://example.com/docs/37.pdf' },
  { id: '38', name: 'UI Mockups.pdf', status: 'correction', date: '2025-04-18', role: 'approver', fileUrl: 'https://example.com/docs/38.pdf' },
  { id: '39', name: 'Budget Draft.pdf', status: 'correction', date: '2025-04-19', role: 'assistant', fileUrl: 'https://example.com/docs/39.pdf' },
  { id: '40', name: 'Security Policy Draft.pdf', status: 'correction', date: '2025-04-20', role: 'admin', fileUrl: 'https://example.com/docs/40.pdf' },
];

// Function to filter documents based on status, role, and query
export const getFilteredDocuments = (
  status: string, 
  role: string, 
  query: string
): Document[] => {
  // Ensure status is cast to the correct type
  const statusTyped = status as "approved" | "pending" | "rejected" | "correction";
  
  return dummyDocuments.filter(
    (doc) =>
      doc.status === statusTyped &&
      doc.role === role &&
      doc.name.toLowerCase().includes(query.toLowerCase())
  );
};

// Export necessary types or functions
export type { Document };