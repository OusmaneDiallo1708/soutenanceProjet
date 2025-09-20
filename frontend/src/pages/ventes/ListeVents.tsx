// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { Eye, Search, Filter, Download, ChevronDown, X, Calendar, DollarSign, Package, BarChart3, CheckCircle, XCircle, Users, TrendingUp, CreditCard, Receipt } from "lucide-react";

// // 🔹 Notification élégante
// const Notification = ({ type, message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 animate-in slide-in-from-right-10`}>
//       <div className={`flex items-center p-4 rounded-lg shadow-lg border-l-4 ${
//         type === "success" 
//           ? "bg-green-50 border-green-500 text-green-700" 
//           : "bg-red-50 border-red-500 text-red-700"
//       }`}>
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
//         <button
//           onClick={onClose}
//           className="ml-4 text-gray-400 hover:text-gray-600"
//         >
//           <X size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// // 🔹 Modal Premium avec animations
// const Modal = ({ isOpen, onClose, children, title, size = "md" }) => {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
    
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;
  
//   const sizeClasses = {
//     sm: "max-w-md",
//     md: "max-w-2xl",
//     lg: "max-w-4xl",
//     xl: "max-w-6xl"
//   };
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 backdrop-blur-md transition-all duration-300">
//       <div 
//         className={`bg-white rounded-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-95 animate-in fade-in-90 zoom-in-90`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
//           <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
//             {title}
//           </h3>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
//           >
//             <X size={24} />
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// // 🔹 Squelette de chargement premium
// const SkeletonRow = () => (
//   <div className="flex items-center p-4 space-x-4 border-b border-gray-100 animate-pulse">
//     <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
//     <div className="flex-1 space-y-3">
//       <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
//       <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
//     </div>
//     <div className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
//   </div>
// );

// const ListeVents = () => {
//   const [ventes, setVentes] = useState([]);
//   const [filteredVentes, setFilteredVentes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedVente, setSelectedVente] = useState(null);
//   const [modalType, setModalType] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDate, setFilterDate] = useState("all");
//   const [exporting, setExporting] = useState(false);
//   const [notification, setNotification] = useState({ show: false, type: "", message: "" });

//   useEffect(() => {
//     const fetchVentes = async () => {
//       try {
//         const res = await axios.get("http://localhost:4999/api/allRoute/getAllVente");
//         setVentes(res.data.ventes || []);
//         setFilteredVentes(res.data.ventes || []);
//         setLoading(false);
//       } catch (error) {
//         console.error("Erreur récupération ventes :", error);
//         setLoading(false);
//         showNotification("error", "Erreur lors du chargement des ventes");
//       }
//     };
//     fetchVentes();
//   }, []);

//   // Filtrage des ventes
//   useEffect(() => {
//     let results = ventes;
    
//     // Filtre par recherche
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       results = results.filter(v => 
//         v.produit?.categorieNom?.toLowerCase().includes(term) ||
//         v.utilisateur?.nomComplet?.toLowerCase().includes(term) ||
//         v.quantite.toString().includes(term) ||
//         v.montant_total.toString().includes(term)
//       );
//     }
    
//     // Filtre par date (exemple simplifié)
//     if (filterDate === "today") {
//       const today = new Date().toDateString();
//       results = results.filter(v => new Date(v.date_vente).toDateString() === today);
//     } else if (filterDate === "week") {
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//       results = results.filter(v => new Date(v.date_vente) >= oneWeekAgo);
//     } else if (filterDate === "month") {
//       const oneMonthAgo = new Date();
//       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//       results = results.filter(v => new Date(v.date_vente) >= oneMonthAgo);
//     }
    
//     setFilteredVentes(results);
//   }, [searchTerm, filterDate, ventes]);

//   const showNotification = (type, message) => {
//     setNotification({ show: true, type, message });
//   };

//   const openModal = (vente, type) => {
//     setSelectedVente(vente);
//     setModalType(type);
//   };

//   const closeModal = () => {
//     setSelectedVente(null);
//     setModalType("");
//   };

//   const handleExport = async () => {
//     setExporting(true);
//     try {
//       const csvContent = "data:text/csv;charset=utf-8," 
//         + "Date,Produit,Client,Quantité,Prix Unitaire,Montant Total\n"
//         + ventes.map(v => 
//             `"${new Date(v.date_vente).toLocaleDateString()}","${v.produit?.categorieNom || 'N/A'}","${v.utilisateur?.nomComplet || 'N/A'}",${v.quantite},${v.prix_unitaire},${v.montant_total}`
//           ).join("\n");
      
//       const encodedUri = encodeURI(csvContent);
//       const link = document.createElement("a");
//       link.setAttribute("href", encodedUri);
//       link.setAttribute("download", "ventes_export.csv");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       showNotification("success", "Exportation réussie !");
//     } catch (error) {
//       console.error("Erreur export :", error);
//       showNotification("error", "Erreur lors de l'exportation.");
//     }
//     setExporting(false);
//   };

//   const customStyles = {
//     headRow: {
//       style: {
//         backgroundColor: '#f8fafc',
//         fontSize: '0.9rem',
//         fontWeight: 'bold',
//         borderTop: '1px solid #f1f5f9',
//         borderBottom: '2px solid #e2e8f0',
//         color: '#64748b',
//       },
//     },
//     headCells: {
//       style: {
//         paddingLeft: '12px',
//         paddingRight: '12px',
//       },
//     },
//     rows: {
//       style: {
//         fontSize: '0.9rem',
//         padding: '12px 8px',
//         '&:not(:last-of-type)': {
//           borderBottom: '1px solid #f1f5f9',
//         },
//         '&:hover': {
//           backgroundColor: '#f8fafc',
//         },
//       },
//       highlightOnHoverStyle: {
//         backgroundColor: '#f1f5f9',
//         borderBottomColor: '#e2e8f0',
//       },
//     },
//     cells: {
//       style: {
//         paddingLeft: '12px',
//         paddingRight: '12px',
//       },
//     },
//     pagination: {
//       style: {
//         backgroundColor: '#f8fafc',
//         borderTop: '1px solid #e2e8f0',
//         color: '#64748b',
//       },
//     },
//   };

//   const columns = [
//     {
//       name: "Date",
//       selector: (row) => (
//         <div className="flex items-center gap-2">
//           <Calendar size={16} className="text-blue-500" />
//           {new Date(row.date_vente).toLocaleDateString()}
//         </div>
//       ),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Produit",
//       selector: (row) => (
//         <div className="flex items-center">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mr-3 shadow-sm border border-gray-200">
//             <Package size={16} className="text-blue-600" />
//           </div>
//           <div>
//             <div className="font-semibold text-gray-900">{row.produit?.categorieNom || "N/A"}</div>
//             <div className="text-xs text-gray-500">Qté: {row.quantite}</div>
//           </div>
//         </div>
//       ),
//       sortable: true,
//       minWidth: "200px",
//     },
//     {
//       name: "Client",
//       selector: (row) => (
//         <div className="flex items-center">
//           <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-2 shadow-sm border border-gray-200">
//             <Users size={14} className="text-purple-600" />
//           </div>
//           <span className="text-gray-700">{row.utilisateur?.nomComplet || "N/A"}</span>
//         </div>
//       ),
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "Prix Unitaire",
//       selector: (row) => (
//         <div className="flex items-center gap-1 text-green-600 font-semibold">
//           <DollarSign size={14} />
//           {row.prix_unitaire}
//         </div>
//       ),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Montant Total",
//       selector: (row) => (
//         <div className="flex items-center gap-1 text-blue-600 font-bold">
//           <CreditCard size={14} />
//           {row.montant_total}
//         </div>
//       ),
//       sortable: true,
//       width: "130px",
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <button
//           onClick={() => openModal(row, "afficher")}
//           className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1"
//           title="Voir détails"
//         >
//           <Eye size={16} />
//           Détails
//         </button>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//       width: "120px",
//     },
//   ];

//   // Statistiques pour le header
//   const stats = {
//     total: ventes.length,
//     totalAmount: ventes.reduce((sum, v) => sum + v.montant_total, 0),
//     todaySales: ventes.filter(v => {
//       const today = new Date().toDateString();
//       return new Date(v.date_vente).toDateString() === today;
//     }).length,
//     weekSales: ventes.filter(v => {
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//       return new Date(v.date_vente) >= oneWeekAgo;
//     }).length
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8 border border-gray-100">
//       {notification.show && (
//         <Notification 
//           type={notification.type} 
//           message={notification.message} 
//           onClose={() => setNotification({ show: false, type: "", message: "" })} 
//         />
//       )}

//       {/* Header avec statistiques */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-blue-800">{stats.total}</h3>
//               <p className="text-sm text-blue-600">Total Ventes</p>
//             </div>
//             <div className="p-3 bg-blue-200 rounded-full">
//               <Receipt className="text-blue-700" size={20} />
//             </div>
//           </div>
//         </div>
//         <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-green-800">€{stats.totalAmount.toFixed(2)}</h3>
//               <p className="text-sm text-green-600">Chiffre d'affaires</p>
//             </div>
//             <div className="p-3 bg-green-200 rounded-full">
//               <DollarSign className="text-green-700" size={20} />
//             </div>
//           </div>
//         </div>
//         <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-purple-800">{stats.todaySales}</h3>
//               <p className="text-sm text-purple-600">Ventes Aujourd'hui</p>
//             </div>
//             <div className="p-3 bg-purple-200 rounded-full">
//               <TrendingUp className="text-purple-700" size={20} />
//             </div>
//           </div>
//         </div>
//         <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-orange-800">{stats.weekSales}</h3>
//               <p className="text-sm text-orange-600">Ventes 7 derniers jours</p>
//             </div>
//             <div className="p-3 bg-orange-200 rounded-full">
//               <BarChart3 className="text-orange-700" size={20} />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//           <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
//           Historique des Ventes
//           <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//             {filteredVentes.length} ventes
//           </span>
//         </h2>
        
//         <div className="flex flex-wrap gap-3">
//           <div className="relative flex-1 min-w-[250px]">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Rechercher une vente..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm"
//             />
//           </div>
          
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <select
//               value={filterDate}
//               onChange={(e) => setFilterDate(e.target.value)}
//               className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none shadow-sm"
//             >
//               <option value="all">Toutes les dates</option>
//               <option value="today">Aujourd'hui</option>
//               <option value="week">7 derniers jours</option>
//               <option value="month">30 derniers jours</option>
//             </select>
//             <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
//           </div>
          
//           <button
//             onClick={handleExport}
//             disabled={exporting || ventes.length === 0}
//             className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {exporting ? (
//               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//             ) : (
//               <Download size={16} />
//             )}
//             Exporter
//           </button>
//         </div>
//       </div>

//       <DataTable
//         columns={columns}
//         data={filteredVentes}
//         pagination
//         paginationPerPage={10}
//         paginationRowsPerPageOptions={[5, 10, 20, 50]}
//         highlightOnHover
//         pointerOnHover
//         responsive
//         progressPending={loading}
//         progressComponent={
//           <div className="space-y-3 py-8">
//             {[...Array(5)].map((_, i) => (
//               <SkeletonRow key={i} />
//             ))}
//           </div>
//         }
//         customStyles={customStyles}
//         noDataComponent={
//           <div className="py-16 text-center">
//             <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//               <Search size={40} className="text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-700 mb-2">Aucune vente trouvée</h3>
//             <p className="text-gray-500">Essayez de modifier vos critères de recherche ou de filtrage</p>
//           </div>
//         }
//       />

//       {/* Modal d'affichage des détails de vente */}
//       <Modal isOpen={modalType === "afficher"} onClose={closeModal} title="Détails de la vente" size="lg">
//         {selectedVente && (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <h5 className="font-semibold text-gray-700 flex items-center gap-2">
//                   <Package size={18} className="text-blue-500" />
//                   Informations produit
//                 </h5>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Produit:</span>
//                   <span className="font-medium">{selectedVente.produit?.categorieNom || "N/A"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Quantité:</span>
//                   <span className="font-medium">{selectedVente.quantite}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Prix unitaire:</span>
//                   <span className="font-medium">€{selectedVente.prix_unitaire}</span>
//                 </div>
//               </div>
              
//               <div className="space-y-4">
//                 <h5 className="font-semibold text-gray-700 flex items-center gap-2">
//                   <Users size={18} className="text-purple-500" />
//                   Informations client
//                 </h5>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Client:</span>
//                   <span className="font-medium">{selectedVente.utilisateur?.nomComplet || "N/A"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Email:</span>
//                   <span className="font-medium">{selectedVente.utilisateur?.email || "N/A"}</span>
//                 </div>
//               </div>
              
//               <div className="space-y-4">
//                 <h5 className="font-semibold text-gray-700 flex items-center gap-2">
//                   <DollarSign size={18} className="text-green-500" />
//                   Informations financières
//                 </h5>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Montant total:</span>
//                   <span className="font-medium text-green-600">€{selectedVente.montant_total}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Date de vente:</span>
//                   <span className="font-medium">{new Date(selectedVente.date_vente).toLocaleDateString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Heure:</span>
//                   <span className="font-medium">{new Date(selectedVente.date_vente).toLocaleTimeString()}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default ListeVents;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { 
//   Eye, Search, Filter, Download, ChevronDown, X, Calendar, DollarSign, 
//   Package, BarChart3, CheckCircle, XCircle, Users, TrendingUp, CreditCard, Receipt 
// } from "lucide-react";

// // 🔹 Notification élégante
// const Notification = ({ type, message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 animate-in slide-in-from-right-10">
//       <div className={`flex items-center p-4 rounded-lg shadow-lg border-l-4 ${
//         type === "success" 
//           ? "bg-green-50 border-green-500 text-green-700" 
//           : "bg-red-50 border-red-500 text-red-700"
//       }`}>
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
//         <button
//           onClick={onClose}
//           className="ml-4 text-gray-400 hover:text-gray-600"
//         >
//           <X size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// // 🔹 Modal Premium avec animations
// const Modal = ({ isOpen, onClose, children, title, size = "md" }) => {
//   useEffect(() => {
//     if (isOpen) document.body.style.overflow = 'hidden';
//     else document.body.style.overflow = 'unset';
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const sizeClasses = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl", xl: "max-w-6xl" };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 backdrop-blur-md transition-all duration-300">
//       <div 
//         className={`bg-white rounded-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-95 animate-in fade-in-90 zoom-in-90`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
//           <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
//             {title}
//           </h3>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
//           >
//             <X size={24} />
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// // 🔹 Squelette de chargement premium
// const SkeletonRow = () => (
//   <div className="flex items-center p-4 space-x-4 border-b border-gray-100 animate-pulse">
//     <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
//     <div className="flex-1 space-y-3">
//       <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
//       <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
//     </div>
//     <div className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
//   </div>
// );

// const ListeVents = () => {
//   const [ventes, setVentes] = useState([]);
//   const [filteredVentes, setFilteredVentes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedVente, setSelectedVente] = useState(null);
//   const [modalType, setModalType] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDate, setFilterDate] = useState("all");
//   const [exporting, setExporting] = useState(false);
//   const [notification, setNotification] = useState({ show: false, type: "", message: "" });

//   useEffect(() => {
//     const fetchVentes = async () => {
//       try {
//         const res = await axios.get("http://localhost:4999/api/allRoute/getAllVente");
//         setVentes(res.data.ventes || []);
//         setFilteredVentes(res.data.ventes || []);
//         setLoading(false);
//       } catch (error) {
//         console.error("Erreur récupération ventes :", error);
//         setLoading(false);
//         showNotification("error", "Erreur lors du chargement des ventes");
//       }
//     };
//     fetchVentes();
//   }, []);

//   // Filtrage des ventes
//   useEffect(() => {
//     let results = ventes;
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       results = results.filter(v => 
//         v.produit?.categorieNom?.toLowerCase().includes(term) ||
//         v.utilisateur?.nomComplet?.toLowerCase().includes(term) ||
//         v.quantite.toString().includes(term) ||
//         v.montant_total.toString().includes(term)
//       );
//     }
//     if (filterDate === "today") {
//       const today = new Date().toDateString();
//       results = results.filter(v => new Date(v.date_vente).toDateString() === today);
//     } else if (filterDate === "week") {
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//       results = results.filter(v => new Date(v.date_vente) >= oneWeekAgo);
//     } else if (filterDate === "month") {
//       const oneMonthAgo = new Date();
//       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//       results = results.filter(v => new Date(v.date_vente) >= oneMonthAgo);
//     }
//     setFilteredVentes(results);
//   }, [searchTerm, filterDate, ventes]);

//   const showNotification = (type, message) => {
//     setNotification({ show: true, type, message });
//   };

//   const openModal = (vente, type) => {
//     setSelectedVente(vente);
//     setModalType(type);
//   };

//   const closeModal = () => {
//     setSelectedVente(null);
//     setModalType("");
//   };

//   const handleExport = async () => {
//     setExporting(true);
//     try {
//       const csvContent = "data:text/csv;charset=utf-8," 
//         + "Date,Produit,Client,Quantité,Prix Unitaire,Montant Total\n"
//         + ventes.map(v => 
//             `"${new Date(v.date_vente).toLocaleDateString()}","${v.produit?.categorieNom || 'N/A'}","${v.utilisateur?.nomComplet || 'N/A'}",${v.quantite},${v.prix_unitaire},${v.montant_total}`
//           ).join("\n");
//       const encodedUri = encodeURI(csvContent);
//       const link = document.createElement("a");
//       link.setAttribute("href", encodedUri);
//       link.setAttribute("download", "ventes_export.csv");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       showNotification("success", "Exportation réussie !");
//     } catch (error) {
//       console.error("Erreur export :", error);
//       showNotification("error", "Erreur lors de l'exportation.");
//     }
//     setExporting(false);
//   };

//   const customStyles = {
//     headRow: { style: { backgroundColor: '#f8fafc', fontSize: '0.9rem', fontWeight: 'bold', borderTop: '1px solid #f1f5f9', borderBottom: '2px solid #e2e8f0', color: '#64748b', } },
//     headCells: { style: { paddingLeft: '12px', paddingRight: '12px', } },
//     rows: { style: { fontSize: '0.9rem', padding: '12px 8px', '&:not(:last-of-type)': { borderBottom: '1px solid #f1f5f9', }, '&:hover': { backgroundColor: '#f8fafc', }, }, highlightOnHoverStyle: { backgroundColor: '#f1f5f9', borderBottomColor: '#e2e8f0', }, },
//     cells: { style: { paddingLeft: '12px', paddingRight: '12px', } },
//     pagination: { style: { backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', color: '#64748b', }, },
//   };

//   const columns = [
//     { name: "Date", selector: (row) => (<div className="flex items-center gap-2"><Calendar size={16} className="text-blue-500" />{new Date(row.date_vente).toLocaleDateString()}</div>), sortable: true, width: "120px" },
//     { name: "Produit", selector: (row) => (<div className="flex items-center"><div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mr-3 shadow-sm border border-gray-200"><Package size={16} className="text-blue-600" /></div><div><div className="font-semibold text-gray-900">{row.produit?.categorieNom || "N/A"}</div><div className="text-xs text-gray-500">Qté: {row.quantite}</div></div></div>), sortable: true, minWidth: "200px" },
//     { name: "Client", selector: (row) => (<div className="flex items-center"><div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-2 shadow-sm border border-gray-200"><Users size={14} className="text-purple-600" /></div><span className="text-gray-700">{row.utilisateur?.nomComplet || "N/A"}</span></div>), sortable: true, width: "150px" },
//     { name: "Prix Unitaire", selector: (row) => (<div className="flex items-center gap-1 text-green-600 font-semibold"><DollarSign size={14} />{row.prix_unitaire}</div>), sortable: true, width: "120px" },
//     { name: "Montant Total", selector: (row) => (<div className="flex items-center gap-1 text-blue-600 font-bold"><CreditCard size={14} />{row.montant_total}</div>), sortable: true, width: "130px" },
//     { name: "Actions", cell: (row) => (<button onClick={() => openModal(row, "afficher")} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1" title="Voir détails"><Eye size={16} />Détails</button>), ignoreRowClick: true, allowOverflow: true, button: true, width: "120px" },
//   ];

//   const stats = {
//     total: ventes.length,
//     totalAmount: ventes.reduce((sum, v) => sum + v.montant_total, 0),
//     todaySales: ventes.filter(v => new Date(v.date_vente).toDateString() === new Date().toDateString()).length,
//     weekSales: ventes.filter(v => new Date(v.date_vente) >= (() => { const d = new Date(); d.setDate(d.getDate() - 7); return d; })()).length,
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8 border border-gray-100">
//       {notification.show && <Notification type={notification.type} message={notification.message} onClose={() => setNotification({ show: false, type: "", message: "" })} />}
      
//       {/* Header Statistiques */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-blue-800">{stats.total}</h3>
//               <p className="text-sm text-blue-600">Total Ventes</p>
//             </div>
//             <div className="p-3 bg-blue-200 rounded-full">
//               <Receipt className="text-blue-700" size={20} />
//             </div>
//           </div>
//         </div>
//         <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-green-800">€{stats.totalAmount.toFixed(2)}</h3>
//               <p className="text-sm text-green-600">Chiffre d'affaires</p>
//             </div>
//             <div className="p-3 bg-green-200 rounded-full">
//               <DollarSign className="text-green-700" size={20} />
//             </div>
//           </div>
//         </div>
//         <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-purple-800">{stats.todaySales}</h3>
//               <p className="text-sm text-purple-600">Ventes Aujourd'hui</p>
//             </div>
//             <div className="p-3 bg-purple-200 rounded-full">
//               <TrendingUp className="text-purple-700" size={20} />
//             </div>
//           </div>
//         </div>
//         <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-orange-800">{stats.weekSales}</h3>
//               <p className="text-sm text-orange-600">Ventes 7 derniers jours</p>
//             </div>
//             <div className="p-3 bg-orange-200 rounded-full">
//               <BarChart3 className="text-orange-700" size={20} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filtrage et Export */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//           <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
//           Historique des Ventes
//           <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{filteredVentes.length} ventes</span>
//         </h2>
//         <div className="flex flex-wrap gap-3">
//           <div className="relative flex-1 min-w-[250px]">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <input type="text" placeholder="Rechercher une vente..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm" />
//           </div>
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none shadow-sm">
//               <option value="all">Toutes les dates</option>
//               <option value="today">Aujourd'hui</option>
//               <option value="week">7 derniers jours</option>
//               <option value="month">30 derniers jours</option>
//             </select>
//             <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
//           </div>
//           <button onClick={handleExport} disabled={exporting || ventes.length === 0} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
//             {exporting ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Download size={16} />}
//             Exporter CSV
//           </button>
//         </div>
//       </div>

//       {/* Tableau des ventes */}
//       {loading ? (
//         <div className="space-y-2">
//           {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
//         </div>
//       ) : (
//         <DataTable
//           columns={columns}
//           data={filteredVentes}
//           customStyles={customStyles}
//           pagination
//           highlightOnHover
//           responsive
//         />
//       )}

//       {/* Modal */}
//       {selectedVente && modalType === "afficher" && (
//         <Modal isOpen={!!selectedVente} onClose={closeModal} title="Détails de la Vente">
//           <div className="space-y-3">
//             <p><strong>Produit :</strong> {selectedVente.produit?.categorieNom || "N/A"}</p>
//             <p><strong>Client :</strong> {selectedVente.utilisateur?.nomComplet || "N/A"}</p>
//             <p><strong>Quantité :</strong> {selectedVente.quantite}</p>
//             <p><strong>Prix Unitaire :</strong> €{selectedVente.prix_unitaire}</p>
//             <p><strong>Montant Total :</strong> €{selectedVente.montant_total}</p>
//             <p><strong>Date :</strong> {new Date(selectedVente.date_vente).toLocaleString()}</p>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default ListeVents;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// const token = localStorage.getItem("token"); // ou où tu stockes le JWT
// import DataTable from "react-data-table-component";
// import {
//   Eye,
//   Search,
//   Filter,
//   Download,
//   ChevronDown,
//   X,
//   Calendar,
//   DollarSign,
//   Package,
//   BarChart3,
//   CheckCircle,
//   XCircle,
//   Users,
//   TrendingUp,
//   CreditCard,
//   Receipt,
// } from "lucide-react";

// // 🔹 Notification élégante
// const Notification = ({ type, message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => onClose(), 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);
//   axios.get("http://localhost:4999/api/allRoute/getAllVente", {
//     headers: {
//       Authorization: `Bearer ${token}`  // envoie le token
//     }
//   })
//   .then(response => console.log(response.data))
//   .catch(error => console.error("Erreur récupération ventes :", error));
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

// // 🔹 Modal Premium
// const Modal = ({ isOpen, onClose, children, title, size = "md" }) => {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "unset";
//     return () => (document.body.style.overflow = "unset");
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const sizeClasses = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl", xl: "max-w-6xl" };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 backdrop-blur-md transition-all duration-300">
//       <div
//         className={`bg-white rounded-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-95 animate-in fade-in-90 zoom-in-90`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
//           <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
//             {title}
//           </h3>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
//           >
//             <X size={24} />
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">{children}</div>
//       </div>
//     </div>
//   );
// };

// // 🔹 Skeleton pour chargement
// const SkeletonRow = () => (
//   <div className="flex items-center p-4 space-x-4 border-b border-gray-100 animate-pulse">
//     <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
//     <div className="flex-1 space-y-3">
//       <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
//       <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
//     </div>
//     <div className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
//   </div>
// );

// const ListeVents = () => {
//   const [ventes, setVentes] = useState([]);
//   const [filteredVentes, setFilteredVentes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedVente, setSelectedVente] = useState(null);
//   const [modalType, setModalType] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDate, setFilterDate] = useState("all");
//   const [exporting, setExporting] = useState(false);
//   const [notification, setNotification] = useState({ show: false, type: "", message: "" });

//   // 🔹 Récupération ventes sécurisée
//   useEffect(() => {
//     const fetchVentes = async () => {
//       try {
//         const res = await axios.get("http://localhost:4999/api/allRoute/getAllVente");
//         // Sécuriser chaque vente
//         const safeVentes = (res.data.ventes || []).map(v => ({
//           ...v,
//           produit: v.produit || { categorieNom: "N/A" },
//           utilisateur: v.utilisateur || { nomComplet: "N/A", email: "N/A" },
//         }));
//         setVentes(safeVentes);
//         setFilteredVentes(safeVentes);
//       } catch (error) {
//         console.error("Erreur récupération ventes :", error);
//         showNotification("error", "Erreur lors du chargement des ventes");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVentes();
//   }, []);

//   // 🔹 Filtrage
//   useEffect(() => {
//     let results = ventes;

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       results = results.filter(
//         v =>
//           v.produit?.categorieNom.toLowerCase().includes(term) ||
//           v.utilisateur?.nomComplet.toLowerCase().includes(term) ||
//           v.quantite.toString().includes(term) ||
//           v.montant_total.toString().includes(term)
//       );
//     }

//     if (filterDate === "today") {
//       const today = new Date().toDateString();
//       results = results.filter(v => new Date(v.date_vente).toDateString() === today);
//     } else if (filterDate === "week") {
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//       results = results.filter(v => new Date(v.date_vente) >= oneWeekAgo);
//     } else if (filterDate === "month") {
//       const oneMonthAgo = new Date();
//       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//       results = results.filter(v => new Date(v.date_vente) >= oneMonthAgo);
//     }

//     setFilteredVentes(results);
//   }, [searchTerm, filterDate, ventes]);

//   const showNotification = (type, message) => setNotification({ show: true, type, message });
//   const openModal = (vente, type) => { setSelectedVente(vente); setModalType(type); };
//   const closeModal = () => { setSelectedVente(null); setModalType(""); };

//   // 🔹 Export CSV
//   const handleExport = async () => {
//     setExporting(true);
//     try {
//       const csvContent =
//         "data:text/csv;charset=utf-8," +
//         "Date,Produit,Client,Quantité,Prix Unitaire,Montant Total\n" +
//         ventes
//           .map(
//             v =>
//               `"${new Date(v.date_vente).toLocaleDateString()}","${v.produit.categorieNom}","${v.utilisateur.nomComplet}",${v.quantite},${v.prix_unitaire},${v.montant_total}`
//           )
//           .join("\n");

//       const encodedUri = encodeURI(csvContent);
//       const link = document.createElement("a");
//       link.setAttribute("href", encodedUri);
//       link.setAttribute("download", "ventes_export.csv");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       showNotification("success", "Exportation réussie !");
//     } catch (error) {
//       console.error("Erreur export :", error);
//       showNotification("error", "Erreur lors de l'exportation.");
//     }
//     setExporting(false);
//   };

//   // 🔹 Colonnes DataTable
//   const columns = [
//     {
//       name: "Date",
//       selector: row => (
//         <div className="flex items-center gap-2">
//           <Calendar size={16} className="text-blue-500" />
//           {new Date(row.date_vente).toLocaleDateString()}
//         </div>
//       ),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Produit",
//       selector: row => (
//         <div className="flex items-center">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mr-3 shadow-sm border border-gray-200">
//             <Package size={16} className="text-blue-600" />
//           </div>
//           <div>
//             <div className="font-semibold text-gray-900">{row.produit.categorieNom}</div>
//             <div className="text-xs text-gray-500">Qté: {row.quantite}</div>
//           </div>
//         </div>
//       ),
//       sortable: true,
//       minWidth: "200px",
//     },
//     {
//       name: "Client",
//       selector: row => (
//         <div className="flex items-center">
//           <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-2 shadow-sm border border-gray-200">
//             <Users size={14} className="text-purple-600" />
//           </div>
//           <span className="text-gray-700">{row.utilisateur.nomComplet}</span>
//         </div>
//       ),
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "Prix Unitaire",
//       selector: row => (
//         <div className="flex items-center gap-1 text-green-600 font-semibold">
//           <DollarSign size={14} />
//           {row.prix_unitaire}
//         </div>
//       ),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Montant Total",
//       selector: row => (
//         <div className="flex items-center gap-1 text-blue-600 font-bold">
//           <CreditCard size={14} />
//           {row.montant_total}
//         </div>
//       ),
//       sortable: true,
//       width: "130px",
//     },
//     {
//       name: "Actions",
//       cell: row => (
//         <button
//           onClick={() => openModal(row, "afficher")}
//           className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1"
//           title="Voir détails"
//         >
//           <Eye size={16} />
//           Détails
//         </button>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//       width: "120px",
//     },
//   ];

//   // 🔹 Stats
//   const stats = {
//     total: ventes.length,
//     totalAmount: ventes.reduce((sum, v) => sum + v.montant_total, 0),
//     todaySales: ventes.filter(v => new Date(v.date_vente).toDateString() === new Date().toDateString()).length,
//     weekSales: ventes.filter(v => new Date(v.date_vente) >= new Date(new Date().setDate(new Date().getDate() - 7))).length,
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8 border border-gray-100">
//       {notification.show && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification({ show: false, type: "", message: "" })}
//         />
//       )}

//       {/* Header stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         {/* Total Ventes */}
//         <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-blue-800">{stats.total}</h3>
//               <p className="text-sm text-blue-600">Total Ventes</p>
//             </div>
//             <div className="p-3 bg-blue-200 rounded-full">
//               <Receipt className="text-blue-700" size={20} />
//             </div>
//           </div>
//         </div>

//         {/* Chiffre d'affaires */}
//         <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-green-800">€{stats.totalAmount.toFixed(2)}</h3>
//               <p className="text-sm text-green-600">Chiffre d'affaires</p>
//             </div>
//             <div className="p-3 bg-green-200 rounded-full">
//               <DollarSign className="text-green-700" size={20} />
//             </div>
//           </div>
//         </div>

//         {/* Ventes aujourd'hui */}
//         <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-purple-800">{stats.todaySales}</h3>
//               <p className="text-sm text-purple-600">Ventes Aujourd'hui</p>
//             </div>
//             <div className="p-3 bg-purple-200 rounded-full">
//               <TrendingUp className="text-purple-700" size={20} />
//             </div>
//           </div>
//         </div>

//         {/* Ventes semaine */}
//         <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-orange-800">{stats.weekSales}</h3>
//               <p className="text-sm text-orange-600">Ventes 7 derniers jours</p>
//             </div>
//             <div className="p-3 bg-orange-200 rounded-full">
//               <BarChart3 className="text-orange-700" size={20} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recherche, filtre et export */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//           <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
//           Historique des Ventes
//           <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//             {filteredVentes.length} ventes
//           </span>
//         </h2>

//         <div className="flex flex-wrap gap-3">
//           {/* Search */}
//           <div className="relative flex-1 min-w-[250px]">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Rechercher une vente..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm"
//             />
//           </div>

//           {/* Filter */}
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <select
//               value={filterDate}
//               onChange={(e) => setFilterDate(e.target.value)}
//               className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//             >
//               <option value="all">Tous</option>
//               <option value="today">Aujourd'hui</option>
//               <option value="week">Cette semaine</option>
//               <option value="month">Ce mois</option>
//             </select>
//           </div>

//           {/* Export */}
//           <button
//             onClick={handleExport}
//             disabled={exporting}
//             className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
//           >
//             <Download size={18} />
//             {exporting ? "Export..." : "Exporter CSV"}
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       {loading ? (
//         Array.from({ length: 6 }).map((_, idx) => <SkeletonRow key={idx} />)
//       ) : (
//         <DataTable
//           columns={columns}
//           data={filteredVentes}
//           pagination
//           highlightOnHover
//           pointerOnHover
//           responsive
//           striped
//           defaultSortFieldId={1}
//         />
//       )}

//       {/* Modal */}
//       <Modal
//         isOpen={!!selectedVente}
//         onClose={closeModal}
//         title={modalType === "afficher" ? "Détails Vente" : ""}
//         size="md"
//       >
//         {selectedVente && (
//           <div className="space-y-4">
//             <p>
//               <strong>Date :</strong> {new Date(selectedVente.date_vente).toLocaleString()}
//             </p>
//             <p>
//               <strong>Produit :</strong> {selectedVente.produit?.categorieNom || "N/A"}
//             </p>
//             <p>
//               <strong>Client :</strong> {selectedVente.utilisateur?.nomComplet || "N/A"} (
//               {selectedVente.utilisateur?.email || "N/A"})
//             </p>
//             <p>
//               <strong>Quantité :</strong> {selectedVente.quantite}
//             </p>
//             <p>
//               <strong>Prix Unitaire :</strong> {selectedVente.prix_unitaire}
//             </p>
//             <p>
//               <strong>Montant Total :</strong> {selectedVente.montant_total}
//             </p>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default ListeVents;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// const token = localStorage.getItem("token"); // Token JWT
// import DataTable from "react-data-table-component";
// import {
//   Eye,
//   Search,
//   Filter,
//   Download,
//   X,
//   Calendar,
//   DollarSign,
//   Package,
//   BarChart3,
//   CheckCircle,
//   XCircle,
//   Users,
//   TrendingUp,
//   CreditCard,
//   Receipt,
// } from "lucide-react";

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

// // 🔹 Modal Premium
// const Modal = ({ isOpen, onClose, children, title, size = "md" }) => {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "unset";
//     return () => (document.body.style.overflow = "unset");
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const sizeClasses = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl", xl: "max-w-6xl" };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 backdrop-blur-md transition-all duration-300">
//       <div
//         className={`bg-white rounded-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-95 animate-in fade-in-90 zoom-in-90`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
//           <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
//             {title}
//           </h3>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
//           >
//             <X size={24} />
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">{children}</div>
//       </div>
//     </div>
//   );
// };

// // 🔹 Skeleton pour chargement
// const SkeletonRow = () => (
//   <div className="flex items-center p-4 space-x-4 border-b border-gray-100 animate-pulse">
//     <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
//     <div className="flex-1 space-y-3">
//       <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
//       <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
//     </div>
//     <div className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
//   </div>
// );

// const ListeVents = () => {
//   const [ventes, setVentes] = useState([]);
//   const [filteredVentes, setFilteredVentes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedVente, setSelectedVente] = useState(null);
//   const [modalType, setModalType] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDate, setFilterDate] = useState("all");
//   const [exporting, setExporting] = useState(false);
//   const [notification, setNotification] = useState({ show: false, type: "", message: "" });

//   // 🔹 Récupération ventes sécurisée
//   useEffect(() => {
//     const fetchVentes = async () => {
//       try {
//         const res = await axios.get("http://localhost:4999/api/allroute/getAllVente", {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         });

//         const safeVentes = (res.data.ventes || []).map(v => ({
//           ...v,
//           produit: v.produit || { categorieNom: "N/A" },
//           utilisateur: v.utilisateur || { nomComplet: "N/A", email: "N/A" },
//         }));

//         setVentes(safeVentes);
//         setFilteredVentes(safeVentes);
//       } catch (error) {
//         console.error("Erreur récupération ventes :", error);
//         showNotification("error", "Erreur lors du chargement des ventes");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVentes();
//   }, []);

//   // 🔹 Filtrage
//   useEffect(() => {
//     let results = ventes;

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       results = results.filter(
//         v =>
//           v.produit?.categorieNom.toLowerCase().includes(term) ||
//           v.utilisateur?.nomComplet.toLowerCase().includes(term) ||
//           v.quantite.toString().includes(term) ||
//           v.montant_total.toString().includes(term)
//       );
//     }

//     if (filterDate === "today") {
//       const today = new Date().toDateString();
//       results = results.filter(v => new Date(v.date_vente).toDateString() === today);
//     } else if (filterDate === "week") {
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//       results = results.filter(v => new Date(v.date_vente) >= oneWeekAgo);
//     } else if (filterDate === "month") {
//       const oneMonthAgo = new Date();
//       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//       results = results.filter(v => new Date(v.date_vente) >= oneMonthAgo);
//     }

//     setFilteredVentes(results);
//   }, [searchTerm, filterDate, ventes]);

//   const showNotification = (type, message) => setNotification({ show: true, type, message });
//   const openModal = (vente, type) => { setSelectedVente(vente); setModalType(type); };
//   const closeModal = () => { setSelectedVente(null); setModalType(""); };

//   // 🔹 Export CSV
//   const handleExport = async () => {
//     setExporting(true);
//     try {
//       const csvContent =
//         "data:text/csv;charset=utf-8," +
//         "Date,Produit,Client,Quantité,Prix Unitaire,Montant Total\n" +
//         ventes
//           .map(
//             v =>
//               `"${new Date(v.date_vente).toLocaleDateString()}","${v.produit.categorieNom}","${v.utilisateur.nomComplet}",${v.quantite},${v.prix_unitaire},${v.montant_total}`
//           )
//           .join("\n");

//       const encodedUri = encodeURI(csvContent);
//       const link = document.createElement("a");
//       link.setAttribute("href", encodedUri);
//       link.setAttribute("download", "ventes_export.csv");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       showNotification("success", "Exportation réussie !");
//     } catch (error) {
//       console.error("Erreur export :", error);
//       showNotification("error", "Erreur lors de l'exportation.");
//     }
//     setExporting(false);
//   };

//   // 🔹 Colonnes DataTable (props invalides supprimées)
//   const columns = [
//     {
//       name: "Date",
//       selector: row => (
//         <div className="flex items-center gap-2">
//           <Calendar size={16} className="text-blue-500" />
//           {new Date(row.date_vente).toLocaleDateString()}
//         </div>
//       ),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Produit",
//       selector: row => (
//         <div className="flex items-center">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mr-3 shadow-sm border border-gray-200">
//             <Package size={16} className="text-blue-600" />
//           </div>
//           <div>
//             <div className="font-semibold text-gray-900">{row.produit.categorieNom}</div>
//             <div className="text-xs text-gray-500">Qté: {row.quantite}</div>
//           </div>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Client",
//       selector: row => (
//         <div className="flex items-center">
//           <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-2 shadow-sm border border-gray-200">
//             <Users size={14} className="text-purple-600" />
//           </div>
//           <span className="text-gray-700">{row.utilisateur.nomComplet}</span>
//         </div>
//       ),
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "Prix Unitaire",
//       selector: row => (
//         <div className="flex items-center gap-1 text-green-600 font-semibold">
//           <DollarSign size={14} />
//           {row.prix_unitaire}
//         </div>
//       ),
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Montant Total",
//       selector: row => (
//         <div className="flex items-center gap-1 text-blue-600 font-bold">
//           <CreditCard size={14} />
//           {row.montant_total}
//         </div>
//       ),
//       sortable: true,
//       width: "130px",
//     },
//     {
//       name: "Actions",
//       cell: row => (
//         <button
//           onClick={() => openModal(row, "afficher")}
//           className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1"
//           title="Voir détails"
//         >
//           <Eye size={16} />
//           Détails
//         </button>
//       ),
//     },
//   ];

//   // 🔹 Stats
//   const stats = {
//     total: ventes.length,
//     totalAmount: ventes.reduce((sum, v) => sum + v.montant_total, 0),
//     todaySales: ventes.filter(v => new Date(v.date_vente).toDateString() === new Date().toDateString()).length,
//     weekSales: ventes.filter(v => new Date(v.date_vente) >= new Date(new Date().setDate(new Date().getDate() - 7))).length,
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8 border border-gray-100">
//       {notification.show && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification({ show: false, type: "", message: "" })}
//         />
//       )}

//       {/* Header stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         {/* Total Ventes */}
//         <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-blue-800">{stats.total}</h3>
//               <p className="text-sm text-blue-600">Total Ventes</p>
//             </div>
//             <div className="p-3 bg-blue-200 rounded-full">
//               <Receipt className="text-blue-700" size={20} />
//             </div>
//           </div>
//         </div>

//         {/* Chiffre d'affaires */}
//         <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-green-800">€{stats.totalAmount.toFixed(2)}</h3>
//               <p className="text-sm text-green-600">Chiffre d'affaires</p>
//             </div>
//             <div className="p-3 bg-green-200 rounded-full">
//               <DollarSign className="text-green-700" size={20} />
//             </div>
//           </div>
//         </div>

//         {/* Ventes aujourd'hui */}
//         <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-purple-800">{stats.todaySales}</h3>
//               <p className="text-sm text-purple-600">Ventes Aujourd'hui</p>
//             </div>
//             <div className="p-3 bg-purple-200 rounded-full">
//               <TrendingUp className="text-purple-700" size={20} />
//             </div>
//           </div>
//         </div>

//         {/* Ventes semaine */}
//         <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold text-orange-800">{stats.weekSales}</h3>
//               <p className="text-sm text-orange-600">Ventes 7 derniers jours</p>
//             </div>
//             <div className="p-3 bg-orange-200 rounded-full">
//               <BarChart3 className="text-orange-700" size={20} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recherche, filtre et export */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//           <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
//           Historique des Ventes
//           <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//             {filteredVentes.length} ventes
//           </span>
//         </h2>

//         <div className="flex flex-wrap gap-3">
//           {/* Search */}
//           <div className="relative flex-1 min-w-[250px]">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Rechercher une vente..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm"
//             />
//           </div>

//           {/* Filter */}
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <select
//               value={filterDate}
//               onChange={(e) => setFilterDate(e.target.value)}
//               className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//             >
//               <option value="all">Tous</option>
//               <option value="today">Aujourd'hui</option>
//               <option value="week">Cette semaine</option>
//               <option value="month">Ce mois</option>
//             </select>
//           </div>

//           {/* Export */}
//           <button
//             onClick={handleExport}
//             disabled={exporting}
//             className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
//           >
//             <Download size={18} />
//             {exporting ? "Export..." : "Exporter CSV"}
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       {loading ? (
//         Array.from({ length: 6 }).map((_, idx) => <SkeletonRow key={idx} />)
//       ) : (
//         <DataTable
//           columns={columns}
//           data={filteredVentes}
//           pagination
//           highlightOnHover
//           pointerOnHover
//           responsive
//           striped
//           defaultSortFieldId={1}
//         />
//       )}

//       {/* Modal */}
//       <Modal
//         isOpen={!!selectedVente}
//         onClose={closeModal}
//         title={modalType === "afficher" ? "Détails Vente" : ""}
//         size="md"
//       >
//         {selectedVente && (
//           <div className="space-y-4">
//             <p>
//               <strong>Date :</strong> {new Date(selectedVente.date_vente).toLocaleString()}
//             </p>
//             <p>
//               <strong>Produit :</strong> {selectedVente.produit?.categorieNom || "N/A"}
//             </p>
//             <p>
//               <strong>Client :</strong> {selectedVente.utilisateur?.nomComplet || "N/A"} (
//               {selectedVente.utilisateur?.email || "N/A"})
//             </p>
//             <p>
//               <strong>Quantité :</strong> {selectedVente.quantite}
//             </p>
//             <p>
//               <strong>Prix Unitaire :</strong> {selectedVente.prix_unitaire}
//             </p>
//             <p>
//               <strong>Montant Total :</strong> {selectedVente.montant_total}
//             </p>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default ListeVents;



import React, { useState, useEffect } from "react";
import axios from "axios";
const token = localStorage.getItem("token");
import DataTable from "react-data-table-component";
import {
  Eye,
  Search,
  Filter,
  Download,
  X,
  Calendar,
  DollarSign,
  Package,
  BarChart3,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  CreditCard,
  Receipt,
  Edit,
  Trash2,
  RefreshCw
} from "lucide-react";

// 🔹 Notification élégante
const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
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
        <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// 🔹 Modal Premium
const Modal = ({ isOpen, onClose, children, title, size = "md" }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl", xl: "max-w-6xl" };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 backdrop-blur-md transition-all duration-300">
      <div
        className={`bg-white rounded-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-95 animate-in fade-in-90 zoom-in-90`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">{children}</div>
      </div>
    </div>
  );
};

// 🔹 Skeleton pour chargement
const SkeletonRow = () => (
  <div className="flex items-center p-4 space-x-4 border-b border-gray-100 animate-pulse">
    <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
    <div className="flex-1 space-y-3">
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
    </div>
    <div className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
  </div>
);

const ListeVents = () => {
  const [ventes, setVentes] = useState([]);
  const [filteredVentes, setFilteredVentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVente, setSelectedVente] = useState(null);
  const [modalType, setModalType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [exporting, setExporting] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });
  const [actionLoading, setActionLoading] = useState(false);

  // 🔹 Récupération ventes sécurisée
  const fetchVentes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4999/api/allroute/getAllVente", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const safeVentes = (res.data.ventes || []).map(v => ({
        ...v,
        produit: v.produit || { categorieNom: "N/A" },
        utilisateur: v.utilisateur || { nomComplet: "N/A", email: "N/A" },
      }));

      setVentes(safeVentes);
      setFilteredVentes(safeVentes);
    } catch (error) {
      console.error("Erreur récupération ventes :", error);
      showNotification("error", "Erreur lors du chargement des ventes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVentes();
  }, []);

  // 🔹 Filtrage
  useEffect(() => {
    let results = ventes;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        v =>
          v.produit?.categorieNom.toLowerCase().includes(term) ||
          v.utilisateur?.nomComplet.toLowerCase().includes(term) ||
          v.quantite.toString().includes(term) ||
          v.montant_total.toString().includes(term)
      );
    }

    if (filterDate === "today") {
      const today = new Date().toDateString();
      results = results.filter(v => new Date(v.date_vente).toDateString() === today);
    } else if (filterDate === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      results = results.filter(v => new Date(v.date_vente) >= oneWeekAgo);
    } else if (filterDate === "month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      results = results.filter(v => new Date(v.date_vente) >= oneMonthAgo);
    }

    setFilteredVentes(results);
  }, [searchTerm, filterDate, ventes]);

  const showNotification = (type, message) => setNotification({ show: true, type, message });
  const openModal = (vente, type) => { setSelectedVente(vente); setModalType(type); };
  const closeModal = () => { setSelectedVente(null); setModalType(""); };

  // 🔹 Actions: Supprimer une vente
  const handleDeleteVente = async (venteId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette vente ?")) return;
    
    setActionLoading(true);
    try {
      await axios.delete(`http://localhost:4999/api/allroute/deleteVente/${venteId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      
      showNotification("success", "Vente supprimée avec succès !");
      fetchVentes(); // Recharger la liste
    } catch (error) {
      console.error("Erreur suppression vente :", error);
      showNotification("error", "Erreur lors de la suppression de la vente");
    } finally {
      setActionLoading(false);
    }
  };

  // 🔹 Actions: Modifier une vente
  const handleEditVente = (vente) => {
    openModal(vente, "modifier");
  };

  // 🔹 Export CSV
  const handleExport = async () => {
    setExporting(true);
    try {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "Date,Produit,Client,Quantité,Prix Unitaire,Montant Total\n" +
        ventes
          .map(
            v =>
              `"${new Date(v.date_vente).toLocaleDateString()}","${v.produit.categorieNom}","${v.utilisateur.nomComplet}",${v.quantite},${v.prix_unitaire},${v.montant_total}`
          )
          .join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "ventes_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showNotification("success", "Exportation réussie !");
    } catch (error) {
      console.error("Erreur export :", error);
      showNotification("error", "Erreur lors de l'exportation.");
    }
    setExporting(false);
  };

  // 🔹 Colonnes DataTable avec boutons d'action
  const columns = [
    {
      name: "Date",
      selector: row => (
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-blue-500" />
          {new Date(row.date_vente).toLocaleDateString()}
        </div>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "Produit",
      selector: row => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mr-3 shadow-sm border border-gray-200">
            <Package size={16} className="text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{row.produitNom || row.produit?.categorieNom || "N/A"}</div>
            <div className="text-xs text-gray-500">{row.produitDescription || "Sans description"}</div>
            <div className="text-xs text-gray-500">Qté: {row.quantite}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Client",
      selector: row => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-2 shadow-sm border border-gray-200">
            <Users size={14} className="text-purple-600" />
          </div>
          <span className="text-gray-700">{row.utilisateurNom || row.utilisateur?.nomComplet || "N/A"}</span>
        </div>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Prix Unitaire",
      selector: row => (
        <div className="flex items-center gap-1 text-green-600 font-semibold">
          <DollarSign size={14} />
          {row.prix_unitaire?.toLocaleString()} €
        </div>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "Montant Total",
      selector: row => (
        <div className="flex items-center gap-1 text-blue-600 font-bold">
          <CreditCard size={14} />
          {row.montantT?.toLocaleString()} €
        </div>
      ),
      sortable: true,
      width: "130px",
    },
    {
      name: "Actions",
      cell: row => (
        <div className="flex gap-2">
          {/* Bouton Afficher */}
          <button
            onClick={() => openModal(row, "afficher")}
            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1"
            title="Voir détails"
          >
            <Eye size={16} />
          </button>

          {/* Bouton Modifier */}
          <button
            onClick={() => handleEditVente(row)}
            className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1"
            title="Modifier"
          >
            <Edit size={16} />
          </button>

          {/* Bouton Supprimer */}
          <button
            onClick={() => handleDeleteVente(row._id)}
            disabled={actionLoading}
            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1"
            title="Supprimer"
          >
            {actionLoading ? <RefreshCw size={16} className="animate-spin" /> : <Trash2 size={16} />}
          </button>
        </div>
      ),
      width: "140px",
    },
  ];

  // 🔹 Stats
  const stats = {
    total: ventes.length,
    totalAmount: ventes.reduce((sum, v) => sum + (v.montantT || 0), 0),
    todaySales: ventes.filter(v => new Date(v.date_vente).toDateString() === new Date().toDateString()).length,
    weekSales: ventes.filter(v => new Date(v.date_vente) >= new Date(new Date().setDate(new Date().getDate() - 7))).length,
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8 border border-gray-100">
      {notification.show && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification({ show: false, type: "", message: "" })}
        />
      )}

      {/* Header stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Total Ventes */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-blue-800">{stats.total}</h3>
              <p className="text-sm text-blue-600">Total Ventes</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <Receipt className="text-blue-700" size={20} />
            </div>
          </div>
        </div>

        {/* Chiffre d'affaires */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-green-800">€{stats.totalAmount.toLocaleString()}</h3>
              <p className="text-sm text-green-600">Chiffre d'affaires</p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <DollarSign className="text-green-700" size={20} />
            </div>
          </div>
        </div>

        {/* Ventes aujourd'hui */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-purple-800">{stats.todaySales}</h3>
              <p className="text-sm text-purple-600">Ventes Aujourd'hui</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <TrendingUp className="text-purple-700" size={20} />
            </div>
          </div>
        </div>

        {/* Ventes semaine */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-orange-800">{stats.weekSales}</h3>
              <p className="text-sm text-orange-600">Ventes 7 derniers jours</p>
            </div>
            <div className="p-3 bg-orange-200 rounded-full">
              <BarChart3 className="text-orange-700" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Recherche, filtre et export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
          Historique des Ventes
          <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {filteredVentes.length} ventes
          </span>
        </h2>

        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher une vente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            >
              <option value="all">Tous</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
            </select>
          </div>

          {/* Export */}
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Download size={18} />
            {exporting ? "Export..." : "Exporter CSV"}
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        Array.from({ length: 6 }).map((_, idx) => <SkeletonRow key={idx} />)
      ) : (
        <DataTable
          columns={columns}
          data={filteredVentes}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          striped
          defaultSortFieldId={1}
        />
      )}

      {/* Modal pour afficher les détails */}
      <Modal
        isOpen={!!selectedVente && modalType === "afficher"}
        onClose={closeModal}
        title="Détails de la Vente"
        size="md"
      >
        {selectedVente && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Produit</p>
                <p className="font-semibold">{selectedVente.produitNom || "N/A"}</p>
                <p className="text-sm text-gray-500">{selectedVente.produitDescription || "Sans description"}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Personnel</p>
                <p className="font-semibold">{selectedVente.utilisateurNom || "N/A"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-600">Quantité</p>
                <p className="font-semibold text-blue-800">{selectedVente.quantite}</p>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-600">Prix Unitaire</p>
                <p className="font-semibold text-green-800">{selectedVente.prix_unitaire?.toLocaleString()} €</p>
              </div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm text-purple-600">Montant Total</p>
              <p className="font-bold text-purple-800 text-xl">{selectedVente.montantT?.toLocaleString()} €</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Date de vente</p>
              <p className="font-semibold">{new Date(selectedVente.date_vente).toLocaleString()}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal pour modifier (à implémenter) */}
      <Modal
        isOpen={!!selectedVente && modalType === "modifier"}
        onClose={closeModal}
        title="Modifier la Vente"
        size="lg"
      >
        {selectedVente && (
          <div className="space-y-4">
            <p className="text-center text-gray-500">Fonctionnalité de modification à implémenter</p>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 text-sm">
                La modification des ventes sera disponible dans une prochaine version.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ListeVents;
