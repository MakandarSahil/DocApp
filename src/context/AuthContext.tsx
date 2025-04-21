import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
//@ts-ignore
import config from "../utils/config"
// AuthContext.tsx
type UserRole = 'admin' | 'assistant' | 'approver';

type UserType = {
  username: string;
  email: string;
  role: UserRole;
  fullName: string;
  mobileNo: string;
  isActive: boolean;
  // Add other user properties as needed
};

type AuthContextType = {
  user: UserType | null;
  login: (username: string, password: string, deviceToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => { },
  logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const login = async (username: string, password: string, deviceToken: string) => {

    try {
      const loginUrl = config.API_URL + '/auth/login';
      console.log(loginUrl)
      const response = await axios.post(loginUrl, {
        username,
        password,
        deviceToken
      });

      if (response.status === 200) {
        console.log("response", response.data);
        setUser(response.data.user);
      }


      console.log(user)
    } catch (error: any) {
      console.log("error : ", error.response.data.message);
    }
  };

  const logout = async () => {
    setUser(null);
    console.log(user)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// // Helper function (could be moved to a separate utils file)
// function determineRoleFromUsername(username: string): UserRole {
//   const normalized = username.toLowerCase();
//   if (normalized.includes('admin')) return 'ADMIN';
//   if (normalized.includes('approver')) return 'APPROVER';
//   return 'ASSISTANT';
// }