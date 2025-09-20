// src/components/routers/ProtectedRoute.tsx
// import { Navigate } from "react-router-dom";
// import { useUser } from "../log/context/UserContext";

// export default function ProtectedRoute({ children }: { children: JSX.Element }) {
//   const { user } = useUser();

//   if (!user) {
//     return <Navigate to="/profil" replace />; // renvoie toujours à profil (login)
//   }

//   return children;
// }

// import React, { useContext, useEffect } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { UserContext } from "../../components/log/context/UserContext";

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useContext(UserContext);
//   const location = useLocation();

//   useEffect(() => {
//     if (!user) {
//       window.history.pushState(null, "", window.location.href);
//       window.onpopstate = () => {
//         window.history.go(1);
//       };
//     }
//   }, [user]);

//   if (!user) {
//     return <Navigate to="/signin" replace state={{ from: location }} />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

// src/components/routers/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../log/context/UserContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUser();
  const location = useLocation();

  // Si pas d'utilisateur connecté → redirection vers /profil (login)
  if (!user) {
    // return <Navigate to="/profil" state={{ from: location }} replace />;
    return <Navigate to="/acceuil" state={{ from: location }} replace />;
  }

  // Sinon, on affiche le composant protégé
  return children;
};

export default ProtectedRoute;
