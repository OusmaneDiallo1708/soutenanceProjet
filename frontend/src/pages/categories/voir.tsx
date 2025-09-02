import React, { useState, useEffect } from "react";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:4999/api/allroute/getAllCategorie");
        const data = await res.json();
        setCategories(data); // met à jour le state avec les catégories
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center">Liste des Catégories</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat._id} className="border-b py-2">
            <strong>{cat.nom}</strong> — {cat.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCategories;
