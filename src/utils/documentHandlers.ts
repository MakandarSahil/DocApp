import { Document } from '../types/document';

/**
 * Simulated download handler
 */
export const downloadDocument = (document: Document) => {
  console.log(`🔽 Downloading document: ${document.name}`);
};

/**
 * Simulated preview handler
 */
export const previewDocumentInBrowser = (document: Document) => {
  console.log(`👁️ Previewing document: ${document.name}`);
};
