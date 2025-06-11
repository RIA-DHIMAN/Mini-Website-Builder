import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
  subscription: 'free' | 'pro' | 'enterprise';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  isLoading: boolean;
  getAllUsers: () => User[];
  updateUserRole: (userId: string, role: 'user' | 'admin') => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@pagecraft.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01',
    subscription: 'enterprise',
  },
  {
    id: '2',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
    createdAt: '2024-01-15',
    subscription: 'pro',
  },
  {
    id: '3',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'user',
    createdAt: '2024-02-01',
    subscription: 'free',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>(mockUsers);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('pagecraft_user');
    const savedUsers = localStorage.getItem('pagecraft_users');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      localStorage.setItem('pagecraft_users', JSON.stringify(mockUsers));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in our mock database
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser && password) {
      setUser(existingUser);
      localStorage.setItem('pagecraft_user', JSON.stringify(existingUser));
      setIsLoading(false);
      return true;
    }
    
    // For demo purposes, create new user if doesn't exist
    if (email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        role: email === 'admin@pagecraft.com' ? 'admin' : 'user',
        createdAt: new Date().toISOString().split('T')[0],
        subscription: 'free',
      };
      
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setUser(newUser);
      localStorage.setItem('pagecraft_user', JSON.stringify(newUser));
      localStorage.setItem('pagecraft_users', JSON.stringify(updatedUsers));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    if (name && email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: email === 'admin@pagecraft.com' ? 'admin' : 'user',
        createdAt: new Date().toISOString().split('T')[0],
        subscription: 'free',
      };
      
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setUser(newUser);
      localStorage.setItem('pagecraft_user', JSON.stringify(newUser));
      localStorage.setItem('pagecraft_users', JSON.stringify(updatedUsers));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...data };
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    
    setUser(updatedUser);
    setUsers(updatedUsers);
    localStorage.setItem('pagecraft_user', JSON.stringify(updatedUser));
    localStorage.setItem('pagecraft_users', JSON.stringify(updatedUsers));
    setIsLoading(false);
    return true;
  };

  const deleteAccount = async (): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUsers = users.filter(u => u.id !== user.id);
    setUsers(updatedUsers);
    setUser(null);
    localStorage.removeItem('pagecraft_user');
    localStorage.setItem('pagecraft_users', JSON.stringify(updatedUsers));
    setIsLoading(false);
    return true;
  };

  const getAllUsers = (): User[] => {
    return users;
  };

  const updateUserRole = async (userId: string, role: 'user' | 'admin'): Promise<boolean> => {
    if (!user || user.role !== 'admin') return false;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUsers = users.map(u => u.id === userId ? { ...u, role } : u);
    setUsers(updatedUsers);
    localStorage.setItem('pagecraft_users', JSON.stringify(updatedUsers));
    setIsLoading(false);
    return true;
  };

  const deleteUser = async (userId: string): Promise<boolean> => {
    if (!user || user.role !== 'admin') return false;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('pagecraft_users', JSON.stringify(updatedUsers));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pagecraft_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      updateProfile,
      deleteAccount,
      isLoading,
      getAllUsers,
      updateUserRole,
      deleteUser
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