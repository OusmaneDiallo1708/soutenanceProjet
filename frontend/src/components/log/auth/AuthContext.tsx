// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Ici, vous pouvez faire une requête pour vérifier le token
          // Pour l'instant, on simule un utilisateur
          setUser({ 
            _id: '1', 
            nomComplet: 'Utilisateur Connecté', 
            email: 'user@example.com' 
          });
        }
      } catch (error) {
        console.error('Erreur de vérification auth:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};