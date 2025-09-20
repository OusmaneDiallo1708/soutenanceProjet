import React, { useState } from "react";
import axios from "axios";

const AddCategorieForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
  });

  const [notification, setNotification] = useState({
    show: false,
    type: "", // 'success' ou 'error'
    message: ""
  });

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4999/api/allroute/addCategorie", formData);
      
      // Afficher la notification de succès
      setNotification({
        show: true,
        type: "success",
        message: "Catégorie ajoutée avec succès !"
      });
      
      setFormData({ nom: "", description: "" }); // reset du formulaire
      
      // Masquer la notification après 3 secondes
      setTimeout(() => {
        setNotification({ show: false, type: "", message: "" });
      }, 3000);
      
    } catch (error) {
      // Afficher la notification d'erreur
      setNotification({
        show: true,
        type: "error",
        message: "Erreur lors de l'ajout de la catégorie"
      });
      
      // Masquer la notification après 5 secondes
      setTimeout(() => {
        setNotification({ show: false, type: "", message: "" });
      }, 5000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ajouter une Catégorie</h2>
      
      {/* Notification élégante */}
      {notification.show && (
        <div className={`mb-6 p-4 rounded-lg border-l-4 ${
          notification.type === "success" 
            ? "bg-green-50 border-green-500 text-green-700" 
            : "bg-red-50 border-red-500 text-red-700"
        } transition-all duration-500 ease-in-out`}>
          <div className="flex items-center">
            <span className="text-lg mr-2">
              {notification.type === "success" ? "✓" : "⚠"}
            </span>
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champ Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la catégorie</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Entrez le nom de la catégorie"
          />
        </div>

        {/* Champ Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            rows="3"
            placeholder="Décrivez brièvement cette catégorie"
          ></textarea>
        </div>

        {/* Bouton d'ajout */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
        >
          Ajouter la catégorie
        </button>
      </form>
    </div>
  );
};

export default AddCategorieForm;