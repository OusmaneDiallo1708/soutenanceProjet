// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   HeartIcon,
//   StarIcon,
//   ShoppingBagIcon,
//   UserIcon,
//   SearchIcon,
//   MenuIcon,
//   XIcon,
// } from "lucide-react";

// interface Produit {
//   _id: string;
//   categorieNom: string;
//   prixVente: number;
//   image: string;
//   utilisateur?: {
//     _id: string;
//     nomComplet: string;
//     email: string;
//   };
// }

// interface Categorie {
//   _id: string;
//   nom: string;
// }

// interface ProduitGroupe {
//   utilisateur: {
//     _id: string;
//     nomComplet: string;
//     email: string;
//   };
//   produits: Produit[];
// }

// const Carousel: React.FC = () => {
//   const [produitsGroupes, setProduitsGroupes] = useState<ProduitGroupe[]>([]);
//   const [categories, setCategories] = useState<Categorie[]>([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     axios
//       .get("http://localhost:4999/api/allroute/getAllProduits")
//       .then((res) => {
//         const data = Array.isArray(res.data.produits) ? res.data.produits : [];
//         const groupedProducts: ProduitGroupe[] = [];

//         data.forEach((produit: Produit) => {
//           if (produit.utilisateur) {
//             const existingUserIndex = groupedProducts.findIndex(
//               (group) => group.utilisateur._id === produit.utilisateur!._id
//             );

//             if (existingUserIndex !== -1) {
//               groupedProducts[existingUserIndex].produits.push(produit);
//             } else {
//               groupedProducts.push({
//                 utilisateur: produit.utilisateur,
//                 produits: [produit],
//               });
//             }
//           }
//         });

//         setProduitsGroupes(groupedProducts);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Erreur chargement produits:", err);
//         setLoading(false);
//       });

//     axios
//       .get("http://localhost:4999/api/allroute/getAllCategorie")
//       .then((res) => {
//         const data = Array.isArray(res.data.categorie)
//           ? res.data.categorie
//           : [];
//         setCategories(data);
//       })
//       .catch((err) => console.error("Erreur chargement catégories:", err));
//   }, []);

//   const nextSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === categories.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === 0 ? categories.length - 1 : prev - 1
//     );
//   };

//   const formatPrice = (price: number) =>
//     new Intl.NumberFormat("fr-FR", {
//       style: "currency",
//       currency: "EUR",
//     }).format(price);

//   // ✅ Parenthèse fermante ajoutée ici
//   const filteredProduitsGroupes = produitsGroupes.filter(
//     (groupe) =>
//       groupe.utilisateur.nomComplet
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       groupe.produits.some((prod) =>
//         prod.categorieNom.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//   );

//   return (
//     <section className="bg-gray-50 py-12 px-4 md:px-6">
//       <h1 className="text-3xl font-bold text-center mb-10 uppercase text-gray-800 font-sans">
//         Nos Vendeurs et Produits
//       </h1>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//         </div>
//       ) : filteredProduitsGroupes.length > 0 ? (
//         filteredProduitsGroupes.map((groupe) => (
//           <div key={groupe.utilisateur._id} className="mb-16">
//             {/* En-tête vendeur */}
//             <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6 md:mb-8 flex flex-col md:flex-row items-center">
//               <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-0 md:mr-4 mb-3 md:mb-0">
//                 <UserIcon className="h-6 w-6 md:h-8 md:w-8 text-indigo-600" />
//               </div>
//               <div className="text-center md:text-left mb-4 md:mb-0">
//                 <h2 className="text-xl md:text-2xl font-bold text-gray-800">
//                   {groupe.utilisateur.nomComplet}
//                 </h2>
//                 <p className="text-gray-600">
//                   {groupe.produits.length} produits disponibles
//                 </p>
//               </div>
//               <button className="ml-auto bg-indigo-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-indigo-700 transition flex items-center transform hover:scale-105 mt-4 md:mt-0">
//                 <ShoppingBagIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
//                 Voir la boutique
//               </button>
//             </div>

//             {/* Produits */}
//             <div className="relative">
//               <div className="overflow-x-auto pb-4 hide-scrollbar">
//                 <div className="flex space-x-4 md:space-x-6">
//                   {groupe.produits.map((prod) => (
//                     <div
//                       key={prod._id}
//                       className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group min-w-[250px] md:min-w-[280px] flex-shrink-0"
//                     >
//                       <div className="relative">
//                         <img
//                           src={`http://localhost:4999${prod.image}`}
//                           alt={prod.categorieNom}
//                           className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition duration-300"
//                           onError={(e) => {
//                             e.currentTarget.src =
//                               "https://via.placeholder.com/300x200?text=Image+Non+Disponible";
//                           }}
//                         />
//                         <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
//                           <HeartIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-600 hover:text-red-500" />
//                         </button>
//                         <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
//                           POPULAIRE
//                         </div>
//                       </div>
//                       <div className="p-4">
//                         <h2 className="text-base md:text-lg font-semibold text-gray-800 truncate">
//                           {prod.categorieNom}
//                         </h2>
//                         <div className="flex items-center mt-1">
//                           <div className="flex">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <StarIcon
//                                 key={star}
//                                 className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current"
//                               />
//                             ))}
//                           </div>
//                           <span className="text-xs text-gray-500 ml-1">
//                             (128)
//                           </span>
//                         </div>
//                         <div className="mt-2 flex justify-between items-center">
//                           <p className="text-base md:text-lg font-bold text-indigo-600">
//                             {formatPrice(prod.prixVente)}
//                           </p>
//                           <span className="text-xs text-gray-500">
//                             + livraison
//                           </span>
//                         </div>
//                         <button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition transform hover:-translate-y-0.5 text-sm md:text-base">
//                           Voir le produit
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="col-span-full text-center py-12">
//           <p className="text-gray-500 text-xl">
//             Aucun produit ou vendeur ne correspond à votre recherche.
//           </p>
//           <button
//             className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition transform hover:scale-105"
//             onClick={() => setSearchTerm("")}
//           >
//             Réinitialiser la recherche
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Carousel;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  HeartIcon,
  StarIcon,
  ShoppingBagIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShieldIcon,
  TruckIcon,
  ArrowRightIcon,
  SparklesIcon,
  CrownIcon,
  GemIcon
} from "lucide-react";

interface Produit {
  _id: string;
  categorieNom: string;
  prixVente: number;
  image: string;
  utilisateur?: {
    _id: string;
    nomComplet: string;
    email: string;
  };
}

interface ProduitGroupe {
  utilisateur: {
    _id: string;
    nomComplet: string;
    email: string;
  };
  produits: Produit[];
}

const Carousel: React.FC = () => {
  const [produitsGroupes, setProduitsGroupes] = useState<ProduitGroupe[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeVendor, setActiveVendor] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:4999/api/allroute/getAllProduits")
      .then((res) => {
        const data = Array.isArray(res.data.produits) ? res.data.produits : [];
        const groupedProducts: ProduitGroupe[] = [];

        data.forEach((produit: Produit) => {
          if (produit.utilisateur) {
            const existingUserIndex = groupedProducts.findIndex(
              (group) => group.utilisateur._id === produit.utilisateur!._id
            );

            if (existingUserIndex !== -1) {
              groupedProducts[existingUserIndex].produits.push(produit);
            } else {
              groupedProducts.push({
                utilisateur: produit.utilisateur,
                produits: [produit],
              });
            }
          }
        });

        setProduitsGroupes(groupedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement produits:", err);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f3f4f6;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23e5e7eb;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='200' fill='url(%23grad)'/%3E%3Cpath d='M150 80 L180 120 L120 120 Z' fill='%239ca3af'/%3E%3Ctext x='150' y='160' text-anchor='middle' font-family='Arial' font-size='14' fill='%236b7280'%3EImage Indisponible%3C/text%3E%3C/svg%3E";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* En-tête premium */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-lg opacity-30"></div>
            <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-2xl font-bold py-4 px-8 rounded-full inline-flex items-center">
              <SparklesIcon className="h-6 w-6 mr-2" />
              <span>Découvrez nos vendeurs d'exception</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Une Expérience <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Premium</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Découvrez des produits rares et authentiques sélectionnés par nos vendeurs experts
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <div className="text-2xl font-bold text-indigo-600">{produitsGroupes.length}+</div>
            <div className="text-sm text-gray-600">Vendeurs experts</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-gray-600">Produits vérifiés</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <div className="text-2xl font-bold text-pink-600">24h</div>
            <div className="text-sm text-gray-600">Support premium</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <div className="text-2xl font-bold text-green-600">⭐ 4.9/5</div>
            <div className="text-sm text-gray-600">Satisfaction client</div>
          </div>
        </div>
      </div>

      {/* Vendeurs et produits */}
      <div className="max-w-7xl mx-auto space-y-20">
        {produitsGroupes.map((groupe, index) => (
          <div key={groupe.utilisateur._id} className="relative group">
            {/* En-tête vendeur avec effet de profondeur */}
            <div className="relative z-10 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border border-gray-100 transform transition-all duration-500 hover:shadow-2xl">
              <div className="flex flex-col md:flex-row items-center">
                <div className="relative mb-4 md:mb-0 md:mr-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-lg opacity-30"></div>
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <UserIcon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 shadow-lg">
                      <CrownIcon className="h-4 w-4 text-yellow-800" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {groupe.utilisateur.nomComplet}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Expert en {groupe.produits[0]?.categorieNom || "produits premium"}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      En ligne maintenant
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <StarIcon className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                      <span>4.9 (128 avis)</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ShieldIcon className="h-4 w-4 text-indigo-400 mr-1" />
                      <span>Vendeur certifié</span>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 md:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center group">
                  <ShoppingBagIcon className="h-5 w-5 mr-2" />
                  Visiter la boutique
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Produits avec défilement horizontal */}
            <div className="relative">
              <button
                onClick={scrollLeft}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
              </button>
              
              <button
                onClick={scrollRight}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-700" />
              </button>

              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide scroll-smooth pb-6"
              >
                <div className="flex space-x-6 px-2">
                  {groupe.produits.map((prod) => (
                    <div
                      key={prod._id}
                      className="flex-shrink-0 w-72 transform transition-all duration-500 hover:scale-105"
                    >
                      <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 group/card">
                        <div className="relative overflow-hidden">
                          <img
                            src={`http://localhost:4999${prod.image}`}
                            alt={prod.categorieNom}
                            className="w-full h-48 object-cover transform group-hover/card:scale-110 transition-transform duration-500"
                            onError={handleImageError}
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                          
                          <button
                            onClick={() => toggleFavorite(prod._id)}
                            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full backdrop-blur-sm hover:bg-white transition-all duration-300 transform hover:scale-110"
                          >
                            <HeartIcon
                              className={`h-5 w-5 ${
                                favorites.has(prod._id)
                                  ? "text-red-500 fill-current"
                                  : "text-gray-600"
                              }`}
                            />
                          </button>

                          <div className="absolute top-4 left-4">
                            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              POPULAIRE
                            </span>
                          </div>

                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                            <button className="w-full bg-white text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                              Voir détails
                            </button>
                          </div>
                        </div>

                        <div className="p-5">
                          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                            {prod.categorieNom}
                          </h3>
                          
                          <div className="flex items-center mb-3">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                  key={star}
                                  className="h-4 w-4 text-yellow-400 fill-current"
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">(128)</span>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-indigo-600">
                              {formatPrice(prod.prixVente)}
                            </span>
                            <div className="flex items-center text-sm text-gray-500">
                              <TruckIcon className="h-4 w-4 mr-1" />
                              Livraison gratuite
                            </div>
                          </div>

                          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 font-semibold flex items-center justify-center group/btn">
                            <ShoppingBagIcon className="h-5 w-5 mr-2" />
                            Ajouter au panier
                            <ArrowRightIcon className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section d'abonnement premium */}
      <div className="max-w-4xl mx-auto mt-20 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-center text-white shadow-2xl">
        <GemIcon className="h-12 w-12 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Accès Premium Whalleïn Stock</h2>
        <p className="text-indigo-100 mb-6 text-lg">
          Bénéficiez d'avantages exclusifs, de produits rares et d'un service prioritaire
        </p>
        <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
          Découvrir l'offre Premium
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
