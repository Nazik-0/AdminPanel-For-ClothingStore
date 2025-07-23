import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users for demo
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Admin',
      email: 'admin@clothingstore.com',
      role: 'super_admin',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=400',
      createdAt: '2024-01-01T00:00:00Z',
      lastLogin: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Sarah Manager',
      email: 'inventory@clothingstore.com',
      role: 'inventory_manager',
      avatar: 'https://images.pexels.com/photos/594421/pexels-photo-594421.jpeg?w=400',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '3',
      name: 'Mike Sales',
      email: 'sales@clothingstore.com',
      role: 'sales_manager',
      avatar: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?w=400',
      createdAt: '2024-01-01T00:00:00Z',
    },
  ];

  useEffect(() => {
    // Check for stored auth token on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password123') {
      const userWithLastLogin = {
        ...foundUser,
        lastLogin: new Date().toISOString(),
      };
      setUser(userWithLastLogin);
      localStorage.setItem('user', JSON.stringify(userWithLastLogin));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};