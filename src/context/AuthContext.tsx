import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserType = {
  username: string;
  role: 'ADMIN' | 'ASSISTANT' | 'APPROVER';
};

type AuthContextType = {
  user: UserType | null;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const login = (username: string, password: string) => {
    // Mock logic: infer role from username
    const role =
      username.toLowerCase() === 'admin'
        ? 'ADMIN'
        : username.toLowerCase() === 'approver'
        ? 'APPROVER'
        : 'ASSISTANT';

    setUser({ username, role });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
