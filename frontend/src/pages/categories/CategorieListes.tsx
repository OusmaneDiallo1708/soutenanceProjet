import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Eye, Pencil, Trash2 } from "lucide-react";
import BtnCategorie from "./BtnCategorie";

// 🔹 Modal simple
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-11/12 md:w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 font-bold text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const CategorieListes = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [modalType, setModalType] = useState(""); // "afficher" ou "modifier"
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4999/api/allroute/getAllCategorie"
        );
        setCategories(res.data.categorie || []);
        setLoading(false);
      } catch (error) {
        console.error("Erreur récupération categories :", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ Voulez-vous vraiment supprimer cette catégorie ?"))
      return;
    try {
      await axios.delete(
        `http://localhost:4999/api/allroute/updateCategorie/${id}`
      );
      setCategories(categories.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Erreur suppression :", error);
      alert("❌ Impossible de supprimer la catégorie.");
    }
  };

  const openModal = (categorie, type) => {
    setSelectedCategorie(categorie);
    setModalType(type);
    if (type === "modifier") {
      setEditData({
        nom: categorie.nom,
        description: categorie.description,
      });
    }
  };

  const closeModal = () => {
    setSelectedCategorie(null);
    setModalType("");
    setEditData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4999/api/allroute/updateCategorie/${selectedCategorie._id}`,
        editData
      );
      setCategories(
        categories.map((c) =>
          c._id === selectedCategorie._id ? res.data.categorie : c
        )
      );
      closeModal();
    } catch (error) {
      console.error("Erreur modification :", error);
      alert("❌ Impossible de modifier la catégorie.");
    }
  };

  const columns = [
    { name: "Nom de la catégorie", selector: (row) => row.nom, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openModal(row, "afficher")}
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => openModal(row, "modifier")}
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        📂 Liste des Catégories
      </h2>
      <div>
        <BtnCategorie />
      </div>
      <DataTable
        columns={columns}
        data={categories}
        pagination
        highlightOnHover
        striped
        responsive
        progressPending={loading}
      />

      {/* Modal */}
      <Modal isOpen={!!selectedCategorie} onClose={closeModal}>
        {modalType === "afficher" && selectedCategorie && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedCategorie.nom}</h2>
            <p>
              <strong>Nom :</strong> {selectedCategorie.nom}
            </p>
            <p>
              <strong>Description :</strong> {selectedCategorie.description}
            </p>
          </div>
        )}

        {modalType === "modifier" && selectedCategorie && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Modifier {selectedCategorie.nom}
            </h2>
            <form
              onSubmit={handleEditSubmit}
              className="grid grid-cols-1 gap-4"
            >
              <input
                type="text"
                name="nom"
                value={editData.nom || ""}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                placeholder="Nom"
                required
              />
              <input
                type="text"
                name="description"
                value={editData.description || ""}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                placeholder="Description"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Enregistrer modifications
              </button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CategorieListes;
