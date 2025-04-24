import axios from "axios";
import config from "../utils/config"
import { useContext, createContext, useState, useEffect } from "react";

const DocumentsContext = createContext<any>({});

export const useDocuments = () => useContext(DocumentsContext);

const DocumentsProvider = ({ children }: { children: React.ReactNode }) => {

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([]);
  // const [query, setQuery] = useState("") 
  const [department, setDepartment] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [status, setStatus] = useState('pending')
  // const [sort, setSort] = useState('title:asc')
  const [createdBy, setCreatedBy] = useState('')



  useEffect(() => {

    const getDocuments = async () => {
      const queryParams = new URLSearchParams();

      if (department) queryParams.append('department', department);
      if (startDate) queryParams.append('startDate', startDate);
      if (endDate) queryParams.append('endDate', endDate);
      if (status) queryParams.append('status', status);
      if (createdBy) queryParams.append('createdBy', createdBy);

      console.log("queryParams : ", queryParams)
      console.log(queryParams)
      try {

        console.log(config.API_URL);
        setIsLoading(true);
        const getDocUrl = config.API_URL + `/file/get-documents?${queryParams}`;

        console.log(getDocUrl)
        const response = await axios.get(getDocUrl, {
          withCredentials: true,
        });

        console.log("documents : ", response.data.documents)
        setDocuments(response.data.documents);
        setIsLoading(false);

      } catch (err: any) {
        console.log("error while fetching documents", err?.message);
        setError("Error while fetching documents. Please try again later.");
        setIsLoading(false);
      }
    }

    getDocuments();
  }, [status, department, startDate, endDate, createdBy])




  return (
    <DocumentsContext.Provider value={{ documents, isLoading, error, setDocuments, setDepartment, setStartDate, setEndDate, status, setStatus, setCreatedBy }}>
      {children}
    </DocumentsContext.Provider>
  );
};

export default DocumentsProvider;