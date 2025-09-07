import React, { useState, useEffect } from "react";
import axios from "axios";

const AddVenteForm = () => {
  const [formData, setFormData] = useState({
    produitId: "",
    utilisateurId: "",
    quantite: "",
    prix_unitaire: "",
    date_vente: ""
  });
  
  const [produits, setProduits] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les produits et utilisateurs depuis le backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les produits
        const produitsRes = await axios.get("http://localhost:4999/api/allroute/getAllProduit");
        setProduits(produitsRes.data || []);
        
        // Charger les utilisateurs avec la bonne route
        const usersRes = await axios.get("http://localhost:4999/api/allroute/getAllUtilisateurs");
        setUtilisateurs(usersRes.data.utilisateur || []); // Notez le .utilisateur ici
      } catch (err) {
        console.error("Erreur récupération des données :", err);
        setMessage("⚠️ Impossible de charger les données.");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.produitId) {
      setMessage("❌ Veuillez choisir un produit.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.utilisateurId) {
      setMessage("❌ Veuillez choisir un utilisateur.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4999/api/allroute/addVente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Vente ajoutée avec succès !");
        setFormData({
          produitId: "",
          utilisateurId: "",
          quantite: "",
          prix_unitaire: "",
          date_vente: ""
        });
      } else {
        setMessage(`❌ ${result.message || "Erreur lors de l'ajout de la vente."}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Problème de connexion au serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl mt-10 border border-blue-100">
      <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center tracking-tight">
        ✨ Ajouter une Nouvelle Vente
      </h2>

      {message && (
        <div className={`mb-6 p-4 rounded-xl text-center font-medium ${message.startsWith("✅") ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
        {/* Sélection du produit */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Nom du Produit</label>
          <select
            name="produitId"
            value={formData.produitId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
          >
            <option value="">-- Choisir un produit --</option>
            {produits.map((prod) => (
              <option key={prod._id} value={prod._id}>
                {prod.produitNom || prod.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Sélection de l'utilisateur */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Utilisateur</label>
          <select
            name="utilisateurId"
            value={formData.utilisateurId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
          >
            <option value="">-- Choisir un utilisateur --</option>
            {utilisateurs.map((user) => (
              <option key={user._id} value={user._id}>
                {user.nomComplet || user.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Quantité */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Quantité</label>
          <input
            type="number"
            name="quantite"
            placeholder="Ex: 5"
            value={formData.quantite}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
          />
        </div>

        {/* Prix unitaire */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Prix unitaire (€)</label>
          <input
            type="number"
            name="prix_unitaire"
            placeholder="Ex: 19.99"
            value={formData.prix_unitaire}
            onChange={handleChange}
            step="0.01"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
          />
        </div>

        {/* Date de vente */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Date de vente</label>
          <input
            type="date"
            name="date_vente"
            value={formData.date_vente}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
          />
        </div>

        {/* Bouton de soumission */}
        <div className="col-span-1 md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
              isSubmitting 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement en cours...
              </span>
            ) : (
              "Ajouter la vente"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVenteForm;