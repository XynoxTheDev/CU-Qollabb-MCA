'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserWithoutPassword } from '@/lib/shared/types';
import { users } from '@/lib/data/mock-data';

interface AuthContextType {
  user: UserWithoutPassword | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readStoredUser(): UserWithoutPassword | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem('user');
    return stored ? (JSON.parse(stored) as UserWithoutPassword) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithoutPassword | null>(readStoredUser);
  const isLoading = false;

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userWithoutPassword: UserWithoutPassword = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      };
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    void _password;
    const exists = users.find(u => u.email === email);
    if (exists) return false;

    const newUser: UserWithoutPassword = {
      id: String(users.length + 1),
      name,
      email,
      role: 'customer',
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, register }}>
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