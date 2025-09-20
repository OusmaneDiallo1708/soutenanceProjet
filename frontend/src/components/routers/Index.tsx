// import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Home from "../../pages/Home"
// import Profil from "../../pages/Profil"
// function Index() {
//   return (
//     <BrowserRouter>
//         <Routes>
//             <Route path="/" element={<Home />}/>
//             <Route path="/profil" element={<Profil />}/>
//         </Routes>
//     </BrowserRouter>
//   )
// }

// export default Index

// App.tsx
// import { Route, Routes } from "react-router-dom";
// import Home from "../../pages/Home";
// import Profil from "../../pages/Profil";
// function ProtectedRoute({ children }) {
//   // logique de route protégée
//   return children;
// }
// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/profil" element={<Profil />} />
//       {/* autres routes */}
//     </Routes>
//   );
// }
// src/components/routers/Index.tsx
// src/components/routers/Index.tsx
// src/components/routers/Index.tsx
// import React from "react";
// import { Routes, Route } from "react-router-dom"; // ✅ garder uniquement celui-ci
// import Home from "../../pages/Home";
// import Profil from "../../pages/Profil";
// import SignInForm from "../../components/log/SignInForm";
// import SignUpForm from "../../components/log/SignUpForm";
// import ProtectedRoute from "./ProtectedRoute";

// const Index = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
//       <Route path="/signin" element={<SignInForm />} />
//       <Route path="/signup" element={<SignUpForm />} />
//     </Routes>
//   );
// };

// export default Index;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import SignInForm from "../../components/log/SignInForm";
import SignUpForm from "../../components/log/SignUpForm";
import ProtectedRoute from "./ProtectedRoute";
import Acceuil from "../../home/pages/Acceuil";
import Apropos from "../../home/pages/Apropos";
import Header from "../../home/pages/Header";

const Index = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/acceuil" element={<Acceuil />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/apropos" element={<Apropos />} />
      <Route path="/header" element={<Header />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Index;

