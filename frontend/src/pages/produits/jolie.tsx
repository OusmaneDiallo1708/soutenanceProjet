import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Eye, Pencil, Trash2 } from "lucide-react";

const ListeProduits = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await axios.get("http://localhost:4999/api/allroute/getAllProduit");
        setProduits(res.data.produit || []);
        setLoading(false);
      } catch (error) {
        console.error("Erreur récupération produits :", error);
        setLoading(false);
      }
    };
    fetchProduits();
  }, []);

  // ✅ Colonnes avec style + actions
  const columns = [
    {
      name: "Nom catégorie",
      selector: (row) => row.categorieNom,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.categorieDescription,
      sortable: true,
    },
    // {
    //   name: "Quantité",
    //   selector: (row) => row.quantite,
    //   sortable: true,
    // },
    // {
    //   name: "Prix Achat",
    //   selector: (row) => row.prixAchat,
    //   sortable: true,
    // },
    {
      name: "Prix Vente",
      selector: (row) => row.prixVente,
      sortable: true,
    },
    {
      name: "Stock Min",
      selector: (row) => row.stock_min,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Date ajout",
      selector: (row) => new Date(row.date_ajout).toLocaleDateString(),
      sortable: true,
    },
    // {
    //   name: "Date expiration",
    //   selector: (row) => new Date(row.date_expiration).toLocaleDateString(),
    //   sortable: true,
    // },
    {
      name: "Image",
      selector: (row) =>
        row.image ? (
          <img
            src={`http://localhost:4999/${row.image}`}
            alt="Produit"
            className="w-12 h-12 object-cover rounded-lg shadow"
          />
        ) : (
          <span className="text-gray-400 italic">Pas d'image</span>
        ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          {/* Afficher */}
          <button
            onClick={() => alert(`Afficher ${row.categorieNom}`)}
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          >
            <Eye size={18} />
          </button>
          {/* Modifier */}
          <button
            onClick={() => alert(`Modifier ${row.categorieNom}`)}
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
          >
            <Pencil size={18} />
          </button>
          {/* Supprimer */}
          <button
            onClick={() => alert(`Supprimer ${row._id}`)}
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        📋 Liste des Produits
      </h2>

      <DataTable
        columns={columns}
        data={produits}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={{
          headCells: {
            style: {
              backgroundColor: "#f9fafb",
              fontWeight: "bold",
              fontSize: "14px",
              color: "#374151",
            },
          },
          rows: {
            style: {
              fontSize: "14px",
              color: "#1f2937",
            },
          },
        }}
      />
    </div>
  );
};

export default ListeProduits;
