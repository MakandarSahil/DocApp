import React, { createContext, useContext, useState, ReactNode } from 'react';

// AuthContext.tsx
type UserRole = 'ADMIN' | 'ASSISTANT' | 'APPROVER';

type UserType = {
  username: string;
  role: UserRole;
  // Add other user properties as needed
};

type AuthContextType = {
  user: UserType | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const login = async (username: string, password: string) => {
    // In a real app, you would verify credentials here
    const role = determineRoleFromUsername(username); // Implement this helper
    setUser({ username, role });
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Helper function (could be moved to a separate utils file)
function determineRoleFromUsername(username: string): UserRole {
  const normalized = username.toLowerCase();
  if (normalized.includes('admin')) return 'ADMIN';
  if (normalized.includes('approver')) return 'APPROVER';
  return 'ASSISTANT';
}