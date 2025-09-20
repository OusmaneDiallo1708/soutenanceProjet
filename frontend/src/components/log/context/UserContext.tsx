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
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  nom: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: async () => {},
  fetchUser: async () => {},
});

// hook pour utiliser le context
export const useUser = () => useContext(UserContext);

// provider principal (export default)
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:4999/api/utilisateur/profil", {
        withCredentials: true,
      });
      if (res.data.user) {
        setUser(res.data.user);
        localStorage.setItem("utilisateur", JSON.stringify(res.data.user));
      } else {
        setUser(null);
        localStorage.removeItem("utilisateur");
      }
    } catch (err) {
      setUser(null);
      localStorage.removeItem("utilisateur");
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:4999/api/utilisateur/logout", {
        withCredentials: true,
      });
      setUser(null);
      localStorage.removeItem("utilisateur");
      navigate("/profil", { replace: true }); // empêche le retour arrière
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("utilisateur");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;


