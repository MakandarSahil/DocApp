import axios from "axios";
import config from "../utils/config";
import { useContext, createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Document } from "../types/document";

type DocumentsContextType = {
  documents: Document[];
  isLoading: boolean;
  error: string;
  setDocuments: (docs: Document[]) => void;
  setDepartment: (dept: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  status: string;
  setStatus: (status: string) => void;
  setCreatedBy: (creator: string) => void;
  refreshDocuments: () => Promise<void>;
};

const DocumentsContext = createContext<DocumentsContextType>({} as DocumentsContextType);

export const useDocuments = () => useContext(DocumentsContext);

const DocumentsProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [createdBy, setCreatedBy] = useState("");

  const fetchDocuments = useCallback(async () => {
    const queryParams = new URLSearchParams();
    if (department) queryParams.append('department', department);
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);
    if (status) queryParams.append('status', status);
    if (createdBy) queryParams.append('createdBy', createdBy);

    try {
      setIsLoading(true);
      const getDocUrl = `${config.API_URL}/file/get-documents?${queryParams}`;
      const response = await axios.get(getDocUrl, { withCredentials: true });
      setDocuments(response.data.documents);
      console.log(response.data.documents);
    } catch (err: any) {
      console.error("Error while fetching documents:", err?.message);
      setError("Error while fetching documents. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [department, startDate, endDate, status, createdBy]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        isLoading,
        error,
        setDocuments,
        setDepartment,
        setStartDate,
        setEndDate,
        status,
        setStatus,
        setCreatedBy,
        refreshDocuments: fetchDocuments, // expose it
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export default DocumentsProvider;
