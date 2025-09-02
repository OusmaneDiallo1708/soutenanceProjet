import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icônes hamburger et fermeture
import logo from "../assets/images/Logo_WS.png"
import Dashboard from "./dashbord/Dashbord";
import Ajoute from "./produits/Ajoute";
import Categorie from "./categories/CategorieAdd";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashbord"); // "dashbord" ou "produit" etc.

  return (
    <div className="flex h-full bg-gray-400 p-0">
      {/* Overlay quand menu ouvert (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar élargie */}
      <div
        className={`fixed inset-y-0 left-0 w-80 transform transition-transform z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* <div className=" bg-white shadow border-b">
          <div className=" justify-center items-center flex">
          <img className="w-[100px] justify-center" src={logo} alt="" />
          </div>
        </div> */}
        <nav className="p-2 space-y-4 bg-blue-800 h-screen">
            <div className=" justify-center items-center flex">
              <img className="w-[20vh] justify-center" src={logo} alt="" />
            </div>
          <button
            onClick={() => setActivePage("dashbord")}
            className="block text-2xl text-white w-full text-left px-6 py-2 rounded  hover:bg-gray-200 hover:text-black"
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActivePage("categorie")}
            className="block text-2xl text-white w-full text-left px-6 py-2 rounded  hover:bg-gray-200 hover:text-black"
          >
            📦 Produits
          </button>
          <button
            onClick={() => setActivePage("produit")}
            className="block text-2xl text-white w-full text-left px-6 py-2 rounded  hover:bg-gray-200 hover:text-black"
          >
            📦 Produits
          </button>
          <button
            onClick={() => setActivePage("stocks")}
            className="block text-2xl text-white w-full text-left px-6 py-2 rounded  hover:bg-gray-200 hover:text-black"
          >
            🛒 Stocks
          </button>
          <button
            onClick={() => setActivePage("commandes")}
            className="block text-2xl text-white w-full text-left px-6 py-2 rounded  hover:bg-gray-200 hover:text-black"
          >
            📑 Commandes
          </button>
          <button
            onClick={() => setActivePage("parametres")}
            className="block text-2xl text-white w-full text-left px-6 py-2 rounded  hover:bg-gray-200 hover:text-black"
          >
            ⚙ Paramètres
          </button>
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col lg:ml-80">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-6  py-5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 className="font-bold text-4xl text-blue-950 ">Tableau de Bord</h1>
          <div className="font-medium text-4xl text-blue-950 ">👤  Admin</div>
        </header>

        {/* Contenu */}
        <main className="w-full max-w-7xl shadow-orange-50 ml-10 min-h-screen px-8 overflow-y-auto">
          {activePage === "dashbord" && <Dashboard />}
          {activePage === "produit" && <Ajoute />}
          {activePage === "categorie" && <Categorie />}
          {activePage === "stocks" && <div>🛒 Stocks</div>}
          {activePage === "commandes" && <div>📑 Commandes</div>}
          {activePage === "parametres" && <div>⚙ Paramètres</div>}
        </main>
      </div>
    </div>
  );
}
