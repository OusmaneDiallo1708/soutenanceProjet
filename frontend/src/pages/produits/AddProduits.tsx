import React, { useState, useEffect } from "react";
import axios from "axios";
import ListeProduits from "./ListeProduits ";
import BtnCategorie from "../categories/BtnCategorie";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    categorieId: "",
    categorieDescription: "",
    quantite: "",
    prixAchat: "",
    prixVente: "",
    stock_min: "",
    date_ajout: "",
    date_expiration: "",
    alert_stock: false,
    image: null,
  });
  
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les catégories depuis le backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:4999/api/allroute/getAllCategorie");
        setCategories(res.data.categorie || []);
      } catch (err) {
        console.error("Erreur récupération catégories :", err);
        setMessage("⚠️ Impossible de charger les catégories.");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? files[0]
          : type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.categorieId) {
      setMessage("❌ Veuillez choisir un nom de catégorie.");
      setIsSubmitting(false);
      return;
    }
    if (!formData.categorieDescription) {
      setMessage("❌ Veuillez choisir une description de catégorie.");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
      });

      const response = await fetch("http://localhost:4999/api/allroute/addProduit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Produit ajouté avec succès !");
        setFormData({
          categorieId: "",
          categorieDescription: "",
          quantite: "",
          prixAchat: "",
          prixVente: "",
          stock_min: "",
          date_ajout: "",
          date_expiration: "",
          alert_stock: false,
          image: null,
        });
      } else {
        setMessage(`❌ ${result.message || "Erreur lors de l'ajout du produit."}`);
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
        ✨ Ajouter un Nouveau Produit
      </h2>

      {message && (
        <div className={`mb-6 p-4 rounded-xl text-center font-medium ${message.startsWith("✅") ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
        {/* Sélection de catégorie */}
        <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4">
          <div className="md:w-1/4">
            <BtnCategorie />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Nom de catégorie</label>
            <select
              name="categorieId"
              value={formData.categorieId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              required
            >
              <option value="">-- Choisir une catégorie --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.nom}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Description</label>
            <select
              name="categorieDescription"
              value={formData.categorieDescription}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              required
            >
              <option value="">-- Choisir une description --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.description}>
                  {cat.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantité */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Quantité</label>
          <input
            type="number"
            name="quantite"
            placeholder="Ex: 50"
            value={formData.quantite}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
          />
        </div>

        {/* Prix Achat */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Prix d'achat (€)</label>
          <input
            type="number"
            name="prixAchat"
            placeholder="Ex: 12.99"
            value={formData.prixAchat}
            onChange={handleChange}
            step="0.01"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
          />
        </div>

        {/* Prix Vente */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Prix de vente (€)</label>
          <input
            type="number"
            name="prixVente"
            placeholder="Ex: 19.99"
            value={formData.prixVente}
            onChange={handleChange}
            step="0.01"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
          />
        </div>

        {/* Stock minimum */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Stock minimum</label>
          <input
            type="number"
            name="stock_min"
            placeholder="Ex: 5"
            value={formData.stock_min}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
          />
        </div>

        {/* Date ajout */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Date d'ajout</label>
          <input
            type="date"
            name="date_ajout"
            value={formData.date_ajout}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
          />
        </div>

        {/* Date expiration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Date d'expiration</label>
          <input
            type="date"
            name="date_expiration"
            value={formData.date_expiration}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            required
          />
        </div>

        {/* Alerte Stock */}
        <div className="col-span-1 md:col-span-2 flex items-center p-4 bg-blue-50 rounded-xl border border-blue-100">
          <input
            type="checkbox"
            name="alert_stock"
            checked={formData.alert_stock}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="ml-3 text-gray-700 font-medium">Activer l'alerte stock bas</span>
        </div>

        {/* Image */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Image du produit</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-2xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all duration-200">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-blue-600"><span className="font-semibold">Cliquez pour uploader</span></p>
                <p className="text-xs text-gray-500">{formData.image ? formData.image.name : "PNG, JPG, JPEG (MAX. 5MB)"}</p>
              </div>
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                onChange={handleChange} 
                className="hidden" 
              />
            </label>
          </div>
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
              "🚀 Publier le Produit"
            )}
          </button>
        </div>
      </form>
      
      <ListeProduits />
    </div>
  );
};

export default AddProductForm;