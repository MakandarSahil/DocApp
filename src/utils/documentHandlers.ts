import { Document } from '../types/document';


export const downloadDocument = (document: Document) => {
  console.log(`🔽 Downloading document: ${document.title}`);
};

/**
 * Simulated preview handler
 */
export const previewDocumentInBrowser = (document: Document) => {
  console.log(`👁️ Previewing document: ${document.title}`);
};
