// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddVenteForm = () => {
//   const [formData, setFormData] = useState({
//     produitId: "",
//     produitDescription: "",
//     quantite: "",
//     prix_unitaire: "",
//     date_vente: "",
//     utilisateurId: "", // rempli automatiquement
//   });

//   const [produits, setProduits] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Charger les produits et récupérer l'utilisateur connecté
//   useEffect(() => {
//     const fetchProduits = async () => {
//       try {
//         const res = await axios.get("http://localhost:4999/api/allroute/getAllProduit");
//         setProduits(res.data.produit || []);
//       } catch (err) {
//         console.error("Erreur récupération des produits :", err);
//         setMessage("⚠️ Impossible de charger les produits.");
//       }
//     };

//     fetchProduits();

//     const user = JSON.parse(localStorage.getItem("user") || "{}");
//     if (user && user._id) {
//       setFormData((prev) => ({ ...prev, utilisateurId: user._id }));
//     } else {
//       setMessage("❌ Veuillez vous connecter avant d’ajouter une vente.");
//     }
//   }, []);

//   const handleProduitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const produitId = e.target.value;
//     const produit = produits.find((p) => p._id === produitId);

//     setFormData((prev) => ({
//       ...prev,
//       produitId,
//       produitDescription: produit ? produit.categorieDescription : "",
//       prix_unitaire: produit ? produit.prixVente : "",
//     }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!formData.produitId) {
//       setMessage("❌ Veuillez choisir un produit.");
//       setIsSubmitting(false);
//       return;
//     }

//     if (!formData.utilisateurId) {
//       setMessage("❌ Utilisateur non trouvé (connexion requise).");
//       setIsSubmitting(false);
//       return;
//     }

//     const produitSelect = produits.find((p) => p._id === formData.produitId);
//     if (!produitSelect) {
//       setMessage("❌ Produit introuvable.");
//       setIsSubmitting(false);
//       return;
//     }

//     if (parseInt(formData.quantite) > produitSelect.stock) {
//       setMessage(`❌ Quantité demandée (${formData.quantite}) supérieure au stock disponible (${produitSelect.stock}) !`);
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:4999/api/allroute/addVente", {
//         formDataToSend,
//         {
//           withCredentials: true,
//           headers: { 
//             "Content-Type": "multipart/form-data" 
//           },
//       }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         setMessage("✅ Vente ajoutée avec succès !");
//         setFormData({
//           produitId: "",
//           produitDescription: "",
//           quantite: "",
//           prix_unitaire: "",
//           date_vente: "",
//           utilisateurId: formData.utilisateurId,
//         });
//       } else {
//         setMessage(`❌ ${result.message || "Erreur lors de l'ajout de la vente."}`);
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("⚠️ Problème de connexion au serveur.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl mt-10 border border-blue-100">
//       <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center tracking-tight">
//         Ajouter une nouvelle Vente
//       </h2>

//       {message && (
//         <div
//           className={`mb-6 p-4 rounded-xl text-center font-medium ${
//             message.startsWith("✅")
//               ? "bg-green-100 text-green-700 border border-green-200"
//               : "bg-red-100 text-red-700 border border-red-200"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Nom du Produit</label>
//           <select
//             name="produitId"
//             value={formData.produitId}
//             onChange={handleProduitChange}
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             required
//           >
//             <option value="">-- Choisir un produit --</option>
//             {produits.map((prod) => (
//               <option key={prod._id} value={prod._id}>
//                 {prod.categorieNom}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Description</label>
//           <input
//             type="text"
//             name="produitDescription"
//             value={formData.produitDescription}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             readOnly
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Quantité</label>
//           <input
//             type="number"
//             name="quantite"
//             value={formData.quantite}
//             onChange={handleChange}
//             min="1"
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Prix unitaire (€)</label>
//           <input
//             type="number"
//             name="prix_unitaire"
//             value={formData.prix_unitaire}
//             onChange={handleChange}
//             step="0.01"
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             readOnly
//           />
//         </div>

//         <div className="col-span-1 md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Date de vente</label>
//           <input
//             type="date"
//             name="date_vente"
//             value={formData.date_vente}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             required
//           />
//         </div>

//         <div className="col-span-1 md:col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
//           <p className="text-sm text-gray-700">
//             <strong>Vendeur :</strong>{" "}
//             {JSON.parse(localStorage.getItem("user") || "{}")?.nomComplet || "Utilisateur non identifié"}
//           </p>
//         </div>

//         <div className="col-span-1 md:col-span-2 mt-4">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
//               isSubmitting
//                 ? "bg-blue-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
//             }`}
//           >
//             {isSubmitting ? "Traitement..." : "Ajouter la vente"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddVenteForm;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { CheckCircle, XCircle, X, User, ShoppingCart } from "lucide-react";

// // 🔹 Notification élégante (réutilisable)
// const Notification = ({ type, message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => onClose(), 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 animate-in slide-in-from-right-10">
//       <div
//         className={`flex items-center p-4 rounded-lg shadow-lg border-l-4 ${
//           type === "success"
//             ? "bg-green-50 border-green-500 text-green-700"
//             : "bg-red-50 border-red-500 text-red-700"
//         }`}
//       >
//         <div className="mr-3">
//           {type === "success" ? (
//             <CheckCircle size={24} className="text-green-500" />
//           ) : (
//             <XCircle size={24} className="text-red-500" />
//           )}
//         </div>
//         <div className="flex-1">
//           <p className="font-medium">{message}</p>
//         </div>
//         <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
//           <X size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// const AddVenteForm = () => {
//   const [formData, setFormData] = useState({
//     produitId: "",
//     produitDescription: "",
//     quantite: "",
//     prix_unitaire: "",
//     date_vente: "",
//     utilisateurId: "",
//   });

//   const [produits, setProduits] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [notification, setNotification] = useState({ show: false, type: "", message: "" });
//   const [currentUser, setCurrentUser] = useState(null);

//   const showNotification = (type, message) => {
//     setNotification({ show: true, type, message });
//   };

//   // Charger les produits et récupérer l'utilisateur connecté
//   useEffect(() => {
//     const fetchProduits = async () => {
//       try {
//         const res = await axios.get("http://localhost:4999/api/allroute/getAllProduit");
//         setProduits(res.data.produit || []);
//       } catch (err) {
//         console.error("Erreur récupération des produits :", err);
//         showNotification("error", "Impossible de charger les produits.");
//       }
//     };

//     fetchProduits();

//     // Récupérer l'utilisateur depuis localStorage et vérifier la connexion
//     const user = JSON.parse(localStorage.getItem("user") || "{}");
//     if (user && user._id) {
//       setCurrentUser(user);
//       setFormData((prev) => ({ ...prev, utilisateurId: user._id }));
//       showNotification("success", `Connecté en tant que ${user.nomComplet}`);
//     } else {
//       showNotification("error", "Veuillez vous connecter avant d'ajouter une vente.");
//     }
//   }, []);

//   const handleProduitChange = (e) => {
//     const produitId = e.target.value;
//     const produit = produits.find((p) => p._id === produitId);

//     setFormData((prev) => ({
//       ...prev,
//       produitId,
//       produitDescription: produit ? produit.categorieDescription : "",
//       prix_unitaire: produit ? produit.prixVente : "",
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!formData.produitId) {
//       showNotification("error", "Veuillez choisir un produit.");
//       setIsSubmitting(false);
//       return;
//     }

//     if (!formData.utilisateurId) {
//       showNotification("error", "Utilisateur non trouvé (connexion requise).");
//       setIsSubmitting(false);
//       return;
//     }

//     const produitSelect = produits.find((p) => p._id === formData.produitId);
//     if (!produitSelect) {
//       showNotification("error", "Produit introuvable.");
//       setIsSubmitting(false);
//       return;
//     }

//     if (parseInt(formData.quantite) > produitSelect.stock) {
//       showNotification("error", `Quantité demandée (${formData.quantite}) supérieure au stock disponible (${produitSelect.stock}) !`);
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:4999/api/allroute/addVente",
//         formData,
//         {
//           withCredentials: true,
//           headers: { 
//             "Content-Type": "application/json" 
//           },
//         }
//       );

//       if (response.status === 201) {
//         showNotification("success", "Vente ajoutée avec succès !");
//         setFormData({
//           produitId: "",
//           produitDescription: "",
//           quantite: "",
//           prix_unitaire: "",
//           date_vente: "",
//           utilisateurId: formData.utilisateurId,
//         });
//       } else {
//         showNotification("error", response.data.message || "Erreur lors de l'ajout de la vente.");
//       }
//     } catch (error) {
//       console.error("Erreur détaillée:", error);
      
//       const errorMessage = error.response?.data?.message 
//         || error.message 
//         || "Problème de connexion au serveur";
      
//       showNotification("error", errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl mt-10 border border-blue-100">
//       {notification.show && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification({ show: false, type: "", message: "" })}
//         />
//       )}

//       <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center tracking-tight">
//         Ajouter une nouvelle Vente
//       </h2>

//       {/* Carte d'information utilisateur */}
//       {currentUser && (
//         <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 shadow-sm">
//           <div className="flex items-center">
//             <User className="text-green-600 mr-3" size={20} />
//             <div>
//               <p className="font-semibold text-green-800">Utilisateur connecté</p>
//               <p className="text-sm text-green-600">{currentUser.nomComplet} ({currentUser.email})</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
//         {/* Produit et description */}
//         <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Nom du Produit</label>
//             <select
//               name="produitId"
//               value={formData.produitId}
//               onChange={handleProduitChange}
//               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//               required
//             >
//               <option value="">-- Choisir un produit --</option>
//               {produits.map((prod) => (
//                 <option key={prod._id} value={prod._id}>
//                   {prod.categorieNom} - Stock: {prod.stock}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Description</label>
//             <input
//               type="text"
//               name="produitDescription"
//               value={formData.produitDescription}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//               readOnly
//             />
//           </div>
//         </div>

//         {/* Quantité */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Quantité</label>
//           <input
//             type="number"
//             name="quantite"
//             value={formData.quantite}
//             onChange={handleChange}
//             min="1"
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             required
//           />
//         </div>

//         {/* Prix unitaire */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Prix unitaire (€)</label>
//           <input
//             type="number"
//             name="prix_unitaire"
//             value={formData.prix_unitaire}
//             onChange={handleChange}
//             step="0.01"
//             className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             readOnly
//           />
//         </div>

//         {/* Date de vente */}
//         <div className="col-span-1 md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Date de vente</label>
//           <input
//             type="date"
//             name="date_vente"
//             value={formData.date_vente}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             required
//           />
//         </div>

//         {/* Information vendeur */}
//         <div className="col-span-1 md:col-span-2 p-4 bg-blue-50 rounded-xl border border-blue-200">
//           <div className="flex items-center">
//             <ShoppingCart className="text-blue-600 mr-3" size={20} />
//             <div>
//               <p className="font-semibold text-blue-800">Informations vente</p>
//               <p className="text-sm text-blue-600">
//                 Vendeur: {currentUser?.nomComplet || "Non connecté"}
//               </p>
//               {formData.quantite && formData.prix_unitaire && (
//                 <p className="text-sm text-blue-600 mt-1">
//                   Total: {(formData.quantite * formData.prix_unitaire).toFixed(2)} €
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bouton de soumission */}
//         <div className="col-span-1 md:col-span-2 mt-4">
//           <button
//             type="submit"
//             disabled={isSubmitting || !currentUser}
//             className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
//               isSubmitting || !currentUser
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:shadow-xl"
//             }`}
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center">
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Traitement en cours...
//               </span>
//             ) : (
//               "💰 Enregistrer la vente"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddVenteForm;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { CheckCircle, XCircle, X, User, ShoppingCart } from "lucide-react";

// // 🔹 Notification élégante
// const Notification = ({ type, message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => onClose(), 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 animate-in slide-in-from-right-10">
//       <div
//         className={`flex items-center p-4 rounded-lg shadow-lg border-l-4 ${
//           type === "success"
//             ? "bg-green-50 border-green-500 text-green-700"
//             : "bg-red-50 border-red-500 text-red-700"
//         }`}
//       >
//         <div className="mr-3">
//           {type === "success" ? (
//             <CheckCircle size={24} className="text-green-500" />
//           ) : (
//             <XCircle size={24} className="text-red-500" />
//           )}
//         </div>
//         <div className="flex-1">
//           <p className="font-medium">{message}</p>
//         </div>
//         <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
//           <X size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// const AddVenteForm = () => {
//   const [formData, setFormData] = useState({
//     produitId: "",
//     produitDescription: "",
//     quantite: "",
//     prix_unitaire: "",
//     date_vente: "",
//     utilisateurId: "",
//   });

//   const [produits, setProduits] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [notification, setNotification] = useState({ show: false, type: "", message: "" });
//   const [currentUser, setCurrentUser] = useState(null);

//   const showNotification = (type, message) => {
//     setNotification({ show: true, type, message });
//   };

//   // 🔹 Charger les produits et récupérer l'utilisateur connecté via l'API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Charger les produits
//         const produitsRes = await axios.get("http://localhost:4999/api/allroute/getAllProduit", {
//           withCredentials: true
//         });
//         setProduits(produitsRes.data.produit || []);

//         // Récupérer l'utilisateur connecté via l'API
//         const userRes = await axios.get("http://localhost:4999/jwtid", {
//           withCredentials: true
//         });

//         if (userRes.data && userRes.data.userId) {
//           // Optionnel: Récupérer les détails complets de l'utilisateur
//           const userDetailRes = await axios.get(`http://localhost:4999/api/utilisateur/getUnUtilisateur/${userRes.data.userId}`, {
//             withCredentials: true
//           });
          
//           setCurrentUser(userDetailRes.data.utilisateur);
//           setFormData((prev) => ({ ...prev, utilisateurId: userRes.data.userId }));
//           showNotification("success", `Connecté en tant que ${userDetailRes.data.utilisateur.nomComplet}`);
//         }
//       } catch (err) {
//         console.error("Erreur récupération des données :", err);
        
//         // Fallback: Essayer de récupérer depuis localStorage
//         const user = JSON.parse(localStorage.getItem("user") || "{}");
//         if (user && user._id) {
//           setCurrentUser(user);
//           setFormData((prev) => ({ ...prev, utilisateurId: user._id }));
//           showNotification("success", `Connecté en tant que ${user.nomComplet}`);
//         } else {
//           showNotification("error", "Veuillez vous connecter avant d'ajouter une vente.");
//         }
//       }
//     };

//     fetchData();
//   }, []);

//   const handleProduitChange = (e) => {
//     const produitId = e.target.value;
//     const produit = produits.find((p) => p._id === produitId);

//     setFormData((prev) => ({
//       ...prev,
//       produitId,
//       produitDescription: produit ? produit.categorieDescription : "",
//       prix_unitaire: produit ? produit.prixVente : "",
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!formData.produitId) {
//       showNotification("error", "Veuillez choisir un produit.");
//       setIsSubmitting(false);
//       return;
//     }

//     if (!formData.utilisateurId) {
//       showNotification("error", "Utilisateur non trouvé (connexion requise).");
//       setIsSubmitting(false);
//       return;
//     }

//     const produitSelect = produits.find((p) => p._id === formData.produitId);
//     if (!produitSelect) {
//       showNotification("error", "Produit introuvable.");
//       setIsSubmitting(false);
//       return;
//     }

//     if (parseInt(formData.quantite) > produitSelect.stock) {
//       showNotification("error", `Quantité demandée (${formData.quantite}) supérieure au stock disponible (${produitSelect.stock}) !`);
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:4999/api/allroute/addVente",
//         formData,
//         {
//           withCredentials: true,
//           headers: { 
//             "Content-Type": "application/json" 
//           },
//         }
//       );

//       if (response.status === 201) {
//         showNotification("success", "Vente ajoutée avec succès !");
//         setFormData({
//           produitId: "",
//           produitDescription: "",
//           quantite: "",
//           prix_unitaire: "",
//           date_vente: "",
//           utilisateurId: formData.utilisateurId,
//         });
//       } else {
//         showNotification("error", response.data.message || "Erreur lors de l'ajout de la vente.");
//       }
//     } catch (error) {
//       console.error("Erreur détaillée:", error);
      
//       const errorMessage = error.response?.data?.message 
//         || error.message 
//         || "Problème de connexion au serveur";
      
//       showNotification("error", errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl mt-10 border border-blue-100">
//       {notification.show && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification({ show: false, type: "", message: "" })}
//         />
//       )}

//       <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center tracking-tight">
//         Ajouter une nouvelle Vente
//       </h2>

//       {/* Carte d'information utilisateur */}
//       {currentUser && (
//         <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 shadow-sm">
//           <div className="flex items-center">
//             <User className="text-green-600 mr-3" size={20} />
//             <div>
//               <p className="font-semibold text-green-800">Utilisateur connecté</p>
//               <p className="text-sm text-green-600">{currentUser.nomComplet} ({currentUser.email})</p>
//               <p className="text-xs text-green-500">ID: {currentUser._id}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
//         {/* Produit et description */}
//         <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Nom du Produit</label>
//             <select
//               name="produitId"
//               value={formData.produitId}
//               onChange={handleProduitChange}
//               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//               required
//             >
//               <option value="">-- Choisir un produit --</option>
//               {produits.map((prod) => (
//                 <option key={prod._id} value={prod._id}>
//                   {prod.categorieNom} - Stock: {prod.stock} - Prix: {prod.prixVente}€
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Description</label>
//             <input
//               type="text"
//               name="produitDescription"
//               value={formData.produitDescription}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//               readOnly
//             />
//           </div>
//         </div>

//         {/* Quantité */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Quantité</label>
//           <input
//             type="number"
//             name="quantite"
//             value={formData.quantite}
//             onChange={handleChange}
//             min="1"
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             required
//           />
//         </div>

//         {/* Prix unitaire */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Prix unitaire (€)</label>
//           <input
//             type="number"
//             name="prix_unitaire"
//             value={formData.prix_unitaire}
//             onChange={handleChange}
//             step="0.01"
//             className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             readOnly
//           />
//         </div>

//         {/* Date de vente */}
//         <div className="col-span-1 md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Date de vente</label>
//           <input
//             type="date"
//             name="date_vente"
//             value={formData.date_vente}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             required
//           />
//         </div>

//         {/* Information vendeur */}
//         <div className="col-span-1 md:col-span-2 p-4 bg-blue-50 rounded-xl border border-blue-200">
//           <div className="flex items-center">
//             <ShoppingCart className="text-blue-600 mr-3" size={20} />
//             <div>
//               <p className="font-semibold text-blue-800">Informations vente</p>
//               <p className="text-sm text-blue-600">
//                 Vendeur: {currentUser?.nomComplet || "Non connecté"}
//               </p>
//               {formData.quantite && formData.prix_unitaire && (
//                 <p className="text-sm text-blue-600 mt-1">
//                   Total: {(formData.quantite * formData.prix_unitaire).toFixed(2)} €
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bouton de soumission */}
//         <div className="col-span-1 md:col-span-2 mt-4">
//           <button
//             type="submit"
//             disabled={isSubmitting || !currentUser}
//             className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
//               isSubmitting || !currentUser
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:shadow-xl"
//             }`}
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center">
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Traitement en cours...
//               </span>
//             ) : (
//               "💰 Enregistrer la vente"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddVenteForm;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { CheckCircle, XCircle, X, User, ShoppingCart } from "lucide-react";
// import ListeVents from "./ListeVents";

// // 🔹 Notification élégante
// const Notification = ({ type, message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => onClose(), 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 animate-in slide-in-from-right-10">
//       <div
//         className={`flex items-center p-4 rounded-lg shadow-lg border-l-4 ${
//           type === "success"
//             ? "bg-green-50 border-green-500 text-green-700"
//             : "bg-red-50 border-red-500 text-red-700"
//         }`}
//       >
//         <div className="mr-3">
//           {type === "success" ? (
//             <CheckCircle size={24} className="text-green-500" />
//           ) : (
//             <XCircle size={24} className="text-red-500" />
//           )}
//         </div>
//         <div className="flex-1">
//           <p className="font-medium">{message}</p>
//         </div>
//         <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
//           <X size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// const AddVenteForm = () => {
//   const [formData, setFormData] = useState({
//     produitId: "",
//     produitDescription: "",
//     quantite: "",
//     prix_unitaire: "",
//     date_vente: "",
//     utilisateurId: "",
//   });

//   const [produits, setProduits] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [notification, setNotification] = useState({ show: false, type: "", message: "" });
//   const [currentUser, setCurrentUser] = useState(null);

//   const showNotification = (type, message) => {
//     setNotification({ show: true, type, message });
//   };

//   // 🔹 Charger les produits et récupérer l'utilisateur connecté
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Charger les produits
//         const produitsRes = await axios.get("http://localhost:4999/api/allroute/getAllProduit", {
//           withCredentials: true
//         });
//         setProduits(produitsRes.data.produit || []);

//         // Récupérer l'utilisateur connecté via l'API JWT
//         const userRes = await axios.get("http://localhost:4999/jwtid", {
//           withCredentials: true
//         });

//         if (userRes.data && userRes.data.userId) {
//           // Stocker seulement l'ID utilisateur (les détails complets ne sont pas nécessaires)
//           const user = { 
//             _id: userRes.data.userId, 
//             nomComplet: "Utilisateur connecté", // Valeur par défaut
//             email: "utilisateur@example.com" 
//           };
          
//           setCurrentUser(user);
//           setFormData((prev) => ({ ...prev, utilisateurId: userRes.data.userId }));
          
//           // Optionnel: Si vous voulez récupérer les détails, utilisez la bonne route
//           try {
//             // Essayez de récupérer les détails si la route existe
//             const userDetailRes = await axios.get(`http://localhost:4999/api/utilisateur/getUnUtilisateur/${userRes.data.userId}`, {
//               withCredentials: true
//             });
            
//             if (userDetailRes.data && userDetailRes.data.utilisateur) {
//               setCurrentUser(userDetailRes.data.utilisateur);
//               showNotification("success", `Connecté en tant que ${userDetailRes.data.utilisateur.nomComplet}`);
//             }
//           } catch (detailError) {
//             // Si la route de détail n'existe pas, utilisez les infos de base
//             console.log("Route de détail utilisateur non disponible, utilisation des informations de base");
//             showNotification("success", "Utilisateur connecté");
//           }
//         }
//       } catch (err) {
//         console.error("Erreur récupération des données :", err);
        
//         // Fallback: Essayer de récupérer depuis localStorage
//         const user = JSON.parse(localStorage.getItem("user") || "{}");
//         if (user && user._id) {
//           setCurrentUser(user);
//           setFormData((prev) => ({ ...prev, utilisateurId: user._id }));
//           showNotification("success", `Connecté en tant que ${user.nomComplet}`);
//         } else {
//           showNotification("error", "Veuillez vous connecter avant d'ajouter une vente.");
//         }
//       }
//     };

//     fetchData();
//   }, []);

//   const handleProduitChange = (e) => {
//     const produitId = e.target.value;
//     const produit = produits.find((p) => p._id === produitId);

//     setFormData((prev) => ({
//       ...prev,
//       produitId,
//       produitDescription: produit ? produit.categorieDescription : "",
//       prix_unitaire: produit ? produit.prixVente : "",
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!formData.produitId) {
//       showNotification("error", "Veuillez choisir un produit.");
//       setIsSubmitting(false);
//       return;
//     }

//     if (!formData.utilisateurId) {
//       showNotification("error", "Utilisateur non trouvé (connexion requise).");
//       setIsSubmitting(false);
//       return;
//     }

//     const produitSelect = produits.find((p) => p._id === formData.produitId);
//     if (!produitSelect) {
//       showNotification("error", "Produit introuvable.");
//       setIsSubmitting(false);
//       return;
//     }

//     if (parseInt(formData.quantite) > produitSelect.stock) {
//       showNotification("error", `Quantité demandée (${formData.quantite}) supérieure au stock disponible (${produitSelect.stock}) !`);
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:4999/api/allroute/addVente",
//         formData,
//         {
//           withCredentials: true,
//           headers: { 
//             "Content-Type": "application/json" 
//           },
//         }
//       );

//       if (response.status === 201) {
//         showNotification("success", "Vente ajoutée avec succès !");
//         setFormData({
//           produitId: "",
//           produitDescription: "",
//           quantite: "",
//           prix_unitaire: "",
//           date_vente: "",
//           utilisateurId: formData.utilisateurId,
//         });
//       } else {
//         showNotification("error", response.data.message || "Erreur lors de l'ajout de la vente.");
//       }
//     } catch (error) {
//       console.error("Erreur détaillée:", error);
      
//       const errorMessage = error.response?.data?.message 
//         || error.message 
//         || "Problème de connexion au serveur";
      
//       showNotification("error", errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl mt-10 border border-blue-100">
//       {notification.show && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification({ show: false, type: "", message: "" })}
//         />
//       )}

//       <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center tracking-tight">
//         Ajouter une nouvelle Vente
//       </h2>

//       {/* Carte d'information utilisateur */}
//       {currentUser && (
//         <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 shadow-sm">
//           <div className="flex items-center">
//             <User className="text-green-600 mr-3" size={20} />
//             <div>
//               <p className="font-semibold text-green-800">Utilisateur connecté</p>
//               <p className="text-sm text-green-600">
//                 {currentUser.nomComplet || "Utilisateur"} 
//                 {currentUser.email && ` (${currentUser.email})`}
//               </p>
//               <p className="text-xs text-green-500">ID: {currentUser._id}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
//         {/* Produit et description */}
//         <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Nom du Produit</label>
//             <select
//               name="produitId"
//               value={formData.produitId}
//               onChange={handleProduitChange}
//               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//               required
//             >
//               <option value="">-- Choisir un produit --</option>
//               {produits.map((prod) => (
//                 <option key={prod._id} value={prod._id}>
//                   {prod.categorieNom} - Stock: {prod.stock} - Prix: {prod.prixVente}€
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Description</label>
//             <input
//               type="text"
//               name="produitDescription"
//               value={formData.produitDescription}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//               readOnly
//             />
//           </div>
//         </div>

//         {/* Quantité */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Quantité</label>
//           <input
//             type="number"
//             name="quantite"
//             value={formData.quantite}
//             onChange={handleChange}
//             min="1"
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             required
//           />
//         </div>

//         {/* Prix unitaire */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Prix unitaire (€)</label>
//           <input
//             type="number"
//             name="prix_unitaire"
//             value={formData.prix_unitaire}
//             onChange={handleChange}
//             step="0.01"
//             className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             readOnly
//           />
//         </div>

//         {/* Date de vente */}
//         <div className="col-span-1 md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Date de vente</label>
//           <input
//             type="date"
//             name="date_vente"
//             value={formData.date_vente}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
//             required
//           />
//         </div>

//         {/* Information vendeur */}
//         <div className="col-span-1 md:col-span-2 p-4 bg-blue-50 rounded-xl border border-blue-200">
//           <div className="flex items-center">
//             <ShoppingCart className="text-blue-600 mr-3" size={20} />
//             <div>
//               <p className="font-semibold text-blue-800">Informations vente</p>
//               <p className="text-sm text-blue-600">
//                 Vendeur: {currentUser?.nomComplet || "Non connecté"}
//               </p>
//               {formData.quantite && formData.prix_unitaire && (
//                 <p className="text-sm text-blue-600 mt-1">
//                   Total: {(formData.quantite * formData.prix_unitaire).toFixed(2)} €
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bouton de soumission */}
//         <div className="col-span-1 md:col-span-2 mt-4">
//           <button
//             type="submit"
//             disabled={isSubmitting || !currentUser}
//             className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
//               isSubmitting || !currentUser
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:shadow-xl"
//             }`}
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center">
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Traitement en cours...
//               </span>
//             ) : (
//               "💰 Enregistrer la vente"
//             )}
//           </button>
//         </div>
//       </form>
//       <ListeVents/>
//     </div>
//   );
// };

// export default AddVenteForm;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, XCircle, X, User, ShoppingCart, RefreshCw } from "lucide-react";
import ListeVents from "./ListeVents";

// 🔹 Notification élégante
const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 animate-in slide-in-from-right-10">
      <div
        className={`flex items-center p-4 rounded-lg shadow-lg border-l-4 ${
          type === "success"
            ? "bg-green-50 border-green-500 text-green-700"
            : "bg-red-50 border-red-500 text-red-700"
        }`}
      >
        <div className="mr-3">
          {type === "success" ? (
            <CheckCircle size={24} className="text-green-500" />
          ) : (
            <XCircle size={24} className="text-red-500" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose} 
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fermer la notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

const AddVenteForm = () => {
  const [formData, setFormData] = useState({
    produitId: "",
    quantite: "",
    prix_unitaire: "",
    date_vente: new Date().toISOString().split('T')[0], // Date du jour par défaut
    utilisateurId: "",
  });

  const [produits, setProduits] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProduits, setIsLoadingProduits] = useState(true);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProduit, setSelectedProduit] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
  };

  // 🔹 Calcul du montant total
  const montantTotal = formData.quantite && formData.prix_unitaire 
    ? (parseFloat(formData.quantite) * parseFloat(formData.prix_unitaire)).toFixed(2)
    : "0.00";

  // 🔹 Charger les produits et récupérer l'utilisateur connecté
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingProduits(true);
        
        // Charger les produits
        const produitsRes = await axios.get("http://localhost:4999/api/allroute/getAllProduit", {
          withCredentials: true
        });
        setProduits(produitsRes.data.produit || []);

        // Récupérer l'utilisateur connecté via l'API JWT
        const userRes = await axios.get("http://localhost:4999/jwtid", {
          withCredentials: true
        });

        if (userRes.data && userRes.data.userId) {
          setCurrentUser({ 
            _id: userRes.data.userId, 
            nomComplet: "Utilisateur connecté",
          });
          setFormData(prev => ({ 
            ...prev, 
            utilisateurId: userRes.data.userId 
          }));
          
          // Tentative de récupération des détails utilisateur
          try {
            const userDetailRes = await axios.get(
              `http://localhost:4999/api/utilisateur/getUnUtilisateur/${userRes.data.userId}`,
              { withCredentials: true }
            );
            
            if (userDetailRes.data?.utilisateur) {
              setCurrentUser(userDetailRes.data.utilisateur);
            }
          } catch (detailError) {
            console.log("Détails utilisateur non disponibles");
          }
        }
      } catch (err) {
        console.error("Erreur récupération des données :", err);
        
        // Fallback: localStorage
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user && user._id) {
          setCurrentUser(user);
          setFormData(prev => ({ ...prev, utilisateurId: user._id }));
        } else {
          showNotification("error", "Veuillez vous connecter avant d'ajouter une vente.");
        }
      } finally {
        setIsLoadingProduits(false);
      }
    };

    fetchData();
  }, []);

  const handleProduitChange = (e) => {
    const produitId = e.target.value;
    const produit = produits.find((p) => p._id === produitId);

    setSelectedProduit(produit);
    setFormData(prev => ({
      ...prev,
      produitId,
      prix_unitaire: produit ? produit.prixVente : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.produitId) {
      showNotification("error", "Veuillez choisir un produit.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.utilisateurId) {
      showNotification("error", "Utilisateur non identifié. Veuillez vous reconnecter.");
      setIsSubmitting(false);
      return;
    }

    if (parseInt(formData.quantite) <= 0) {
      showNotification("error", "La quantité doit être supérieure à zéro.");
      setIsSubmitting(false);
      return;
    }

    if (parseInt(formData.quantite) > selectedProduit.stock) {
      showNotification(
        "error", 
        `Stock insuffisant! Demandé: ${formData.quantite}, Disponible: ${selectedProduit.stock}`
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Préparation des données pour le backend
      const venteData = {
        produitId: formData.produitId,
        utilisateurId: formData.utilisateurId,
        quantite: parseInt(formData.quantite),
        prix_unitaire: parseFloat(formData.prix_unitaire),
        date_vente: formData.date_vente,
        // montantT est calculé côté backend dans la nouvelle version
      };

      const response = await axios.post(
        "http://localhost:4999/api/allroute/addVente",
        venteData,
        {
          withCredentials: true,
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        }
      );

      if (response.status === 201) {
        showNotification("success", "Vente enregistrée avec succès ! Stock mis à jour.");
        
        // Réinitialisation du formulaire
        setFormData({
          produitId: "",
          quantite: "",
          prix_unitaire: "",
          date_vente: new Date().toISOString().split('T')[0],
          utilisateurId: formData.utilisateurId, // Garder l'ID utilisateur
        });
        setSelectedProduit(null);

        // Recharger les produits pour actualiser les stocks
        try {
          const produitsRes = await axios.get(
            "http://localhost:4999/api/allroute/getAllProduit", 
            { withCredentials: true }
          );
          setProduits(produitsRes.data.produit || []);
        } catch (refreshError) {
          console.error("Erreur actualisation produits:", refreshError);
        }
      }
    } catch (error) {
      console.error("Erreur détaillée:", error);
      
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error
        || error.message 
        || "Erreur de connexion au serveur";
      
      showNotification("error", `Échec de l'opération: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingProduits) {
    return (
      <div className="max-w-6xl mx-auto p-8 flex justify-center items-center h-64">
        <div className="text-center">
          <RefreshCw className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl mt-6 border border-blue-100">
      {notification.show && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification({ show: false, type: "", message: "" })}
        />
      )}

      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        💰 Enregistrement de Vente
      </h2>

      {/* Carte d'information utilisateur */}
      {currentUser && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 shadow-sm">
          <div className="flex items-center">
            <User className="text-green-600 mr-3" size={20} />
            <div>
              <p className="font-semibold text-green-800">Vendeur</p>
              <p className="text-sm text-green-600">
                {currentUser.nomComplet || "Utilisateur"} 
                {currentUser.email && ` (${currentUser.email})`}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        {/* Sélection du produit */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Produit *</label>
          <select
            name="produitId"
            value={formData.produitId}
            onChange={handleProduitChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
            disabled={isSubmitting}
          >
            <option value="">-- Sélectionner un produit --</option>
            {produits.map((prod) => (
              <option key={prod._id} value={prod._id} disabled={prod.stock <= 0}>
                {prod.categorieNom} - Stock: {prod.stock} - {prod.prixVente}€
                {prod.stock <= 0 && " (Épuisé)"}
              </option>
            ))}
          </select>
          {selectedProduit && (
            <p className="text-sm text-gray-500 mt-2">
              Description: {selectedProduit.description || "Aucune description"}
            </p>
          )}
        </div>

        {/* Quantité et Prix unitaire */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantité *</label>
          <input
            type="number"
            name="quantite"
            value={formData.quantite}
            onChange={handleChange}
            min="1"
            max={selectedProduit?.stock || 0}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
            disabled={isSubmitting || !formData.produitId}
            placeholder="Quantité"
          />
          {selectedProduit && (
            <p className="text-xs text-gray-500 mt-1">
              Stock disponible: {selectedProduit.stock}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prix unitaire (€)</label>
          <input
            type="number"
            name="prix_unitaire"
            value={formData.prix_unitaire}
            onChange={handleChange}
            step="0.01"
            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            readOnly
            disabled={isSubmitting}
          />
        </div>

        {/* Date de vente */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date de vente *</label>
          <input
            type="date"
            name="date_vente"
            value={formData.date_vente}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Récapitulatif de la vente */}
        <div className="col-span-1 md:col-span-2 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center">
            <ShoppingCart className="text-blue-600 mr-3" size={20} />
            <div>
              <p className="font-semibold text-blue-800">Récapitulatif</p>
              <div className="text-sm text-blue-600 mt-2">
                <p>Produit: {selectedProduit?.categorieNom || "Aucun"}</p>
                <p>Quantité: {formData.quantite || "0"}</p>
                <p>Prix unitaire: {formData.prix_unitaire ? `${formData.prix_unitaire} €` : "0 €"}</p>
                <p className="font-bold mt-1">Total: {montantTotal} €</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de soumission */}
        <div className="col-span-1 md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={isSubmitting || !currentUser || !formData.produitId}
            className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
              isSubmitting || !currentUser || !formData.produitId
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <RefreshCw className="animate-spin mr-2 h-5 w-5" />
                Traitement en cours...
              </span>
            ) : (
              "✅ Finaliser la vente"
            )}
          </button>
        </div>
      </form>

      {/* Liste des ventes */}
      <div className="mt-8">
        <ListeVents />
      </div>
    </div>
  );
};

export default AddVenteForm;