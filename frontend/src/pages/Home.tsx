import { useState } from "react";
import { 
  AlertCircleIcon, 
  Folder, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  Package, 
  Settings, 
  ShoppingCartIcon, 
  X,
  Bell,
  User,
  Search
} from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/images/Logo_WS.png";
import Dashboard from "./dashbord/Dashbord";
import Categorie from "./categories/CategorieListes";
import AddVenteForm from "./ventes/AddVents";
import AddProductForm from "./produits/AddProduits";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashbord");
  const [showNotifications, setShowNotifications] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notificationData = [
    { id: 1, type: "alert", message: "Stock faible sur iPhone 13", time: "2 min ago", read: false },
    { id: 2, type: "success", message: "Nouvelle vente effectuée", time: "5 min ago", read: false },
    { id: 3, type: "info", message: "Mise à jour système disponible", time: "1 hour ago", read: true }
  ];

  const unreadNotifications = notificationData.filter(n => !n.read).length;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - STRUCTURE ORIGINALE AVEC STYLE AMÉLIORÉ */}
      <div
        className={`fixed inset-y-0 left-0 w-80 transform transition-transform z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <nav className="h-full bg-gradient-to-b from-blue-900 to-blue-800 shadow-2xl border-r border-blue-700">
          <div className="flex justify-center items-center p-6 border-b border-blue-700">
            <img className="w-32 filter brightness-125 drop-shadow-lg" src={logo} alt="Logo" />
          </div>
          
          <div className="p-4 space-y-3 mt-6">
            {[
              { id: "dashbord", icon: LayoutDashboard, label: "Tableau de Bord" },
              { id: "categorie", icon: Folder, label: "Catégories" },
              { id: "produit", icon: Package, label: "Produits" },
              { id: "ventes", icon: ShoppingCartIcon, label: "Ventes" },
              { id: "parametres", icon: Settings, label: "Paramètres" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 w-full text-left p-4 rounded-xl transition-all duration-300
                    ${activePage === item.id 
                      ? "bg-white/20 backdrop-blur-sm text-white shadow-lg" 
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <Icon size={28} className={
                    activePage === item.id ? "text-white" : "text-blue-300"
                  } />
                  <span className="text-xl font-semibold">{item.label}</span>
                  {activePage === item.id && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Déconnexion */}
          <div className="absolute bottom-0 w-full p-4 border-t border-blue-700">
            <button
              onClick={() => setActivePage("logout")}
              className="flex items-center gap-4 w-full text-left p-4 rounded-xl text-red-100 hover:bg-red-600/20 hover:text-white transition-all duration-300"
            >
              <LogOut size={28} className="text-red-300" />
              <span className="text-xl font-semibold">Déconnexion</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col lg:ml-80">
        {/* Header avec les nouvelles fonctionnalités */}
        <header className="sticky top-0 z-20 flex items-center justify-between bg-white shadow-lg px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="font-bold text-2xl text-blue-900">Tableau de Bord</h1>
          </div>

          {/* Right Section - NOUVELLES FONCTIONNALITÉS */}
          <div className="flex items-center gap-4">
            {/* Barre de recherche */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2">
              <Search size={20} className="text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="bg-transparent border-none text-gray-700 placeholder-gray-500 focus:outline-none w-48"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors relative"
              >
                <Bell size={24} className="text-gray-600" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Dropdown Notifications */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-gray-800 font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notificationData.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${
                              notification.type === 'alert' ? 'bg-red-100 text-red-600' :
                              notification.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              <AlertCircleIcon size={16} />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800 text-sm">{notification.message}</p>
                              <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Utilisateur avec Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <span className="text-gray-700 font-medium hidden md:block">Admin</span>
              </button>

              {/* User Menu Dropdown */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-gray-800 font-semibold">Administrateur</p>
                      <p className="text-gray-500 text-sm">admin@example.com</p>
                    </div>
                    <div className="p-2">
                      <button className="flex items-center gap-3 w-full p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <User size={18} />
                        <span>Profil</span>
                      </button>
                      <button className="flex items-center gap-3 w-full p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Settings size={18} />
                        <span>Paramètres</span>
                      </button>
                    </div>
                    <div className="p-2 border-t border-gray-200">
                      <button className="flex items-center gap-3 w-full p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut size={18} />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="flex-1 w-full min-h-screen overflow-y-auto bg-gray-50 p-6">
          {activePage === "dashbord" && <Dashboard />}
          {activePage === "produit" && <AddProductForm />}
          {activePage === "categorie" && <Categorie />}
          {activePage === "ventes" && <AddVenteForm />}
          {/* {activePage === "ventes" && <div>🛒 Module Ventes</div>} */}
          {activePage === "parametres" && <div>⚙ Module Paramètres</div>}
        </main>
      </div>
    </div>
  );
}