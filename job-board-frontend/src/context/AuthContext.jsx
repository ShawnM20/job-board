import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for logged in user on page load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    // Save to localStorage so other pages can see the token
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Helper functions for role checking
  const isCompany = () => {
    return user?.role === 'company';
  };

  const isJobSeeker = () => {
    return user?.role === 'user';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    if (user.role === 'company') {
      return user.companyName || user.contactName || user.name;
    }
    return user.name;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isCompany, 
      isJobSeeker, 
      isAuthenticated, 
      getUserDisplayName 
    }}>
      {children}
    </AuthContext.Provider>
  );
};