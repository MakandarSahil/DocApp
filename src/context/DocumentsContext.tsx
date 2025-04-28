import axios from "axios";
import config from "../utils/config";
import { useContext, createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Document } from "../types/document";
import { User } from "../types/user";

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
  createdBy: String | null;
  setCreatedBy: (creator: string) => void
  refreshDocuments: () => Promise<void>;
};

const DocumentsContext = createContext<DocumentsContextType>({} as DocumentsContextType);

export const useDocuments = () => useContext(DocumentsContext);

const DocumentsProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [createdBy, setCreatedBy] = useState<string | null>("");

  const fetchDocuments = useCallback(async () => {
    const queryParams = new URLSearchParams();

    // Append filters if they exist
    if (department) queryParams.append("department", department);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    if (status) queryParams.append("status", status);
    if (createdBy) queryParams.append("createdBy", createdBy); // Filter by user ID

    try {
      setIsLoading(true);
      const response = await axios.get(`${config.API_URL}/file/get-documents?${queryParams}`, {
        withCredentials: true,
      });
      setDocuments(response.data.documents);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError("Failed to fetch documents. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [department, startDate, endDate, status, createdBy]);

  // Auto-refetch when filters change
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
        createdBy, // <-- Now exposes `createdBy` in the context
        setCreatedBy,
        refreshDocuments: fetchDocuments,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export default DocumentsProvider;