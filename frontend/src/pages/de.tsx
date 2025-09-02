import React, { useState } from "react";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    categorieNom: "",
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

  const [message, setMessage] = useState("");

  // Gestion des changements dans les inputs
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "file"
          ? files[0]
          : type === "checkbox"
          ? checked
          : value,
    });
  };

  // Envoi au backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await fetch("http://localhost:4999/api/allroute/addProduit", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setMessage("✅ Produit ajouté avec succès !");
        setFormData({
          categorieNom: "",
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
        setMessage("❌ Erreur lors de l’ajout du produit.");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Problème de connexion au serveur.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        ➕ Ajouter un Produit
      </h2>

      {message && (
        <p className="text-center mb-4 text-sm font-medium text-green-600">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom catégorie */}
        <input
          type="text"
          name="categorieNom"
          placeholder="Nom de la catégorie"
          value={formData.categorieNom}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
          required
        />

        {/* Description catégorie */}
        <input
          type="text"
          name="categorieDescription"
          placeholder="Description de la catégorie"
          value={formData.categorieDescription}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
          required
        />

        {/* Quantité */}
        <input
          type="number"
          name="quantite"
          placeholder="Quantité"
          value={formData.quantite}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
          required
        />

        {/* Prix Achat */}
        <input
          type="number"
          name="prixAchat"
          placeholder="Prix d'achat"
          value={formData.prixAchat}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
          required
        />

        {/* Prix Vente */}
        <input
          type="number"
          name="prixVente"
          placeholder="Prix de vente"
          value={formData.prixVente}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
          required
        />

        {/* Stock minimum */}
        <input
          type="number"
          name="stock_min"
          placeholder="Stock minimum"
          value={formData.stock_min}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
          required
        />

        {/* Date ajout */}
        <input
          type="date"
          name="date_ajout"
          value={formData.date_ajout}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
          required
        />

        {/* Date expiration */}
        <input
          type="date"
          name="date_expiration"
          value={formData.date_expiration}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
          required
        />

        {/* Alerte Stock */}
        <label className="flex items-center gap-2 col-span-1 md:col-span-2">
          <input
            type="checkbox"
            name="alert_stock"
            checked={formData.alert_stock}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">
            Activer l’alerte stock
          </span>
        </label>

        {/* Image */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-50 col-span-1 md:col-span-2"
        />

        {/* Bouton */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition col-span-1 md:col-span-2"
        >
          ✅ Enregistrer le produit
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
