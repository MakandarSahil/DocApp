import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
//@ts-ignore
import config from "../utils/config"
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => { },
  logout: async () => { },
  loading: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);


  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const authUrl = config.API_URL + "/auth/get-session";
      const response = await axios.get(authUrl, { withCredentials: true });
      //TODO: local storage setup for jwt token
      setUser(response.data.user);
    } catch (error) {
      setUser(null)
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (username: string, password: string, deviceToken: string) => {

    try {
      const loginUrl = config.API_URL + '/auth/login';
      console.log(loginUrl)
      const response = await axios.post(loginUrl, {
        username,
        password,
        deviceToken
      });

      const token = response.data.token

      await AsyncStorage.setItem('authToken', token);

      console.log("response", response.data);
      //TODO: local storage setup for jwt token
      setUser(response.data.user);
      console.log(response.data.user)
    } catch (error: any) {
      setUser(null);
      console.log("error : ", error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      const logoutUrl = config.API_URL + "/auth/logout";
      await axios.post(logoutUrl, { withCredentials: true });

      await AsyncStorage.removeItem('authToken');

      //TODO: local storage cleanup
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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