import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserType = {
  username: string;
  role: 'ADMIN' | 'ASSISTANT' | 'APPROVER';
};

type AuthContextType = {
  user: UserType | null;
  login: (username: string, password: string) => void;
  logout: () => Promise<void>;  // Make logout async
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const login = (username: string, password: string) => {
    const role =
      username.toLowerCase() === 'admin'
        ? 'ADMIN'
        : username.toLowerCase() === 'approver'
        ? 'APPROVER'
        : 'ASSISTANT';

    setUser({ username, role });
  };

  const logout = async () => {
    setUser(null);
    // Add any async cleanup here if needed
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};