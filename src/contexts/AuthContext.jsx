import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default admin credentials (hashed)
  const defaultCredentials = {
    username: 'admin',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // peterl123
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = Cookies.get('admin_token');
      const userData = Cookies.get('admin_user');
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      // Get stored credentials or use defaults
      const storedCredentials = JSON.parse(localStorage.getItem('admin_credentials') || JSON.stringify(defaultCredentials));
      
      if (username === storedCredentials.username && await bcrypt.compare(password, storedCredentials.password)) {
        const userData = {
          id: 1,
          username: username,
          role: 'admin',
          loginTime: new Date().toISOString()
        };
        
        // Set cookies with 24 hour expiry
        Cookies.set('admin_token', 'admin_authenticated', { expires: 1 });
        Cookies.set('admin_user', JSON.stringify(userData), { expires: 1 });
        
        setIsAuthenticated(true);
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    Cookies.remove('admin_token');
    Cookies.remove('admin_user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const storedCredentials = JSON.parse(localStorage.getItem('admin_credentials') || JSON.stringify(defaultCredentials));
      
      if (await bcrypt.compare(currentPassword, storedCredentials.password)) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const newCredentials = {
          username: storedCredentials.username,
          password: hashedNewPassword
        };
        
        localStorage.setItem('admin_credentials', JSON.stringify(newCredentials));
        return { success: true };
      } else {
        return { success: false, error: 'Current password is incorrect' };
      }
    } catch (error) {
      return { success: false, error: 'Password change failed' };
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};