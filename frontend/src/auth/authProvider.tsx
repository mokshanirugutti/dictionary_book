import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { url } from '../hooks/useAuth';

interface AuthContextType {
  user: string | null;
  loading: boolean;
  login: (username: string, password: string, navigate: any) => void;
  logout: () => void;
  errorMessage:string;
  register :(username: string,email:string, password: string, navigate: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  

  useEffect(() => {
    // Check localStorage for a token on mount
    const token = localStorage.getItem('token');
    if (token) {
      const storedUser = localStorage.getItem('username');
      if (storedUser) {
        setUser(storedUser);
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string, navigate: any) => {
    const response = await fetch(`${url}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username); // Store username
      setUser(username);
      navigate('/');
    } else if (data.error){
      console.error('Invalid credentials');
      setErrorMessage('Invalid credentials')
    }else {
      console.error('unexpteced happened');
    }
  };
  const register = async (username: string,email:string, password: string, navigate: any) => {
    const response = await fetch(`${url}/api/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username,email, password }),
    });

    const data = await response.json();
    if(data.message){
      navigate('/login')
    }
    if(data.error){
      setErrorMessage(data.error)
    }
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Remove stored username
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, errorMessage, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
