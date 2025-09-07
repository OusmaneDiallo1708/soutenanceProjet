import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Eye, Pencil, Trash2, Search, Filter, X, Download, Plus } from "lucide-react";

// 🔹 Modal amélioré avec animations
const Modal = ({ isOpen, onClose, children, title }) => {
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
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl transform transition-transform duration-300 scale-95 animate-in fade-in-90 zoom-in-90"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
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

// 🔹 Squelette de chargement amélioré
const SkeletonRow = () => (
  <div className="flex items-center p-4 space-x-4 border-b border-gray-100 animate-pulse">
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
    </div>
    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
  </div>
);

const ListeProduits = () => {
  const [produits, setProduits] = useState([]);
  const [filteredProduits, setFilteredProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [modalType, setModalType] = useState("");
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStock, setFilterStock] = useState("all");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4999/api/allroute/getAllProduit"
        );
        setProduits(res.data.produit || []);
        setFilteredProduits(res.data.produit || []);
        setLoading(false);
      } catch (error) {
        console.error("Erreur récupération produits :", error);
        setLoading(false);
      }
    };
    fetchProduits();
  }, []);

  // Filtrage des produits
  useEffect(() => {
    let results = produits;
    
    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        p => 
          p.categorieNom.toLowerCase().includes(term) ||
          p.categorieDescription.toLowerCase().includes(term) ||
          p.prixVente.toString().includes(term)
      );
    }
    
    // Filtre par stock
    if (filterStock === "low") {
      results = results.filter(p => p.quantite <= p.stock_min);
    } else if (filterStock === "out") {
      results = results.filter(p => p.quantite === 0);
    }
    
    setFilteredProduits(results);
  }, [searchTerm, filterStock, produits]);

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;
    
    try {
      await axios.delete(
        `http://localhost:4999/api/allroute/deleteProduit/${id}`
      );
      setProduits(produits.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Erreur suppression :", error);
      alert("❌ Impossible de supprimer le produit.");
    }
  };

  const openModal = (produit, type) => {
    setSelectedProduit(produit);
    setModalType(type);
    if (type === "modifier") {
      setEditData({
        quantite: produit.quantite,
        prixAchat: produit.prixAchat,
        prixVente: produit.prixVente,
        stock_min: produit.stock_min,
        date_ajout: produit.date_ajout.slice(0, 10),
        date_expiration: produit.date_expiration.slice(0, 10),
      });
    }
  };

  const closeModal = () => {
    setSelectedProduit(null);
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
        `http://localhost:4999/api/allroute/updateProduit/${selectedProduit._id}`,
        editData
      );
      setProduits(
        produits.map((p) => (p._id === selectedProduit._id ? res.data.produit : p))
      );
      closeModal();
    } catch (error) {
      console.error("Erreur modification :", error);
      alert("❌ Impossible de modifier le produit.");
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      // Simuler un téléchargement
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Nom,Description,Quantité,Prix Achat,Prix Vente,Stock Min,Date Ajout,Date Expiration\n"
        + produits.map(p => 
            `"${p.categorieNom}","${p.categorieDescription}",${p.quantite},${p.prixAchat},${p.prixVente},${p.stock_min},"${new Date(p.date_ajout).toLocaleDateString()}","${new Date(p.date_expiration).toLocaleDateString()}"`
          ).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "produits_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur export :", error);
    }
    setExporting(false);
  };

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f8fafc',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '2px solid #e2e8f0',
      },
    },
    rows: {
      style: {
        fontSize: '0.9rem',
        padding: '16px 8px',
        '&:not(:last-of-type)': {
          borderBottom: '1px solid #f1f5f9',
        },
        '&:hover': {
          backgroundColor: '#f8fafc',
        },
      },
      highlightOnHoverStyle: {
        backgroundColor: '#f1f5f9',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
      },
    },
  };

  const columns = [
    {
      name: "Produit",
      selector: (row) => (
        <div className="flex items-center">
          {row.image ? (
            <img
              src={`http://localhost:4999${row.image}`}
              alt="Produit"
              className="w-10 h-10 object-cover rounded-lg shadow-sm mr-3"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <span className="text-blue-600 text-xs font-bold">N/A</span>
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900">{row.categorieNom}</div>
            <div className="text-xs text-gray-500 truncate max-w-xs">{row.categorieDescription}</div>
          </div>
        </div>
      ),
      sortable: true,
      minWidth: "250px",
      grow: 2,
    },
    {
      name: "Stock",
      selector: (row) => (
        <div className="flex flex-col">
          <span className={`font-semibold ${
            row.quantite === 0 ? 'text-red-600' : 
            row.quantite <= row.stock_min ? 'text-amber-600' : 'text-green-600'
          }`}>
            {row.quantite} unités
          </span>
          <span className="text-xs text-gray-500">Min: {row.stock_min}</span>
        </div>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "Prix",
      selector: (row) => (
        <div className="flex flex-col">
          <span className="text-gray-900 font-medium">€{row.prixVente}</span>
          <span className="text-xs text-gray-500">Achat: €{row.prixAchat}</span>
        </div>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "Dates",
      selector: (row) => (
        <div className="flex flex-col">
          <span className="text-xs">Ajout: {new Date(row.date_ajout).toLocaleDateString()}</span>
          <span className={`text-xs ${
            new Date(row.date_expiration) < new Date() ? 'text-red-600 font-semibold' : 'text-gray-500'
          }`}>
            Exp: {new Date(row.date_expiration).toLocaleDateString()}
          </span>
        </div>
      ),
      sortable: true,
      width: "140px",
    },
    {
      name: "Statut",
      selector: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.quantite === 0 
            ? 'bg-red-100 text-red-800' 
            : row.quantite <= row.stock_min 
            ? 'bg-amber-100 text-amber-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {row.quantite === 0 ? 'Rupture' : row.quantite <= row.stock_min ? 'Stock bas' : 'Disponible'}
        </span>
      ),
      sortable: true,
      width: "110px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openModal(row, "afficher")}
            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md"
            title="Voir détails"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => openModal(row, "modifier")}
            className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-all duration-200 shadow-sm hover:shadow-md"
            title="Modifier"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 shadow-sm hover:shadow-md"
            title="Supprimer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "140px",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3"></div>
          Inventaire des Produits
          <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {filteredProduits.length} produits
          </span>
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          
          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tous les stocks</option>
            <option value="low">Stock faible</option>
            <option value="out">Rupture</option>
          </select>
          
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
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
        data={filteredProduits}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 20, 50]}
        highlightOnHover
        pointerOnHover
        responsive
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
          <div className="py-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        }
      />

      {/* Modal d'affichage */}
      <Modal isOpen={modalType === "afficher"} onClose={closeModal} title="Détails du produit">
        {selectedProduit && (
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              {selectedProduit.image ? (
                <img 
                  src={`http://localhost:4999${selectedProduit.image}`} 
                  alt="Produit" 
                  className="w-32 h-32 object-cover rounded-xl shadow-md" 
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-blue-600 font-bold">Aucune image</span>
                </div>
              )}
              
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedProduit.categorieNom}</h4>
                <p className="text-gray-600 mb-4">{selectedProduit.categorieDescription}</p>
                
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedProduit.quantite === 0 
                    ? 'bg-red-100 text-red-800' 
                    : selectedProduit.quantite <= selectedProduit.stock_min 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {selectedProduit.quantite === 0 ? 'Rupture de stock' : 
                   selectedProduit.quantite <= selectedProduit.stock_min ? 'Stock faible' : 'En stock'}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <h5 className="font-semibold text-gray-700">Informations de stock</h5>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantité:</span>
                  <span className="font-medium">{selectedProduit.quantite} unités</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock minimum:</span>
                  <span className="font-medium">{selectedProduit.stock_min} unités</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-semibold text-gray-700">Informations de prix</h5>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix d'achat:</span>
                  <span className="font-medium">€{selectedProduit.prixAchat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix de vente:</span>
                  <span className="font-medium">€{selectedProduit.prixVente}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-semibold text-gray-700">Dates importantes</h5>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date d'ajout:</span>
                  <span className="font-medium">{new Date(selectedProduit.date_ajout).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date d'expiration:</span>
                  <span className={`font-medium ${
                    new Date(selectedProduit.date_expiration) < new Date() ? 'text-red-600' : ''
                  }`}>
                    {new Date(selectedProduit.date_expiration).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de modification */}
      <Modal isOpen={modalType === "modifier"} onClose={closeModal} title="Modifier le produit">
        {selectedProduit && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                <input
                  type="number"
                  name="quantite"
                  value={editData.quantite}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix d'achat (€)</label>
                <input
                  type="number"
                  name="prixAchat"
                  step="0.01"
                  value={editData.prixAchat}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix de vente (€)</label>
                <input
                  type="number"
                  name="prixVente"
                  step="0.01"
                  value={editData.prixVente}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock minimum</label>
                <input
                  type="number"
                  name="stock_min"
                  value={editData.stock_min}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'ajout</label>
                <input
                  type="date"
                  name="date_ajout"
                  value={editData.date_ajout}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                <input
                  type="date"
                  name="date_expiration"
                  value={editData.date_expiration}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
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

export default ListeProduits;