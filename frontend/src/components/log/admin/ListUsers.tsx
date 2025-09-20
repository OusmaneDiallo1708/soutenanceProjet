

import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { 
  Eye, Edit, Trash2, Search, Filter, Download, 
  ChevronDown, X, AlertCircle, User, Mail, 
  Phone, Shield, CheckCircle, XCircle, Calendar,
  UserPlus, RefreshCw, Image, ImageOff
} from "lucide-react";

// 🔹 Notification élégante
const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 animate-in slide-in-from-right-10`}>
      <div className={`flex items-center p-4 rounded-lg shadow-lg border-l-4 ${
        type === "success" 
          ? "bg-green-50 border-green-500 text-green-700" 
          : "bg-red-50 border-red-500 text-red-700"
      }`}>
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
          className="ml-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// 🔹 Modal Premium avec animations
const Modal = ({ isOpen, onClose, children, title, size = "md" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl"
  };
  
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// 🔹 Squelette de chargement premium
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

// 🔹 Badge de rôle avec style premium
const RoleBadge = ({ role }) => {
  const getRoleConfig = (role) => {
    switch (role) {
      case 'superAdmin':
        return { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: <Shield size={12} /> };
      case 'admin':
        return { color: 'bg-red-100 text-red-800 border-red-200', icon: <Shield size={12} /> };
      case 'employé':
        return { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: <User size={12} /> };
      default:
        return { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: <User size={12} /> };
    }
  };

  const config = getRoleConfig(role);

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color} border flex items-center gap-1`}>
      {config.icon}
      {role}
    </span>
  );
};

// 🔹 Composant d'image avec gestion d'erreur améliorée
const UserAvatar = ({ photo, nomComplet, className = "w-12 h-12" }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  // Vérifier si l'URL de l'image est valide
  const isValidImageUrl = (url) => {
    return url && url.startsWith('/uploads/');
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (imageError || !isValidImageUrl(photo)) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center shadow-sm border border-gray-200`}>
        <User size={20} className="text-blue-600" />
      </div>
    );
  }

  return (
    <>
      {imageLoading && (
        <div className={`${className} bg-gray-200 rounded-xl animate-pulse`}></div>
      )}
      <img
        src={`http://localhost:4999${photo}`}
        alt={nomComplet}
        className={`${className} object-cover rounded-xl shadow-sm border border-gray-200 ${imageLoading ? 'hidden' : 'block'}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </>
  );
};

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState("");
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [exporting, setExporting] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4999/api/utilisateur/getAllUtilisateurs");
        console.log("Réponse API:", response.data);
        
        // Nettoyer les données et s'assurer que chaque utilisateur a une propriété photo valide
        const cleanedUsers = (response.data.utilisateur || []).map(user => ({
          ...user,
          photo: user.photo && user.photo.startsWith('/uploads/') ? user.photo : null
        }));
        
        setUsers(cleanedUsers);
        setFilteredUsers(cleanedUsers);
      } catch (apiError) {
        console.error("Erreur API, utilisation de données simulées:", apiError);
        // Données simulées pour le développement
        const mockUsers = [
          {
            _id: "1",
            nomComplet: "Jean Dupont",
            email: "jean.dupont@example.com",
            telephone: "0123456789",
            genre: "Homme",
            role: "admin",
            photo: "/uploads/user/avatar1.jpg",
            createdAt: new Date().toISOString()
          },
          {
            _id: "2",
            nomComplet: "Marie Martin",
            email: "marie.martin@example.com",
            telephone: "0987654321",
            genre: "Femme",
            role: "employé",
            photo: "/uploads/user/avatar2.jpg",
            createdAt: new Date().toISOString()
          },
          {
            _id: "3",
            nomComplet: "Pierre Durand",
            email: "pierre.durand@example.com",
            telephone: "0654321098",
            genre: "Homme",
            role: "visiteur",
            photo: null,
            createdAt: new Date().toISOString()
          }
        ];
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      }
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      showNotification("error", "Erreur lors du chargement des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  // Filtrage des utilisateurs
  useEffect(() => {
    let results = users;
    
    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        user => 
          user.nomComplet.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          (user.telephone && user.telephone.toLowerCase().includes(term))
      );
    }
    
    // Filtre par rôle
    if (filterRole !== "all") {
      results = results.filter(user => user.role === filterRole);
    }
    
    setFilteredUsers(results);
  }, [searchTerm, filterRole, users]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;
    
    try {
      await axios.delete(`http://localhost:4999/api/utilisateur/supprimerUnUtilisateur/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      showNotification("success", "Utilisateur supprimé avec succès !");
    } catch (error) {
      console.error("Erreur suppression :", error);
      showNotification("error", "Impossible de supprimer l'utilisateur.");
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedRows.length} utilisateurs ?`)) return;
    
    try {
      for (const row of selectedRows) {
        await axios.delete(`http://localhost:4999/api/utilisateur/supprimerUnUtilisateur/${row._id}`);
      }
      setUsers(users.filter((user) => !selectedRows.some(r => r._id === user._id)));
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      showNotification("success", `${selectedRows.length} utilisateur(s) supprimé(s) avec succès !`);
    } catch (error) {
      console.error("Erreur suppression multiple :", error);
      showNotification("error", "Impossible de supprimer les utilisateurs sélectionnés.");
    }
  };

  const openModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    if (type === "modifier") {
      setEditData({
        nomComplet: user.nomComplet,
        email: user.email,
        telephone: user.telephone,
        genre: user.genre,
        role: user.role,
      });
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType("");
    setEditData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4999/api/utilisateur/modifierUnUtilisateur/${selectedUser._id}`,
        editData
      );
      setUsers(
        users.map((user) => (user._id === selectedUser._id ? res.data.utilisateur : user))
      );
      closeModal();
      showNotification("success", "Utilisateur modifié avec succès !");
    } catch (error) {
      console.error("Erreur modification :", error);
      showNotification("error", "Impossible de modifier l'utilisateur.");
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      // Simuler un téléchargement
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Nom Complet,Email,Téléphone,Genre,Rôle,Date Création\n"
        + users.map(user => 
            `"${user.nomComplet}","${user.email}","${user.telephone || 'Non renseigné'}","${user.genre || 'Non spécifié'}","${user.role}","${new Date(user.createdAt || Date.now()).toLocaleDateString()}"`
          ).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "utilisateurs_export.csv");
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

  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    return (
      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
        <span>{selectedRows.length} utilisateur(s) sélectionné(s)</span>
        <button 
          onClick={handleBulkDelete}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm transition-colors"
        >
          <Trash2 size={14} />
          Supprimer
        </button>
      </div>
    );
  }, [selectedRows, toggleCleared, users]);

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f8fafc',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '2px solid #e2e8f0',
        color: '#64748b',
      },
    },
    headCells: {
      style: {
        paddingLeft: '12px',
        paddingRight: '12px',
      },
    },
    rows: {
      style: {
        fontSize: '0.9rem',
        padding: '12px 8px',
        '&:not(:last-of-type)': {
          borderBottom: '1px solid #f1f5f9',
        },
        '&:hover': {
          backgroundColor: '#f8fafc',
        },
      },
      highlightOnHoverStyle: {
        backgroundColor: '#f1f5f9',
        borderBottomColor: '#e2e8f0',
      },
    },
    cells: {
      style: {
        paddingLeft: '12px',
        paddingRight: '12px',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        color: '#64748b',
      },
    },
    contextMenu: {
      style: {
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    },
  };

  const columns = [
    {
      name: "Utilisateur",
      selector: (row) => (
        <div className="flex items-center">
          <UserAvatar photo={row.photo} nomComplet={row.nomComplet} className="w-12 h-12" />
          <div className="ml-3">
            <div className="font-semibold text-gray-900">{row.nomComplet}</div>
            <div className="text-xs text-gray-500 capitalize">{row.genre || 'Non spécifié'}</div>
          </div>
        </div>
      ),
      sortable: true,
      minWidth: "250px",
      grow: 2,
    },
    {
      name: "Contact",
      selector: (row) => (
        <div className="flex flex-col">
          <span className="text-gray-900 font-medium flex items-center gap-1">
            <Mail size={14} className="text-blue-500" />
            {row.email}
          </span>
          {row.telephone && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Phone size={12} className="text-green-500" />
              {row.telephone}
            </span>
          )}
        </div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Rôle",
      selector: (row) => <RoleBadge role={row.role} />,
      sortable: true,
      width: "120px",
      center: true,
    },
    {
      name: "Date de création",
      selector: (row) => (
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Calendar size={12} className="text-gray-400" />
          {new Date(row.createdAt || Date.now()).toLocaleDateString()}
        </div>
      ),
      sortable: true,
      width: "140px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openModal(row, "afficher")}
            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1"
            title="Voir détails"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => openModal(row, "modifier")}
            className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1"
            title="Modifier"
          >
            <Edit size={16} />
            <span className="text-xs">Modifier</span>
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1"
            title="Supprimer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "220px",
    },
  ];

  // Statistiques pour le header
  const stats = {
    total: users.length,
    superAdmin: users.filter(u => u.role === 'superAdmin').length,
    admin: users.filter(u => u.role === 'admin').length,
    employe: users.filter(u => u.role === 'employé').length,
    visiteur: users.filter(u => u.role === 'visiteur').length
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

      {/* Header avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-blue-800">{stats.total}</h3>
              <p className="text-sm text-blue-600">Total Utilisateurs</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <User className="text-blue-700" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-purple-800">{stats.superAdmin}</h3>
              <p className="text-sm text-purple-600">Super Admin</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <Shield className="text-purple-700" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-red-800">{stats.admin}</h3>
              <p className="text-sm text-red-600">Administrateurs</p>
            </div>
            <div className="p-3 bg-red-200 rounded-full">
              <Shield className="text-red-700" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-green-800">{stats.employe + stats.visiteur}</h3>
              <p className="text-sm text-green-600">Utilisateurs</p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <User className="text-green-700" size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
          Gestion des Utilisateurs
          <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {filteredUsers.length} utilisateurs
          </span>
        </h2>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none shadow-sm"
            >
              <option value="all">Tous les rôles</option>
              <option value="superAdmin">Super Admin</option>
              <option value="admin">Administrateur</option>
              <option value="employé">Employé</option>
              <option value="visiteur">Visiteur</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
          
          <button
            onClick={handleExport}
            disabled={exporting || users.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {exporting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Download size={16} />
            )}
            Exporter
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 20, 50]}
        highlightOnHover
        pointerOnHover
        responsive
        selectableRows
        selectableRowsHighlight
        onSelectedRowsChange={handleRowSelected}
        contextActions={contextActions}
        clearSelectedRows={toggleCleared}
        progressPending={loading}
        progressComponent={
          <div className="space-y-3 py-8">
            {[...Array(5)].map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        }
        customStyles={customStyles}
        noDataComponent={
          <div className="py-16 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun utilisateur trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche ou de filtrage</p>
          </div>
        }
      />

      {/* Modal d'affichage */}
      <Modal isOpen={modalType === "afficher"} onClose={closeModal} title="Détails de l'utilisateur" size="lg">
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <UserAvatar photo={selectedUser.photo} nomComplet={selectedUser.nomComplet} className="w-40 h-40" />
              
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedUser.nomComplet}</h4>
                <p className="text-gray-600 mb-4">{selectedUser.email}</p>
                
                <div className="flex items-center gap-2">
                  <RoleBadge role={selectedUser.role} />
                  <span className="text-sm text-gray-500 capitalize">
                    {selectedUser.genre || 'Non spécifié'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                  <User size={18} className="text-blue-500" />
                  Informations personnelles
                </h5>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nom complet:</span>
                  <span className="font-medium">{selectedUser.nomComplet}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Genre:</span>
                  <span className="font-medium capitalize">{selectedUser.genre || 'Non spécifié'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rôle:</span>
                  <span className="font-medium">
                    <RoleBadge role={selectedUser.role} />
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                  <Mail size={18} className="text-green-500" />
                  Coordonnées
                </h5>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Téléphone:</span>
                  <span className="font-medium">{selectedUser.telephone || 'Non renseigné'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date de création:</span>
                  <span className="font-medium">
                    {new Date(selectedUser.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de modification */}
      <Modal isOpen={modalType === "modifier"} onClose={closeModal} title="Modifier l'utilisateur" size="md">
        {selectedUser && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  name="nomComplet"
                  value={editData.nomComplet}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={editData.telephone}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                <select
                  name="genre"
                  value={editData.genre}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionnez un genre</option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                <select
                  name="role"
                  value={editData.role}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="visiteur">Visiteur</option>
                  <option value="employé">Employé</option>
                  <option value="admin">Administrateur</option>
                  <option value="superAdmin">Super Admin</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Enregistrer les modifications
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ListUsers;


