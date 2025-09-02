import React, { useState } from "react";
import axios from "axios";

const AddCategorieForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
  });

  const [message, setMessage] = useState("");

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
      setMessage("✅ Catégorie ajoutée avec succès !");
      setFormData({ nom: "", description: "" }); // reset du formulaire
    } catch (error) {
      setMessage("❌ Erreur lors de l'ajout de la catégorie");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center">Ajouter une Catégorie</h2>
      {message && <p className="text-center mb-3">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ Nom */}
        <div>
          <label className="block text-sm font-medium">Nom de la catégorie</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Champ Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            rows="3"
          ></textarea>
        </div>

        {/* Bouton d'ajout */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddCategorieForm;
