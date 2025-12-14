import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'user' | 'exporter' | 'importer' | 'micro-manufacturer' | 'manufacturer';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  pendingRoleActivation?: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithMetaMask: () => Promise<void>;
  loginWithWalletConnect: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateRole: (role: UserRole) => void;
  requestRoleActivation: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('tradechain_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      name: email.split('@')[0],
      role: 'user',
      isVerified: true
    };
    setUser(newUser);
    localStorage.setItem('tradechain_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      id: crypto.randomUUID(),
      email: 'user@gmail.com',
      name: 'Google User',
      role: 'user',
      isVerified: true
    };
    setUser(newUser);
    localStorage.setItem('tradechain_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const loginWithMetaMask = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In production, this would connect to MetaMask
      // For now, we'll simulate a successful connection
      const address = '0x' + crypto.randomUUID().replace(/-/g, '').substring(0, 40);
      const newUser: User = {
        id: crypto.randomUUID(),
        email: `${address.substring(0, 10)}@metamask.wallet`,
        name: `MetaMask User ${address.substring(2, 8)}`,
        role: 'user',
        isVerified: true
      };
      setUser(newUser);
      localStorage.setItem('tradechain_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithWalletConnect = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In production, this would use WalletConnect
      // For now, we'll simulate a successful connection
      const address = '0x' + crypto.randomUUID().replace(/-/g, '').substring(0, 40);
      const newUser: User = {
        id: crypto.randomUUID(),
        email: `${address.substring(0, 10)}@walletconnect.wallet`,
        name: `WalletConnect User ${address.substring(2, 8)}`,
        role: 'user',
        isVerified: true
      };
      setUser(newUser);
      localStorage.setItem('tradechain_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      name,
      role: 'user',
      isVerified: true
    };
    setUser(newUser);
    localStorage.setItem('tradechain_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tradechain_user');
  };

  const updateRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role, isVerified: true, pendingRoleActivation: undefined };
      setUser(updatedUser);
      localStorage.setItem('tradechain_user', JSON.stringify(updatedUser));
    }
  };

  const requestRoleActivation = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, pendingRoleActivation: role };
      setUser(updatedUser);
      localStorage.setItem('tradechain_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      loginWithGoogle,
      loginWithMetaMask,
      loginWithWalletConnect,
      signup,
      logout,
      updateRole,
      requestRoleActivation
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
