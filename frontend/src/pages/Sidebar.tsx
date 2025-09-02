import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icônes hamburger et fermeture

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // ✅ hook placé AVANT le return

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-blue-900 shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-4 font-bold text-xl border-b text-white">Admin Panel</div>
        <nav className="p-4 space-y-2 text-white">
          <a href="#" className="block p-2 rounded hover:bg-blue-700">📦 Produits</a>
          <a href="#" className="block p-2 rounded hover:bg-blue-700">🛒 Stocks</a>
          <a href="#" className="block p-2 rounded hover:bg-blue-700">📑 Commandes</a>
          <a href="#" className="block p-2 rounded hover:bg-blue-700">⚙ Paramètres</a>
        </nav>
      </div>

      {/* Overlay quand menu ouvert (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
