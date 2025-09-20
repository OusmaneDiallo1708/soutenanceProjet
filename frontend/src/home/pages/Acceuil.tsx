
// import React, { useState } from "react";
// import { SearchIcon, MenuIcon, XIcon } from "lucide-react";
// import Carousel from "./Carousel";
// import { useNavigate } from "react-router-dom";

// // interface Categorie {
// //   _id: string;
// //   nom: string;
// // }

// const Acceuil: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   // const [mode,setMode]=useState
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleConnexionClick = () => {
//     navigate("/profil");
//   };
//   const handleSinscrireClick = ()=>{
//     navigate("/profil")
//   }
//   const handleAcceuilClick= () =>{
//       navigate("/acceuil")
//   }
//   const handleAproposClick= () =>{
//       navigate("/apropos")
//   }

//   return (
//     <>
//       {/* ---- En-tête avec image de fond ---- */}
//       <div 
//         className="min-h-[70vh] : bg-cover bg-center relative flex flex-col" 
//         style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/upload/HKsKdYfLwcmzn14ev-vv4.png')` }}
//       >
//         {/* Barre de navigation */}
//         <nav className="bg-transparent border-b-[1px] border-white bg-opacity-95 flex shadow-2xl justify-between items-center sticky top-0 z-50">
//           <div>
//             <img 
//               className="w-[10vh] h-[10vh] mx-2 rounded-full transition-transform duration-300 hover:scale-105" 
//               src="/images/Logo_WS.png" 
//               alt="Logo" 
//             />
//           </div>
          
//           {/* Menu mobile */}
//           <div className="md:hidden">
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
//               {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
//             </button>
//           </div>
          
//           {/* Menu desktop */}
//           <div className="hidden md:flex justify-center items-center">
//             <div className="my-5">
//               <button onClick={handleAcceuilClick} className="text-xl text-white font-sans px-3 hover:text-orange-500 transition-colors duration-300 font-bold">Accueil</button>
//               <button onClick={handleAproposClick} className="text-xl text-white font-sans px-3 hover:text-orange-500 transition-colors duration-300 font-bold">À propos</button>
//               {/* <button className="text-xl text-white font-sans px-3 hover:text-orange-500 transition-colors duration-300 font-bold">Contact</button> */}
//             </div>
//             <div className="flex gap-4 mx-2">
//               <button onClick={handleSinscrireClick} className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-[17px] rounded-full p-2 px-8 font-semibold hover:from-blue-800 hover:to-blue-950 transition-all duration-300 shadow-md hover:shadow-lg">
//                 S'inscrire
//               </button>
//               <button onClick={handleConnexionClick} className="bg-gradient-to-r from-green-600 to-green-800 text-white text-[17px] rounded-full p-2 px-8 font-semibold hover:from-green-700 hover:to-green-900 transition-all duration-300 shadow-md hover:shadow-lg">
//                 Connexion
//               </button>
//             </div>
//           </div>
//         </nav>

//         {/* Menu mobile ouvert */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white bg-opacity-95 absolute top-full left-0 right-0 z-40 shadow-lg">
//             <div className="flex flex-col p-4">
//               <button className="py-3 text-lg  font-medium hover:text-orange-500 transition-colors">Accueil</button>
//               <button className="py-3 text-lg  font-medium hover:text-orange-500 transition-colors">À propos</button>
//               <button className="py-3 text-lg  font-medium hover:text-orange-500 transition-colors">Contact</button>
//               <div className="flex flex-col gap-3 mt-4">
//                 <button className="bg-blue-800 text-white rounded-full p-3 font-semibold">S'inscrire</button>
//                 <button onClick={handleConnexionClick} className="bg-green-700 text-white rounded-full p-3 font-semibold">Connexion</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Bannière principale avec barre de recherche */}
//         <div className="flex-1 flex flex-col items-center justify-center text-white text-center px-4">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md font-sans">Bienvenue sur Whalleïn Stock</h1>
//           <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md font-light">
//             Découvrez des produits exceptionnels de vendeurs passionnés
//           </p>
          
//           <div className="relative w-full max-w-2xl">
//             <input
//               type="text"
//               placeholder="Rechercher un produit ou un vendeur..."
//               className="w-full py-4 px-6 rounded-full text-gray-800 text-base md:text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 md:h-6 md:w-6" />
//           </div>
//         </div>
//       </div>
//       {/* ---- Liste des produits groupés par utilisateur ---- */}
//       <Carousel />
//       {/* ---- Bannière promotionnelle ---- */}
//       <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 md:py-16 px-4 md:px-6 text-white text-center">
//         <h2 className="text-2xl md:text-3xl font-bold mb-4 font-sans">Vendez vos produits sur notre marketplace</h2>
//         <p className="max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base font-light">
//           Rejoignez des milliers de vendeurs et augmentez votre visibilité. Créez votre boutique en ligne en quelques minutes.
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
//           <button className="bg-white text-indigo-600 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-md">
//             Créer une boutique
//           </button>
//           <button className="border-2 border-white text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition transform hover:scale-105">
//             En savoir plus
//           </button>
//         </div>
//       </section>

//       {/* Styles CSS supplémentaires */}
//       <style jsx>{`
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Acceuil;


// import React, { useState } from "react";
// import { SearchIcon, MenuIcon, XIcon } from "lucide-react";
// import Carousel from "./Carousel";
// import { useNavigate } from "react-router-dom";

// // interface Categorie {
// //   _id: string;
// //   nom: string;
// // }

// const Acceuil: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   // const [mode,setMode]=useState
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleConnexionClick = () => {
//     navigate("/profil");
//   };
//   const handleSinscrireClick = () => {
//     navigate("/profil")
//   }
//   const handleAcceuilClick = () => {
//     navigate("/acceuil")
//   }
//   const handleAproposClick = () => {
//     navigate("/apropos")
//   }

//   // Gestionnaires onChange pour les boutons
//   const handleAcceuilChange = (e: React.ChangeEvent<HTMLButtonElement>) => {
//     console.log("Bouton Accueil changé:", e.target.value);
//     // Vous pouvez ajouter d'autres logiques ici si nécessaire
//   };

//   const handleAproposChange = (e: React.ChangeEvent<HTMLButtonElement>) => {
//     console.log("Bouton À propos changé:", e.target.value);
//     // Vous pouvez ajouter d'autres logiques ici si nécessaire

//   };

//   return (
//     <>
//       {/* ---- En-tête avec image de fond ---- */}
//       <div 
//         className="min-h-[70vh] : bg-cover bg-center relative flex flex-col" 
//         style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/upload/HKsKdYfLwcmzn14ev-vv4.png')` }}
//       >
//         {/* Barre de navigation */}
//         <nav className="bg-transparent border-b-[1px] border-white bg-opacity-95 flex shadow-2xl justify-between items-center sticky top-0 z-50">
//           <div>
//             <img 
//               className="w-[10vh] h-[10vh] mx-2 rounded-full transition-transform duration-300 hover:scale-105" 
//               src="/images/Logo_WS.png" 
//               alt="Logo" 
//             />
//           </div>
          
//           {/* Menu mobile */}
//           <div className="md:hidden">
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
//               {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
//             </button>
//           </div>
          
//           {/* Menu desktop */}
//           <div className="hidden md:flex justify-center items-center">
//             <div className="my-5">
//               <button 
//                 onClick={handleAcceuilClick} 
//                 onChange={handleAcceuilChange}
//                 className="text-xl text-white font-sans px-3 hover:text-orange-500 transition-colors duration-300 font-bold"
//               >
//                 Accueil
//               </button>
//               <button 
//                 onClick={handleAproposClick} 
//                 onChange={handleAproposChange}
//                 className="text-xl text-white font-sans px-3 hover:text-orange-500 transition-colors duration-300 font-bold"
//               >
//                 À propos
//               </button>
//               {/* <button className="text-xl text-white font-sans px-3 hover:text-orange-500 transition-colors duration-300 font-bold">Contact</button> */}
//             </div>
//             <div className="flex gap-4 mx-2">
//               <button onClick={handleSinscrireClick} className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-[17px] rounded-full p-2 px-8 font-semibold hover:from-blue-800 hover:to-blue-950 transition-all duration-300 shadow-md hover:shadow-lg">
//                 S'inscrire
//               </button>
//               <button onClick={handleConnexionClick} className="bg-gradient-to-r from-green-600 to-green-800 text-white text-[17px] rounded-full p-2 px-8 font-semibold hover:from-green-700 hover:to-green-900 transition-all duration-300 shadow-md hover:shadow-lg">
//                 Connexion
//               </button>
//             </div>
//           </div>
//         </nav>

//         {/* Menu mobile ouvert */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white bg-opacity-95 absolute top-full left-0 right-0 z-40 shadow-lg">
//             <div className="flex flex-col p-4">
//               <button 
//                 className="py-3 text-lg font-medium hover:text-orange-500 transition-colors"
//                 onChange={handleAcceuilChange}
//               >
//                 Accueil
//               </button>
//               <button 
//                 className="py-3 text-lg font-medium hover:text-orange-500 transition-colors"
//                 onChange={handleAproposChange}
//               >
//                 À propos
//               </button>
//               <button className="py-3 text-lg font-medium hover:text-orange-500 transition-colors">Contact</button>
//               <div className="flex flex-col gap-3 mt-4">
//                 <button className="bg-blue-800 text-white rounded-full p-3 font-semibold">S'inscrire</button>
//                 <button onClick={handleConnexionClick} className="bg-green-700 text-white rounded-full p-3 font-semibold">Connexion</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Bannière principale avec barre de recherche */}
//         <div className="flex-1 flex flex-col items-center justify-center text-white text-center px-4">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md font-sans">Bienvenue sur Whalleïn Stock</h1>
//           <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md font-light">
//             Découvrez des produits exceptionnels de vendeurs passionnés
//           </p>
          
//           <div className="relative w-full max-w-2xl">
//             <input
//               type="text"
//               placeholder="Rechercher un produit ou un vendeur..."
//               className="w-full py-4 px-6 rounded-full text-gray-800 text-base md:text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 md:h-6 md:w-6" />
//           </div>
//         </div>
//       </div>
//       {/* ---- Liste des produits groupés par utilisateur ---- */}
//       <Carousel />
//       {/* ---- Bannière promotionnelle ---- */}
//       <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 md:py-16 px-4 md:px-6 text-white text-center">
//         <h2 className="text-2xl md:text-3xl font-bold mb-4 font-sans">Vendez vos produits sur notre marketplace</h2>
//         <p className="max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base font-light">
//           Rejoignez des milliers de vendeurs et augmentez votre visibilité. Créez votre boutique en ligne en quelques minutes.
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
//           <button className="bg-white text-indigo-600 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-md">
//             Créer une boutique
//           </button>
//           <button className="border-2 border-white text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition transform hover:scale-105">
//             En savoir plus
//           </button>
//         </div>
//       </section>

//       {/* Styles CSS supplémentaires */}
//       <style jsx>{`
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Acceuil;


// import React, { useState } from "react";
// import { SearchIcon, MenuIcon, XIcon, StarIcon, HeartIcon, UserIcon, ShieldIcon, TruckIcon } from "lucide-react";

// const AcceuilApropos = () => {
//   const [currentSection, setCurrentSection] = useState("accueil");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // Données des produits
//   const products = [
//     {
//       id: 1,
//       name: "Smart Watch Pro",
//       description: "Montre connectée avec suivi santé avancé",
//       price: "129,99 €",
//       seller: "TechShop",
//       image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
//     },
//     {
//       id: 2,
//       name: "Écouteurs Sans Fil",
//       description: "Son haute qualité avec réduction de bruit",
//       price: "89,99 €",
//       seller: "AudioPlus",
//       image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
//     },
//     {
//       id: 3,
//       name: "Chaussures de Running",
//       description: "Confort et performance pour vos séances de sport",
//       price: "79,99 €",
//       seller: "SportWorld",
//       image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
//     },
//     {
//       id: 4,
//       name: "Soin Visuel Bio",
//       description: "Produit naturel pour une peau éclatante",
//       price: "49,99 €",
//       seller: "BioBeauty",
//       image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
//     }
//   ];

//   // Fonctions de navigation
//   const handleAccueilClick = () => {
//     setCurrentSection("accueil");
//     setMobileMenuOpen(false);
//   };

//   const handleAproposClick = () => {
//     setCurrentSection("apropos");
//     setMobileMenuOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white shadow-lg sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-3">
//               <img 
//                 src="https://cdn.pixabay.com/photo/2016/09/16/09/20/whale-1673200_1280.png" 
//                 alt="Logo" 
//                 className="w-12 h-12 rounded-full border-2 border-white transition-transform duration-300 hover:scale-105"
//               />
//               <h1 className="text-xl font-bold">Whalleïn Stock</h1>
//             </div>
            
//             {/* Menu desktop */}
//             <nav className="hidden md:flex items-center space-x-8">
//               <button 
//                 onClick={handleAccueilClick}
//                 className={`px-3 py-2 rounded-lg font-medium transition-colors duration-300 ${currentSection === "accueil" ? "bg-white/10 text-orange-300" : "hover:text-orange-200"}`}
//               >
//                 Accueil
//               </button>
//               <button 
//                 onClick={handleAproposClick}
//                 className={`px-3 py-2 rounded-lg font-medium transition-colors duration-300 ${currentSection === "apropos" ? "bg-white/10 text-orange-300" : "hover:text-orange-200"}`}
//               >
//                 À propos
//               </button>
//               <button className="px-3 py-2 rounded-lg font-medium hover:text-orange-200 transition-colors duration-300">
//                 Catégories
//               </button>
//               <button className="px-3 py-2 rounded-lg font-medium hover:text-orange-200 transition-colors duration-300">
//                 Vendeurs
//               </button>
//             </nav>
            
//             {/* Boutons d'authentification */}
//             <div className="hidden md:flex items-center space-x-4">
//               <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 shadow-md">
//                 S'inscrire
//               </button>
//               <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 shadow-md">
//                 Connexion
//               </button>
//             </div>
            
//             {/* Menu mobile */}
//             <button 
//               className="md:hidden p-2"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
//             </button>
//           </div>
          
//           {/* Menu mobile ouvert */}
//           {mobileMenuOpen && (
//             <div className="md:hidden mt-4 pb-4">
//               <div className="flex flex-col space-y-3">
//                 <button 
//                   onClick={handleAccueilClick}
//                   className={`px-3 py-2 rounded-lg font-medium text-left ${currentSection === "accueil" ? "bg-white/10 text-orange-300" : ""}`}
//                 >
//                   Accueil
//                 </button>
//                 <button 
//                   onClick={handleAproposClick}
//                   className={`px-3 py-2 rounded-lg font-medium text-left ${currentSection === "apropos" ? "bg-white/10 text-orange-300" : ""}`}
//                 >
//                   À propos
//                 </button>
//                 <button className="px-3 py-2 rounded-lg font-medium text-left">
//                   Catégories
//                 </button>
//                 <button className="px-3 py-2 rounded-lg font-medium text-left">
//                   Vendeurs
//                 </button>
//                 <div className="pt-4 flex flex-col space-y-3">
//                   <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300">
//                     S'inscrire
//                   </button>
//                   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300">
//                     Connexion
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Contenu principal */}
//       <main>
//         {/* Section Hero */}
//         <section 
//           className="min-h-[70vh] bg-cover bg-center relative flex flex-col justify-center items-center text-center text-white px-4"
//           style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')` }}
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">Bienvenue sur Whalleïn Stock</h2>
//           <p className="text-xl md:text-2xl mb-8 max-w-2xl">
//             Découvrez des produits exceptionnels de vendeurs passionnés
//           </p>
          
//           <div className="relative w-full max-w-2xl">
//             <input
//               type="text"
//               placeholder="Rechercher un produit ou un vendeur..."
//               className="w-full py-4 px-6 rounded-full text-gray-800 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//             />
//             <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>
//         </section>

//         {/* Section Accueil */}
//         {currentSection === "accueil" && (
//           <section className="py-16 bg-white">
//             <div className="container mx-auto px-4">
//               <div className="text-center mb-12">
//                 <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Produits Populaires</h2>
//                 <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//                   Découvrez les produits les plus recherchés sur notre marketplace
//                 </p>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {products.map(product => (
//                   <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
//                     <div className="h-48 overflow-hidden">
//                       <img 
//                         src={product.image} 
//                         alt={product.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
//                       <p className="text-gray-600 mb-4">{product.description}</p>
//                       <div className="flex justify-between items-center mb-4">
//                         <span className="text-2xl font-bold text-blue-600">{product.price}</span>
//                         <span className="text-sm text-gray-500">par {product.seller}</span>
//                       </div>
//                       <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
//                         Ajouter au panier
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
//                 <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
//                   <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
//                   <div className="text-gray-700">Produits</div>
//                 </div>
//                 <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
//                   <div className="text-4xl font-bold text-green-600 mb-2">5,000+</div>
//                   <div className="text-gray-700">Vendeurs</div>
//                 </div>
//                 <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
//                   <div className="text-4xl font-bold text-purple-600 mb-2">200,000+</div>
//                   <div className="text-gray-700">Clients satisfaits</div>
//                 </div>
//                 <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
//                   <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
//                   <div className="text-gray-700">Satisfaction client</div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Section À propos */}
//         {currentSection === "apropos" && (
//           <section className="py-16 bg-white">
//             <div className="container mx-auto px-4">
//               <div className="flex flex-col md:flex-row items-center gap-12">
//                 <div className="md:w-1/2">
//                   <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">À propos de Whalleïn Stock</h2>
//                   <p className="text-lg text-gray-600 mb-4">
//                     Fondée en 2020, Whalleïn Stock est une marketplace innovante qui connecte des vendeurs passionnés avec des clients recherchant des produits uniques et de qualité.
//                   </p>
//                   <p className="text-lg text-gray-600 mb-4">
//                     Notre mission est de créer un écosystème commercial équitable où les petites entreprises peuvent prospérer et où les consommateurs peuvent découvrir des produits exceptionnels.
//                   </p>
//                   <p className="text-lg text-gray-600 mb-8">
//                     Nous croyons en l'économie locale, en la durabilité et en la création de relations durables entre nos vendeurs et leurs clients.
//                   </p>
                  
//                   <div className="grid grid-cols-3 gap-6 text-center">
//                     <div className="p-4 bg-blue-50 rounded-lg">
//                       <div className="text-2xl font-bold text-blue-600 mb-1">3+</div>
//                       <div className="text-sm text-gray-700">Ans d'expérience</div>
//                     </div>
//                     <div className="p-4 bg-green-50 rounded-lg">
//                       <div className="text-2xl font-bold text-green-600 mb-1">15</div>
//                       <div className="text-sm text-gray-700">Pays desservis</div>
//                     </div>
//                     <div className="p-4 bg-purple-50 rounded-lg">
//                       <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
//                       <div className="text-sm text-gray-700">Éco-responsable</div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="md:w-1/2">
//                   <img 
//                     src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
//                     alt="Notre équipe" 
//                     className="rounded-xl shadow-lg"
//                   />
//                 </div>
//               </div>
              
//               <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 <div className="text-center p-6 bg-white rounded-xl shadow-md">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
//                     <UserIcon className="text-blue-600" size={32} />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">Client Focus</h3>
//                   <p className="text-gray-600">Nous mettons nos clients au centre de toutes nos décisions.</p>
//                 </div>
                
//                 <div className="text-center p-6 bg-white rounded-xl shadow-md">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
//                     <ShieldIcon className="text-green-600" size={32} />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">Sécurité</h3>
//                   <p className="text-gray-600">Transactions sécurisées et protection des données.</p>
//                 </div>
                
//                 <div className="text-center p-6 bg-white rounded-xl shadow-md">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
//                     <TruckIcon className="text-purple-600" size={32} />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
//                   <p className="text-gray-600">Expédition sous 24h pour la plupart des produits.</p>
//                 </div>
                
//                 <div className="text-center p-6 bg-white rounded-xl shadow-md">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
//                     <HeartIcon className="text-orange-600" size={32} />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">Engagement</h3>
//                   <p className="text-gray-600">Satisfaction garantie ou remboursé sous 30 jours.</p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Section CTA */}
//         <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à commencer?</h2>
//             <p className="text-xl mb-10 max-w-2xl mx-auto">
//               Rejoignez des milliers de vendeurs et commencez à vendre vos produits dès aujourd'hui
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <button className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md">
//                 Créer une boutique
//               </button>
//               <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors duration-300">
//                 En savoir plus
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Whalleïn Stock</h3>
//               <p className="text-gray-400 mb-4">
//                 La marketplace qui connecte des vendeurs passionnés avec des clients du monde entier.
//               </p>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
//                   <i className="fab fa-facebook-f"></i>
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
//                   <i className="fab fa-twitter"></i>
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
//                   <i className="fab fa-instagram"></i>
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
//                   <i className="fab fa-linkedin-in"></i>
//                 </a>
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Navigation</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Accueil</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">À propos</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Catégories</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Vendeurs</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Catégories</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Électronique</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Mode</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Maison</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Beauté</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Sport</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Contact</h3>
//               <ul className="space-y-2">
//                 <li className="text-gray-400">123 Rue du Commerce, Paris</li>
//                 <li className="text-gray-400">+33 1 23 45 67 89</li>
//                 <li className="text-gray-400">contact@whalleinstock.fr</li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2023 Whalleïn Stock. Tous droits réservés.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default AcceuilApropos;


// import React, { useState } from "react";
// import { SearchIcon, MenuIcon, XIcon } from "lucide-react";
// import Carousel from "./Carousel";
// import { useNavigate, useLocation } from "react-router-dom";

// const Acceuil: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleConnexionClick = () => {
//     navigate("/profil");
//   };
  
//   const handleSinscrireClick = () => {
//     navigate("/profil");
//   };
  
//   const handleAcceuilClick = () => {
//     navigate("/acceuil");
//   };
  
//   const handleAproposClick = () => {
//     navigate("/apropos");
//   };

//   // Déterminer si nous sommes sur la page d'accueil ou À propos
//   const isHomePage = location.pathname === "/acceuil";
//   const isAboutPage = location.pathname === "/apropos";

//   return (
//     <>
//       {/* ---- En-tête avec image de fond ---- */}
//       <div 
//         className="min-h-[70vh] bg-cover bg-center relative flex flex-col transition-all duration-500" 
//         style={{ 
//           backgroundImage: isAboutPage 
//             ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/about-bg.jpg')`
//             : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/upload/HKsKdYfLwcmzn14ev-vv4.png')` 
//         }}
//       >
//         {/* Barre de navigation */}
//         <nav className="bg-transparent border-b-[1px] border-white bg-opacity-95 flex shadow-2xl justify-between items-center sticky top-0 z-50 backdrop-blur-sm">
//           <div className="flex items-center">
//             <img 
//               className="w-[10vh] h-[10vh] mx-2 rounded-full transition-transform duration-300 hover:scale-105 cursor-pointer" 
//               src="/images/Logo_WS.png" 
//               alt="Logo" 
//               onClick={handleAcceuilClick}
//             />
//             <span className="text-white text-xl font-bold hidden md:block">Whalleïn Stock</span>
//           </div>
          
//           {/* Menu mobile */}
//           <div className="md:hidden">
//             <button 
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
//               className="p-2 text-white hover:text-orange-500 transition-colors"
//             >
//               {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
//             </button>
//           </div>
          
//           {/* Menu desktop */}
//           <div className="hidden md:flex justify-center items-center">
//             <div className="my-5 flex items-center">
//               <button 
//                 onClick={handleAcceuilClick} 
//                 className={`text-xl font-sans px-5 py-2 transition-all duration-300 font-bold rounded-full mx-1 ${
//                   isHomePage 
//                     ? 'text-white bg-orange-500 shadow-lg' 
//                     : 'text-white hover:text-orange-500 hover:bg-white hover:bg-opacity-10'
//                 }`}
//               >
//                 Accueil
//               </button>
//               <button 
//                 onClick={handleAproposClick} 
//                 className={`text-xl font-sans px-5 py-2 transition-all duration-300 font-bold rounded-full mx-1 ${
//                   isAboutPage 
//                     ? 'text-white bg-orange-500 shadow-lg' 
//                     : 'text-white hover:text-orange-500 hover:bg-white hover:bg-opacity-10'
//                 }`}
//               >
//                 À propos
//               </button>
//             </div>
//             <div className="flex gap-4 mx-2">
//               <button 
//                 onClick={handleSinscrireClick} 
//                 className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-[17px] rounded-full p-2 px-8 font-semibold hover:from-blue-800 hover:to-blue-950 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
//               >
//                 S'inscrire
//               </button>
//               <button 
//                 onClick={handleConnexionClick} 
//                 className="bg-gradient-to-r from-green-600 to-green-800 text-white text-[17px] rounded-full p-2 px-8 font-semibold hover:from-green-700 hover:to-green-900 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
//               >
//                 Connexion
//               </button>
//             </div>
//           </div>
//         </nav>

//         {/* Menu mobile ouvert */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-black bg-opacity-95 absolute top-full left-0 right-0 z-40 shadow-lg backdrop-blur-sm">
//             <div className="flex flex-col p-4">
//               <button 
//                 onClick={() => {
//                   handleAcceuilClick();
//                   setMobileMenuOpen(false);
//                 }} 
//                 className={`py-3 text-lg font-medium transition-colors rounded-lg px-4 my-1 ${
//                   isHomePage 
//                     ? 'bg-orange-500 text-white' 
//                     : 'text-white hover:bg-white hover:bg-opacity-10'
//                 }`}
//               >
//                 Accueil
//               </button>
//               <button 
//                 onClick={() => {
//                   handleAproposClick();
//                   setMobileMenuOpen(false);
//                 }} 
//                 className={`py-3 text-lg font-medium transition-colors rounded-lg px-4 my-1 ${
//                   isAboutPage 
//                     ? 'bg-orange-500 text-white' 
//                     : 'text-white hover:bg-white hover:bg-opacity-10'
//                 }`}
//               >
//                 À propos
//               </button>
//               <div className="flex flex-col gap-3 mt-4">
//                 <button 
//                   onClick={() => {
//                     handleSinscrireClick();
//                     setMobileMenuOpen(false);
//                   }} 
//                   className="bg-blue-800 text-white rounded-full p-3 font-semibold hover:bg-blue-900 transition-colors"
//                 >
//                   S'inscrire
//                 </button>
//                 <button 
//                   onClick={() => {
//                     handleConnexionClick();
//                     setMobileMenuOpen(false);
//                   }} 
//                   className="bg-green-700 text-white rounded-full p-3 font-semibold hover:bg-green-800 transition-colors"
//                 >
//                   Connexion
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Contenu principal */}
//         {isHomePage ? (
//           /* Bannière principale avec barre de recherche (Accueil) */
//           <div className="flex-1 flex flex-col items-center justify-center text-white text-center px-4 animate-fadeIn">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md font-sans animate-slideInDown">
//               Bienvenue sur Whalleïn Stock
//             </h1>
//             <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md font-light animate-slideInUp">
//               Découvrez des produits exceptionnels de vendeurs passionnés
//             </p>
            
//             <div className="relative w-full max-w-2xl animate-fadeIn">
//               <input
//                 type="text"
//                 placeholder="Rechercher un produit ou un vendeur..."
//                 className="w-full py-4 px-6 rounded-full text-gray-800 text-base md:text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 pr-12"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors">
//                 <SearchIcon className="text-white h-5 w-5 md:h-6 md:w-6" />
//               </button>
//             </div>
//           </div>
//         ) : (
//           /* Contenu À propos */
//           <div className="flex-1 flex flex-col items-center justify-center text-white text-center px-4 animate-fadeIn">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md font-sans animate-slideInDown">
//               À propos de Whalleïn Stock
//             </h1>
//             <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md font-light animate-slideInUp">
//               Découvrez notre histoire et notre engagement pour vous offrir la meilleure expérience d'achat en ligne
//             </p>
            
//             <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-orange-600 transition-colors shadow-lg animate-pulse">
//               En savoir plus
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Afficher le carrousel uniquement sur la page d'accueil */}
//       {isHomePage && <Carousel />}
      
//       {/* ---- Bannière promotionnelle ---- */}
//       <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 md:py-16 px-4 md:px-6 text-white text-center">
//         <h2 className="text-2xl md:text-3xl font-bold mb-4 font-sans">Vendez vos produits sur notre marketplace</h2>
//         <p className="max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base font-light">
//           Rejoignez des milliers de vendeurs et augmentez votre visibilité. Créez votre boutique en ligne en quelques minutes.
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
//           <button className="bg-white text-indigo-600 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-md">
//             Créer une boutique
//           </button>
//           <button className="border-2 border-white text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition transform hover:scale-105">
//             En savoir plus
//           </button>
//         </div>
//       </section>

//       {/* Styles CSS supplémentaires */}
//       <style jsx>{`
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
        
//         /* Animations */
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideInDown {
//           from {
//             transform: translateY(-20px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
        
//         @keyframes slideInUp {
//           from {
//             transform: translateY(20px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-out;
//         }
        
//         .animate-slideInDown {
//           animation: slideInDown 0.8s ease-out;
//         }
        
//         .animate-slideInUp {
//           animation: slideInUp 0.8s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Acceuil;





// import React, { useState } from "react";
// import { SearchIcon, MenuIcon, XIcon } from "lucide-react";
// import Carousel from "./Carousel";
// import { useNavigate } from "react-router-dom";

// const Acceuil: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleConnexionClick = () => {
//     navigate("/profil");
//   };

//   const handleSinscrireClick = () => {
//     navigate("/profil");
//   };

//   const handleAcceuilClick = () => {
//     navigate("/acceuil");
//   };

//   const handleAproposClick = () => {
//     navigate("/apropos");
//   };

//   // Gestionnaires onChange pour les boutons
//   const handleAcceuilChange = (e: React.ChangeEvent<HTMLButtonElement>) => {
//     console.log("Bouton Accueil changé:", e.target.value);
//     // Vous pouvez ajouter d'autres logiques ici si nécessaire
//   };

//   const handleAproposChange = (e: React.ChangeEvent<HTMLButtonElement>) => {
//     console.log("Bouton À propos changé:", e.target.value);
//     // Vous pouvez ajouter d'autres logiques ici si nécessaire
//   };

//   return (
//     <>
//       {/* ---- En-tête avec image de fond ---- */}
//       <div 
//         className="min-h-[70vh] bg-cover bg-center relative flex flex-col" 
//         style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/upload/HKsKdYfLwcmzn14ev-vv4.png')` }}
//       >
//         {/* Barre de navigation */}
//         <nav className="bg-transparent border-b-[1px] border-white bg-opacity-95 flex shadow-2xl justify-between items-center sticky top-0 z-50">
//           <div>
//             <img 
//               className="w-[10vh] h-[10vh] mx-2 rounded-full transition-transform duration-300 hover:scale-105" 
//               src="/images/Logo_WS.png" 
//               alt="Logo" 
//             />
//           </div>
          
//           {/* Menu mobile */}
//           <div className="md:hidden">
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
//               {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
//             </button>
//           </div>
          
//           {/* Menu desktop */}
//           <div className="hidden md:flex justify-center items-center">
//             <div className="my-5">
//               <button 
//                 onClick={handleAcceuilClick} 
//                 onChange={handleAcceuilChange}
//                 className="text-xl text-white font-sans px-3 hover:text-orange-500 transition-colors duration-300 font-bold"
//               >
//                 Accueil
//               </button>
//               <button 
//                 onClick={handleAproposClick} 
//                 onChange={handleAproposChange}
//                 className="text-xl text-white font-sans px-3 hover:text-orange-500 transition-colors duration-300 font-bold"
//               >
//                 À propos
//               </button>
//             </div>
//             <div className="flex gap-4 mx-2">
//               <button onClick={handleSinscrireClick} className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-[17px] rounded-full p-2 px-8 font-semibold hover:from-blue-800 hover:to-blue-950 transition-all duration-300 shadow-md hover:shadow-lg">
//                 S'inscrire
//               </button>
//               <button onClick={handleConnexionClick} className="bg-gradient-to-r from-green-600 to-green-800 text-white text-[17px] rounded-full p-2 px-8 font-semibold hover:from-green-700 hover:to-green-900 transition-all duration-300 shadow-md hover:shadow-lg">
//                 Connexion
//               </button>
//             </div>
//           </div>
//         </nav>

//         {/* Menu mobile ouvert */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white bg-opacity-95 absolute top-full left-0 right-0 z-40 shadow-lg">
//             <div className="flex flex-col p-4">
//               <button 
//                 className="py-3 text-lg font-medium hover:text-orange-500 transition-colors"
//                 onChange={handleAcceuilChange}
//               >
//                 Accueil
//               </button>
//               <button 
//                 className="py-3 text-lg font-medium hover:text-orange-500 transition-colors"
//                 onChange={handleAproposChange}
//               >
//                 À propos
//               </button>
//               <button className="py-3 text-lg font-medium hover:text-orange-500 transition-colors">
//                 Contact
//               </button>
//               <div className="flex flex-col gap-3 mt-4">
//                 <button className="bg-blue-800 text-white rounded-full p-3 font-semibold">S'inscrire</button>
//                 <button onClick={handleConnexionClick} className="bg-green-700 text-white rounded-full p-3 font-semibold">Connexion</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Bannière principale avec barre de recherche */}
//         <div className="flex-1 flex flex-col items-center justify-center text-white text-center px-4">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md font-sans">Bienvenue sur Whalleïn Stock</h1>
//           <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md font-light">
//             Découvrez des produits exceptionnels de vendeurs passionnés
//           </p>
          
//           <div className="relative w-full max-w-2xl">
//             <input
//               type="text"
//               placeholder="Rechercher un produit ou un vendeur..."
//               className="w-full py-4 px-6 rounded-full text-gray-800 text-base md:text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 md:h-6 md:w-6" />
//           </div>
//         </div>
//       </div>
      
//       {/* ---- Liste des produits groupés par utilisateur ---- */}
//       <Carousel />
      
//       {/* ---- Bannière promotionnelle ---- */}
//       <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 md:py-16 px-4 md:px-6 text-white text-center">
//         <h2 className="text-2xl md:text-3xl font-bold mb-4 font-sans">Vendez vos produits sur notre marketplace</h2>
//         <p className="max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base font-light">
//           Rejoignez des milliers de vendeurs et augmentez votre visibilité. Créez votre boutique en ligne en quelques minutes.
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
//           <button className="bg-white text-indigo-600 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-md">
//             Créer une boutique
//           </button>
//           <button className="border-2 border-white text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition transform hover:scale-105">
//             En savoir plus
//           </button>
//         </div>
//       </section>

//       {/* Styles CSS supplémentaires */}
//       <style jsx>{`
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Acceuil;

// Ane pas supprimer

// import React from "react";
// import { 
//   Users, 
//   Shield, 
//   TrendingUp, 
//   Heart, 
//   Award,
//   Globe,
//   Store,
//   CheckCircle,
//   ArrowRight
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Apropos: React.FC = () => {
//   const navigate = useNavigate();

//   const handleAcceuilClick = () => {
//     navigate("/acceuil");
//   };

//   const handleCommencerClick = () => {
//     navigate("/inscription");
//   };

//   // Statistiques de la plateforme
//   const stats = [
//     { number: "10K+", label: "Utilisateurs actifs", icon: <Users className="w-8 h-8" /> },
//     { number: "5K+", label: "Vendeurs certifiés", icon: <Store className="w-8 h-8" /> },
//     { number: "50K+", label: "Produits disponibles", icon: <Award className="w-8 h-8" /> },
//     { number: "98%", label: "Satisfaction clients", icon: <Heart className="w-8 h-8" /> }
//   ];

//   // Valeurs de l'entreprise
//   const values = [
//     {
//       icon: <Shield className="w-12 h-12 text-blue-600" />,
//       title: "Sécurité",
//       description: "Transactions sécurisées et protection des données pour une expérience d'achat en toute confiance."
//     },
//     {
//       icon: <TrendingUp className="w-12 h-12 text-green-600" />,
//       title: "Croissance",
//       description: "Plateforme conçue pour favoriser la croissance des vendeurs et l'épanouissement des acheteurs."
//     },
//     {
//       icon: <Globe className="w-12 h-12 text-purple-600" />,
//       title: "Accessibilité",
//       description: "Accessible à tous, partout. Une marketplace ouverte à toutes et à tous."
//     }
//   ];

//   // Fonctionnalités principales
//   const features = [
//     "Paiements sécurisés multiples",
//     "Interface intuitive et moderne",
//     "Gestion de boutique complète",
//     "Analyses de performances détaillées",
//     "Support client 24/7",
//     "Livraison suivie et assurée"
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Header avec navigation */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <img 
//                 className="w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-105" 
//                 src="/images/Logo_WS.png" 
//                 alt="Whalleïn Stock" 
//                 onClick={handleAcceuilClick}
//               />
//               <span className="ml-3 text-xl font-bold text-gray-900">Whalleïn Stock</span>
//             </div>
            
//             <button 
//               onClick={handleAcceuilClick}
//               className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors"
//             >
//               Retour à l'accueil
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">
//             À propos de <span className="text-orange-400">Whalleïn Stock</span>
//           </h1>
//           <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90">
//             Découvrez l'histoire derrière la marketplace qui révolutionne l'expérience d'achat en ligne
//           </p>
//           <button 
//             onClick={handleCommencerClick}
//             className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl flex items-center mx-auto"
//           >
//             Commencer maintenant
//             <ArrowRight className="ml-2 w-5 h-5" />
//           </button>
//         </div>
//       </section>

//       {/* Notre histoire */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//               Notre Histoire
//             </h2>
//             <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
//             <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
//               Fondée en 2023, Whalleïn Stock est née d'une vision simple mais puissante : créer une marketplace 
//               où chaque vendeur peut prospérer et chaque acheteur peut trouver exactement ce qu'il cherche. 
//               Notre plateforme combine innovation technologique et approche humaine pour offrir une expérience 
//               d'achat et de vente exceptionnelle.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <img 
//                 src="/images/about-team.jpg" 
//                 alt="Équipe Whalleïn Stock" 
//                 className="rounded-2xl shadow-2xl"
//               />
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre Mission</h3>
//               <p className="text-gray-600 mb-6 leading-relaxed">
//                 Rendre le commerce en ligne accessible à tous tout en maintenant les plus hauts standards 
//                 de qualité et de sécurité. Nous croyons en un internet où chacun peut entreprendre et 
//                 réussir, quel que soit son background ou son expérience.
//               </p>
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre Vision</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Devenir la marketplace de référence en Afrique et dans le monde, en connectant des millions 
//                 d'acheteurs et de vendeurs dans un écosystème prospère et sécurisé.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Statistiques */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
//                 <div className="text-blue-600 mb-4 flex justify-center">
//                   {stat.icon}
//                 </div>
//                 <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
//                 <div className="text-gray-600">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Nos valeurs */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//               Nos Valeurs
//             </h2>
//             <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {values.map((value, index) => (
//               <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
//                 <div className="mb-6 flex justify-center">
//                   {value.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
//                 <p className="text-gray-600 leading-relaxed">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Fonctionnalités */}
//       <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//               Pourquoi choisir Whalleïn Stock ?
//             </h2>
//             <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((feature, index) => (
//               <div key={index} className="flex items-start p-4 bg-white rounded-xl shadow-md">
//                 <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
//                 <span className="text-gray-700">{feature}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Final */}
//       <section className="py-20 bg-gray-900 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             Prêt à rejoindre l'aventure ?
//           </h2>
//           <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
//             Rejoignez des milliers de vendeurs et d'acheteurs qui font déjà confiance à Whalleïn Stock
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button 
//               onClick={handleCommencerClick}
//               className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-colors"
//             >
//               Créer mon compte
//             </button>
//             <button 
//               onClick={handleAcceuilClick}
//               className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
//             >
//               Découvrir la marketplace
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <img 
//               src="/images/Logo_WS.png" 
//               alt="Whalleïn Stock" 
//               className="w-16 h-16 mx-auto mb-4 rounded-full"
//             />
//             <p className="text-gray-400">
//               © 2024 Whalleïn Stock. Tous droits réservés.
//             </p>
//             <p className="text-gray-400 mt-2">
//               Construit avec ❤️ pour révolutionner le commerce en ligne
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Apropos;


// import React, { useState } from "react";
// import { SearchIcon, MenuIcon, XIcon } from "lucide-react";
// import Carousel from "./Carousel";
// import { useNavigate } from "react-router-dom";

// const Acceuil: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleConnexionClick = () => {
//     navigate("/profil");
//   };

//   const handleSinscrireClick = () => {
//     navigate("/profil");
//   };

//   const handleAcceuilClick = () => {
//     navigate("/acceuil");
//   };

//   const handleAproposClick = () => {
//     navigate("/apropos");
//   };

//   return (
//     <>
//       {/* ---- En-tête avec image de fond ---- */}
//       <div 
//         className="min-h-[70vh] bg-cover bg-center relative flex flex-col" 
//         style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/upload/HKsKdYfLwcmzn14ev-vv4.png')` }}
//       >
//         {/* Barre de navigation */}
//         <nav className="bg-transparent border-b-[1px] border-white bg-opacity-95 flex shadow-2xl justify-between items-center sticky top-0 z-50">
//           <div>
//             <img 
//               className="w-[10vh] h-[10vh] mx-2 rounded-full transition-transform duration-300 hover:scale-105" 
//               src="/images/Logo_WS.png" 
//               alt="Logo" 
//               onClick={handleAcceuilClick}
//               style={{cursor: "pointer"}}
//             />
//           </div>
          
//           {/* Menu mobile */}
//           <div className="md:hidden">
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
//               {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
//             </button>
//           </div>
          
//           {/* Menu desktop */}
//           <div className="hidden md:flex justify-center items-center">
//             <div className="my-5">
//               <button 
//                 onClick={handleAcceuilClick} 
//                 className="text-xl text-white font-sans px-3 hover:text-orange-500 transition-colors duration-300 font-bold"
//               >
//                 Accueil
//               </button>
//               <button 
//                 onClick={handleAproposClick} 
//                 className="text-xl text-white font-sans px-3 hover:text-orange-500 transition-colors duration-300 font-bold"
//               >
//                 À propos
//               </button>
//             </div>
//             <div className="flex gap-4 mx-2">
//               <button onClick={handleSinscrireClick} className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-[17px] rounded-full p-2 px-8 font-semibold hover:from-blue-800 hover:to-blue-950 transition-all duration-300 shadow-md hover:shadow-lg">
//                 S'inscrire
//               </button>
//               <button onClick={handleConnexionClick} className="bg-gradient-to-r from-green-600 to-green-800 text-white text-[17px] rounded-full p-2 px-8 font-semibold hover:from-green-700 hover:to-green-900 transition-all duration-300 shadow-md hover:shadow-lg">
//                 Connexion
//               </button>
//             </div>
//           </div>
//         </nav>

//         {/* Menu mobile ouvert */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white bg-opacity-95 absolute top-full left-0 right-0 z-40 shadow-lg">
//             <div className="flex flex-col p-4">
//               <button 
//                 onClick={handleAcceuilClick}
//                 className="py-3 text-lg font-medium hover:text-orange-500 transition-colors"
//               >
//                 Accueil
//               </button>
//               <button 
//                 onClick={handleAproposClick}
//                 className="py-3 text-lg font-medium hover:text-orange-500 transition-colors"
//               >
//                 À propos
//               </button>
//               <div className="flex flex-col gap-3 mt-4">
//                 <button onClick={handleSinscrireClick} className="bg-blue-800 text-white rounded-full p-3 font-semibold">S'inscrire</button>
//                 <button onClick={handleConnexionClick} className="bg-green-700 text-white rounded-full p-3 font-semibold">Connexion</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Bannière principale avec barre de recherche */}
//         <div className="flex-1 flex flex-col items-center justify-center text-white text-center px-4">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md font-sans">Bienvenue sur Whalleïn Stock</h1>
//           <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md font-light">
//             Découvrez des produits exceptionnels de vendeurs passionnés
//           </p>
          
//           <div className="relative w-full max-w-2xl">
//             <input
//               type="text"
//               placeholder="Rechercher un produit ou un vendeur..."
//               className="w-full py-4 px-6 rounded-full text-gray-800 text-base md:text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 md:h-6 md:w-6" />
//           </div>
//         </div>
//       </div>
      
//       {/* ---- Liste des produits groupés par utilisateur ---- */}
//       <Carousel />
      
//       {/* ---- Bannière promotionnelle ---- */}
//       <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 md:py-16 px-4 md:px-6 text-white text-center">
//         <h2 className="text-2xl md:text-3xl font-bold mb-4 font-sans">Vendez vos produits sur notre marketplace</h2>
//         <p className="max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base font-light">
//           Rejoignez des milliers de vendeurs et augmentez votre visibilité. Créez votre boutique en ligne en quelques minutes.
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
//           <button className="bg-white text-indigo-600 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-md">
//             Créer une boutique
//           </button>
//           <button className="border-2 border-white text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition transform hover:scale-105">
//             En savoir plus
//           </button>
//         </div>
//       </section>

//       {/* Styles CSS supplémentaires */}
//       <style jsx>{`
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Acceuil;

import Header from "./Header";
import Footer from "./Footer";
import Carousel from "./Carousel";

const Acceuil = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>
      
      {/* Contenu principal */}
      <div className="pt-16">
        {/* Bannière hero */}
        <div 
          className="min-h-screen bg-cover bg-center relative flex flex-col items-center justify-center text-white text-center px-4 py-20"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('/upload/HKsKdYfLwcmzn14ev-vv4.png')`,
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Animation d'entrée */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Bienvenue sur <span className="text-orange-400 animate-pulse-slow">Whalleïn Stock</span>
            </h1>
            
            <div className="w-32 h-1 bg-orange-500 mx-auto mb-8"></div>
            
            <p className="text-xl md:text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              Votre marketplace <span className="text-orange-300 font-medium">premium</span> pour découvrir des produits 
              exceptionnels et soutenir des vendeurs passionnés
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center">
                Explorer la boutique
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
              
              <button className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-10 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105">
                Devenir vendeur
              </button>
            </div>
          </div>
          
          {/* Indicateur de défilement */}
          <div className="absolute bottom-10 animate-bounce">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
        
        {/* Affichage des produits selon la section active */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 gap-8">
            <Carousel/>
          </div>
        </div>
        
        <Footer/>
      </div>
      
      {/* Styles CSS intégrés */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulseSlow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1.5s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 3s infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Acceuil;


