import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const ListeProduits = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [mode, setMode] = useState(""); // "view" ou "edit"

  // Récupération des produits
  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/produits");
      setProduits(res.data.produit);
    } catch (err) {
      console.error("Erreur lors de la récupération des produits :", err);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un produit
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      try {
        await axios.delete(`http://localhost:5000/api/produits/${id}`);
        setProduits(produits.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
      }
    }
  };

  // Ouvrir modal afficher/modifier
  const handleOpenModal = (produit, action) => {
    setSelectedProduit(produit);
    setMode(action);
  };

  // Fermer modal
  const handleCloseModal = () => {
    setSelectedProduit(null);
    setMode("");
  };

  // Sauvegarder modification
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/produits/${selectedProduit._id}`,
        selectedProduit
      );
      alert("Produit modifié avec succès !");
      fetchProduits();
      handleCloseModal();
    } catch (err) {
      console.error("Erreur lors de la modification :", err);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des Produits</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Nom</th>
            <th className="py-2 px-4 border">Quantité</th>
            <th className="py-2 px-4 border">Prix Achat</th>
            <th className="py-2 px-4 border">Prix Vente</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{p.nom}</td>
              <td className="py-2 px-4 border">{p.quantite}</td>
              <td className="py-2 px-4 border">{p.prixAchat} GNF</td>
              <td className="py-2 px-4 border">{p.prixVente} GNF</td>
              <td className="py-2 px-4 border flex gap-3 justify-center">
                {/* Boutons avec icônes */}
                <button
                  onClick={() => handleOpenModal(p, "view")}
                  className="text-blue-500 hover:text-blue-700"
                  title="Afficher"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleOpenModal(p, "edit")}
                  className="text-green-500 hover:text-green-700"
                  title="Modifier"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Supprimer"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedProduit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              {mode === "view" ? "Détails du produit" : "Modifier le produit"}
            </h3>

            {mode === "view" ? (
              <div>
                <p><b>Nom :</b> {selectedProduit.nom}</p>
                <p><b>Quantité :</b> {selectedProduit.quantite}</p>
                <p><b>Prix Achat :</b> {selectedProduit.prixAchat} GNF</p>
                <p><b>Prix Vente :</b> {selectedProduit.prixVente} GNF</p>
              </div>
            ) : (
              <form className="flex flex-col gap-3">
                <input
                  type="text"
                  value={selectedProduit.nom}
                  onChange={(e) =>
                    setSelectedProduit({
                      ...selectedProduit,
                      nom: e.target.value,
                    })
                  }
                  className="border p-2 rounded"
                  placeholder="Nom"
                />
                <input
                  type="number"
                  value={selectedProduit.quantite}
                  onChange={(e) =>
                    setSelectedProduit({
                      ...selectedProduit,
                      quantite: e.target.value,
                    })
                  }
                  className="border p-2 rounded"
                  placeholder="Quantité"
                />
                <input
                  type="number"
                  value={selectedProduit.prixAchat}
                  onChange={(e) =>
                    setSelectedProduit({
                      ...selectedProduit,
                      prixAchat: e.target.value,
                    })
                  }
                  className="border p-2 rounded"
                  placeholder="Prix Achat"
                />
                <input
                  type="number"
                  value={selectedProduit.prixVente}
                  onChange={(e) =>
                    setSelectedProduit({
                      ...selectedProduit,
                      prixVente: e.target.value,
                    })
                  }
                  className="border p-2 rounded"
                  placeholder="Prix Vente"
                />
              </form>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Fermer
              </button>
              {mode === "edit" && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Sauvegarder
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeProduits;
