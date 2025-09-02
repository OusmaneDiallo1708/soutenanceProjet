import React, { useState, useEffect } from "react";
import axios from "axios";
import ListeProduits from "./ListeProduits ";

const AddProductForm = () => {
// useState est un hook de React qui permet de créer un état local dans un composant 
// fonctionnel.
// Il renvoie un tableau de deux éléments :
// formData → la valeur actuelle de l’état.
// setFormData → la fonction pour modifier cet état.
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
// const [categories, setCategories] = useState([]);
// But : créer un état pour stocker la liste des catégories que tu vas récupérer depuis 
// ton backend.
// Explication :
// categories → c’est la valeur actuelle de l’état. Ici, ça va 
// contenir un tableau de catégories.
// setCategories → c’est la fonction pour mettre à jour ce tableau.
// useState([]) → initialise l’état à un tableau vide.
// const [message, setMessage] = useState("");
// But : créer un état pour stocker les messages d’erreur ou de succès à 
// afficher dans le formulaire.
// Explication :
// message → la valeur actuelle du message (au départ, chaîne vide "").
// setMessage → fonction pour mettre à jour le message.
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 Charger les catégories depuis le backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:4999/api/allroute/getAllCategorie");
        setCategories(res.data.categorie || []);
// res.data → c’est la réponse que tu as reçue de ton backend après l’appel axios.get(...).
// res.data.categorie → c’est le tableau de catégories que ton backend t’envoie.
// || [] → c’est un backup : si res.data.categorie est undefined ou null, on met un 
// tableau vide pour éviter les erreurs.
        setCategories(res.data.categorie || []); // 🔑 tableau des catégories
        console.log("Données récupérées :", res.data.categorie);
      } catch (err) {
        console.error("Erreur récupération catégories :", err);
        setMessage("⚠️ Impossible de charger les catégories.");
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Gestion des changements des inputs
// handleChange est une fonction appelée à chaque changement d’un champ du 
// formulaire (onChange).
// e → l’événement déclenché par l’input.
// e.target → l’élément HTML qui a déclenché l’événement (<input>, <select>, etc.).
// On récupère les propriétés importantes :
// name → le nom de l’input (ex: "categorieId", "quantite").
// value → la valeur saisie (ex: "Boissons").
// type → le type de l’input ("text", "number", "checkbox", "file", etc.).
// checked → pour les checkbox, indique si c’est coché (true ou false).
// files → pour les inputs type file, c’est le tableau des fichiers sélectionnés.
// setFormData → met à jour l’état formData du formulaire.
// (prev) => ({ ...prev, ... }) → on copie tout l’état précédent (...prev) 
// et on modifie uniquement le champ qui a changé.
// Logique selon le type :
// type === "file" → si c’est un fichier, on prend le premier fichier 
// sélectionné : files[0].
// type === "checkbox" → si c’est une case à cocher, on prend la valeur booléenne checked.
// Sinon → on prend la valeur normale value (pour les inputs texte, number, select…).
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

  // 🔹 Soumission du formulaire
// handleSubmit est la fonction qui sera appelée lorsque l’utilisateur clique sur le bouton
// de soumission du formulaire (onSubmit).
// async → permet d’utiliser await pour gérer les appels asynchrones vers le backend.
// e → l’événement du formulaire
// Empêche le rechargement de la page à la soumission.
// Indispensable pour gérer le formulaire côté React.
// FormData → format utilisé pour envoyer les données du formulaire, surtout utile pour les 
// fichiers (<input type="file">).
// Object.keys(formData) → parcourt tous les champs de ton formulaire.
// Condition !== null && !== "" → on n’envoie que les champs remplis.
// data.append(key, formData[key]) → ajoute chaque champ dans le FormData.
// fetch → envoie les données au serveur.
// method: "POST" → pour créer un nouveau produit.
// body: data → on envoie le FormData préparé.
// Résumé
// handleSubmit :
// Empêche le rechargement de page.
// Vérifie que les champs obligatoires sont remplis.
// Prépare les données (FormData).
// Envoie les données au backend.
// Affiche un message selon le résultat.
// Réinitialise le formulaire si tout va bien.
// Gère les erreurs réseau ou serveur.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categorieId) {
      setMessage("❌ Veuillez choisir un nom de catégorie.");
      return;
    }
    if (!formData.categorieDescription) {
      setMessage("❌ Veuillez choisir une description de catégorie.");
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
        setMessage(`❌ ${result.message || "Erreur lors de l’ajout du produit."}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Problème de connexion au serveur.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white mt-10">
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        ➕ Ajouter un Produit
      </h2>

      {message && (
        <p className={`text-center mb-4 text-sm font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 🔹 Select Nom Catégorie */}
        <select
          name="categorieId"
          value={formData.categorieId}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400 col-span-1"
          required
        >
          <option value="">-- Choisir un nom de catégorie --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.nom}
            </option>
          ))}
        </select>

        {/* 🔹 Select Description Catégorie */}
        <select
          name="categorieDescription"
          value={formData.categorieDescription}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400 col-span-1"
          required
        >
          <option value="">-- Choisir une description --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.description}>
              {cat.description}
            </option>
          ))}
        </select>

        {/* Quantité */}
        <input
          type="number"
          name="quantite"
          placeholder="Quantité"
          value={formData.quantite}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400 col-span-1 md:col-span-2"
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
          <span className="text-gray-700 font-medium">Activer l’alerte stock</span>
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
      <ListeProduits />
    </div>
  );
};

export default AddProductForm;
