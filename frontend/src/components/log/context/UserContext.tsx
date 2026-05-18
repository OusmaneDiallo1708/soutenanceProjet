// import { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// interface User {
//   name: string;
//   email: string;
// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   logout: () => Promise<void>;
//   fetchUser: () => Promise<void>;
// }

// const UserContext = createContext<UserContextType>({
//   user: null,
//   setUser: () => {},
//   logout: async () => {},
//   fetchUser: async () => {},
// });

// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get("http://localhost:4999/api/utilisateur/profil", { withCredentials: true });
//       setUser(res.data.user);
//     } catch (err) {
//       setUser(null);
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.get("http://localhost:4999/api/utilisateur/logout", { withCredentials: true });
//       setUser(null);
//       navigate("/profil");
//     } catch (err) {
//       console.error("Erreur lors de la déconnexion:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, logout, fetchUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
// context/UserContext.tsx
// import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// interface User {
//   nom: string;
//   email: string;
// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   logout: () => void;
// }

// const UserContext = createContext<UserContextType>({
//   user: null,
//   setUser: () => {},
//   logout: () => {},
// });

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(() => {
//     const stored = localStorage.getItem("utilisateur");
//     return stored ? JSON.parse(stored) : null;
//   });

//   const logout = () => {
//     localStorage.removeItem("utilisateur");
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);


// src/components/log/context/UserContext.tsx
// src/components/log/context/UserContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  _id?: string;
  nomComplet: string;  // ← Changé de "nom" à "nomComplet" pour correspondre au backend
  email: string;
  photo?: string;
  role?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  isLoading: boolean;  // ← Ajouté pour gérer le chargement
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: async () => {},
  fetchUser: async () => {},
  isLoading: true,
});

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // ← État de chargement
  const navigate = useNavigate();

  // ⭐ Récupérer l'utilisateur depuis le backend avec le token
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log("⚠️ Aucun token trouvé");
        setUser(null);
        setIsLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:4999/api/utilisateur/profil", {
        headers: {
          Authorization: `Bearer ${token}`  // ← Envoie le token dans le header
        },
        withCredentials: true,
      });
      
      // ⭐ Adaptation de la réponse du backend
      if (res.data) {
        const userData: User = {
          _id: res.data._id,
          nomComplet: res.data.nomComplet || res.data.nom,  // Supporte les deux formats
          email: res.data.email,
          photo: res.data.photo,
          role: res.data.role
        };
        setUser(userData);
        localStorage.setItem("utilisateur", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("utilisateur");
      }
    } catch (err: any) {
      console.error("❌ Erreur fetchUser:", err.response?.status, err.message);
      
      // Si erreur 401 (non autorisé), token invalide
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem("utilisateur");
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ⭐ Déconnexion
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.get("http://localhost:4999/api/utilisateur/logout", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    } finally {
      // Toujours nettoyer le localStorage même si l'API échoue
      localStorage.removeItem('token');
      localStorage.removeItem("utilisateur");
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  // ⭐ Chargement initial
  useEffect(() => {
    const storedUser = localStorage.getItem("utilisateur");
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      // Si les données sont en cache, on les utilise immédiatement
      setUser(JSON.parse(storedUser));
      setIsLoading(false);
      // On vérifie quand même avec le backend en arrière-plan
      fetchUser();
    } else if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, fetchUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;