import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const ListeProduits = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Charger les produits depuis le backend
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

  // 🔹 Définir les colonnes de la DataTable
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
    {
      name: "Quantité",
      selector: (row) => row.quantite,
      sortable: true,
    },
    {
      name: "Prix Achat",
      selector: (row) => row.prixAchat,
      sortable: true,
    },
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
    {
      name: "Date expiration",
      selector: (row) => new Date(row.date_expiration).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) =>
        row.image ? <img src={`http://localhost:4999/uploads/${row.image}`} alt="Produit" width="50" /> : "Pas d'image",
    },
    {
      name: "Image",
      selector: (row) =>
        row.image ? <img src={`http://localhost:4999/uploads/${row.image}`} alt="Produit" width="50" /> : "Pas d'image",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">📋 Liste des Produits</h2>

      <DataTable
        columns={columns}
        data={produits}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default ListeProduits;
