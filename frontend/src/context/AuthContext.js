import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        
        if (token && user) {
          try {
            const response = await axios.get('http://localhost:8000/api/verify-token/', {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.data.valid) {
              setAuthState({
                isAuthenticated: true,
                user: response.data.user,
                token: token,
                loading: false
              });
            } else {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setAuthState({
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false
              });
            }
          } catch (error) {
            console.error('Token verification failed:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setAuthState({
              isAuthenticated: false,
              user: null,
              token: null,
              loading: false
            });
          }
        } else {
          setAuthState(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setAuthState({
          isAuthenticated: true,
          user: response.data.user,
          token: response.data.token,
          loading: false
        });
        return { success: true };
      }
    } catch (error) {
      if (error.response) {
        return { 
          success: false, 
          error: error.response.data.message || 'Login failed. Please try again.' 
        };
      } else if (error.request) {
        return { 
          success: false, 
          error: 'Network error. Please check your connection and try again.' 
        };
      } else {
        return { 
          success: false, 
          error: 'An error occurred. Please try again.' 
        };
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false
    });
  };

  const value = {
    ...authState,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 