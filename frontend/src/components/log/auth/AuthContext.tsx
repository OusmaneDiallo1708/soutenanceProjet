// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // ← Ajoute axios si pas déjà installé
// ou utilise fetch si tu préfères

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

  // Configuration de base de l'API
  const API_URL = 'http://localhost:4999/api'; // ← Adopte ton port backend

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // 🔥 VRAIE requête vers ton backend - plus de simulation !
        const response = await axios.get(`${API_URL}/utilisateur/profil`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUser(response.data); // Stocke le vrai utilisateur
      } catch (error) {
        console.error('Erreur de vérification auth:', error.response?.status, error.message);
        
        // Si 401 (token invalide/expiré), on supprime le token
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/utilisateur/connexion`, {
        email,
        password
      });
      
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Erreur login:', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de connexion' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,  // ← Maintenant login attend email + password
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};