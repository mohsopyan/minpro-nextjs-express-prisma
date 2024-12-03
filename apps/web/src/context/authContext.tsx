import React, { createContext, useContext, ReactNode, useState } from 'react';

// Tipe untuk User
interface User {
  id: number;
  email: string;
  role: string; // Pastikan role ada di sini
  referralCode: string | null;
}

// Tipe untuk AuthContext
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Tipe untuk Props pada AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Membuat Context dengan nilai default null
const AuthContext = createContext<AuthContextType | null>(null);

// Provider untuk AuthContext
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // State untuk menyimpan informasi user
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook untuk mengakses AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
