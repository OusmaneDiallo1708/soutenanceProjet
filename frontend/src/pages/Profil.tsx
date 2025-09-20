// import Log from "../components/log/Log"
// import logo from "../../public/images/Logo_WS.png"
// function Profil() {
//   return (
//     <div className="bg-blue-600 min-h-screen flex justify-center items-center">
//       <div className=" flex" >
//         <div className="items-center justify-center bg-blue-950 relative z-0 flex flex-col">
//           <h1 className="text-3xl text-white font-bold text-center">Bienvenue Sur Whalleïn Stock</h1>
//           <img src={logo} className="w-2/3 " alt="Logo Whalleïn Stock" />
//           <p className="text-2xl text-white italic text-center">Vos Embution sont notre priorité</p>
//         </div>
//         <Log/>
//       </div>
//     </div>
//   )
// }

// export default Profil
// import Log from "../components/log/Log";
// import { UserProvider } from "../components/log/context/UserContext";

// function Profil() {
//   return (
//     <UserProvider>
//       <div className="bg-blue-600 min-h-screen flex justify-center items-center">
//           <div className="flex flex-col h-screen w-full items-center justify-center bg-blue-950 p-8 rounded-lg">
//             <h1 className="text-3xl text-white font-bold text-center mb-4">
//               Bienvenue Sur Whalleïn Stock
//             </h1>
//             <img src="/images/Logo_WS.png" className="w-2/3 mb-4" alt="Logo Whalleïn Stock" />
//             <p className="text-2xl text-white italic text-center">
//               Vos Embution sont notre priorité
//             </p>
//           </div>
//         {/* <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl"> */}
          
//           {/* Section Logo et Texte */}

//           {/* Section Connexion / Log */}
//           {/* <div className="flex-1 flex items-center justify-center m-4 w-full md:w-auto"> */}
//             <Log />
//           {/* </div> */}
//         {/* </div> */}
//       </div>
//     </UserProvider>
//   );
// }

// export default Profil;

// src/pages/Profil.tsx
// import Log from "../components/log/Log";
// import { UserProvider, useUser } from "../components/log/context/UserContext";
// import { useNavigate } from "react-router-dom";

// function Profil() {
//   const { logout } = useUser();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/profil"); // renvoi direct login après logout
//   };

//   return (
//     <UserProvider>
//       <div className="bg-blue-600 min-h-screen flex justify-center items-center">
//         <div className="flex flex-col h-screen w-full items-center justify-center bg-blue-950 p-8 rounded-lg">
//           <h1 className="text-3xl text-white font-bold text-center mb-4">
//             Bienvenue Sur Whalleïn Stock
//           </h1>
//           <img src="/images/Logo_WS.png" className="w-2/3 mb-4" alt="Logo Whalleïn Stock" />
//           <p className="text-2xl text-white italic text-center">
//             Vos Embution sont notre priorité
//           </p>

//           {/* Bouton logout */}
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-6 py-2 mt-6 rounded-lg hover:bg-red-700"
//           >
//             Déconnexion
//           </button>
//         </div>

//         {/* Login / Register */}
//         <Log />
//       </div>
//     </UserProvider>
//   );
// }

// export default Profil;

// import React from "react";
// import Log from "../components/log/Log";
// import { UserProvider, useUser } from "../components/log/context/UserContext";
// import { useNavigate } from "react-router-dom";

// const Profil = () => {
//   const { logout } = useUser();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/profil"); // redirection après logout
//   };

//   return (
//     <UserProvider>
//       <div className="bg-blue-600 min-h-screen flex justify-center items-center">
//         <div className="flex flex-col h-screen w-full items-center justify-center bg-blue-950 p-8 rounded-lg">
//           <h1 className="text-3xl text-white font-bold text-center mb-4">
//             Bienvenue Sur Whalleïn Stock
//           </h1>
//           <img
//             src="/images/Logo_WS.png"
//             className="w-2/3 mb-4"
//             alt="Logo Whalleïn Stock"
//           />
//           <p className="text-2xl text-white italic text-center">
//             Vos Embution sont notre priorité
//           </p>

//           {/* Bouton logout */}
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-6 py-2 mt-6 rounded-lg hover:bg-red-700"
//           >
//             Déconnexion
//           </button>
//         </div>

//         {/* Login / Register */}
//         <Log />
//       </div>
//     </UserProvider>
//   );
// };

// export default Profil;

import React from "react";
import Log from "../components/log/Log";
// import UserProvider, { useUser } from "../components/log/context/UserContext";

const Profil = () => {
  // const { logout } = useUser();

  // const handleLogout = () => {
  //   logout();
  // };

  // return (
  //   // <div className="bg-blue-600 min-h-screen flex justify-center items-center">
  //   //   <div className="flex flex-col h-screen w-full items-center justify-center bg-blue-950 p-8 rounded-lg">
  //   //     <h1 className="text-3xl text-white font-bold text-center mb-4">
  //   //       Bienvenue Sur Whalleïn Stock
  //   //     </h1>
  //   //     <img
  //   //       src="/images/Logo_WS.png"
  //   //       className="w-2/3 mb-4"
  //   //       alt="Logo Whalleïn Stock"
  //   //     />
  //   //     <p className="text-2xl text-white italic text-center">
  //   //       Vos Embution sont notre priorité
  //   //     </p>

  //   //     <button
  //   //       onClick={handleLogout}
  //   //       className="bg-red-500 text-white px-6 py-2 mt-6 rounded-lg hover:bg-red-700"
  //   //     >
  //   //       Déconnexion
  //   //     </button>
  //   //   </div>

  //   //   <Log />
  //   // </div>
  //   // <UserProvider>
  //     <div className="bg-blue-600 min-h-screen flex justify-center items-center">
  //       <div className="flex flex-col h-screen w-full items-center justify-center bg-blue-950 p-8 rounded-lg">
  //         <h1 className="text-3xl text-white font-bold text-center mb-4">
  //           Bienvenue Sur Whalleïn Stock
  //         </h1>
  //         <img
  //           src="/images/Logo_WS.png"
  //           className="w-2/3 mb-4"
  //           alt="Logo Whalleïn Stock"
  //         />
  //         <p className="text-2xl text-white italic text-center">
  //           Vos Embution sont notre priorité
  //         </p>

  //         {/* Bouton logout */}
  //         <button
  //           onClick={handleLogout}
  //           className="bg-red-500 text-white px-6 py-2 mt-6 rounded-lg hover:bg-red-700"
  //         >
  //           Déconnexion
  //         </button>
  //       </div>

  //       {/* Login / Register */}
  //       <Log />
  //     </div>
  // );
  return (
        // <UserProvider>
          <div className="bg-green-600 rounded-lg focus:ring-2 
          transition-all duration-200 min-h-screen flex justify-center items-center" style={{backgroundImage:`url("/upload/HKsKdYfLwcmzn14ev-vv4.png")`}}>
            <div className="flex bg-white">
              <div className="flex flex-col w-3/ h-full  items-center justify-center bg-blue-950 p-8 rounded-br-[18vh]">
                <h1 className="text-3xl text-white font-bold text-center mb-4">
                  Bienvenue Sur Whalleïn Stock
                </h1>
                <img src="/images/Logo_WS.png" className=" mb-4" alt="Logo Whalleïn Stock" />
                <p className="text-2xl text-white italic text-center">
                  Vos Ambition sont notre priorité
                </p>
              </div>
                <Log />
            {/* <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl"> */}
              
              {/* Section Logo et Texte */}
    
              {/* Section Connexion / Log */}
              {/* <div className="flex-1 flex items-center justify-center m-4 w-full md:w-auto"> */}
              {/* </div> */}
            {/* </div> */}
            </div>
          </div>
        // </UserProvider>
      );
};

export default Profil;

