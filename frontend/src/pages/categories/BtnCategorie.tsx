import { useState } from "react";
import CategorieAdd from "./CategorieAdd";
import { BiAddToQueue } from "react-icons/bi";

const BtnCategorie = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="flex justify-center items-center gap-1 text-2xl text-white bg-blue-600 text-left px-6 py-2 rounded  hover:bg-gray-200 hover:text-black"
        onClick={() => setIsOpen(true)}
      >
         <BiAddToQueue size={30}/>Categories
      </button>

      {/* Utilisation du même style de modal que dans CategorieListes */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Ajouter une catégorie</h2>
            <CategorieAdd />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setIsOpen(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BtnCategorie;
