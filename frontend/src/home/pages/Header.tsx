import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleConnexionClick = () => {
    navigate("/profil");
  };

  const handleSinscrireClick = () => {
    navigate("/profil");
  };

  const handleAcceuilClick = () => {
    navigate("/acceuil");
  };

  const handleAproposClick = () => {
    navigate("/apropos");
  };

  return (
    <nav className="bg-white shadow-sm border-b fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              className="w-[10vh] h-[10vh] rounded-full cursor-pointer transition-transform hover:scale-105" 
              src="/images/Logo_WS.png" 
              alt="Whalleïn Stock" 
              onClick={handleAcceuilClick}
            />
            <span className="ml-3 text-xl font-bold text-gray-900">Whalleïn Stock</span>
          </div>
          
          {/* Menu desktop */}
          <div className="hidden md:flex justify-center items-center">
            <div className="my-5">
              <button 
                onClick={handleAcceuilClick} 
                className="text-xl text-gray-700 font-sans px-3 hover:text-orange-500 transition-colors duration-300 font-bold"
              >
                Accueil
              </button>
              <button 
                onClick={handleAproposClick} 
                className="text-xl text-gray-700 font-sans px-3 hover:text-orange-500 transition-colors duration-300 font-bold"
              >
                À propos
              </button>
            </div>
            <div className="flex gap-4 ml-6">
              <button onClick={handleSinscrireClick} className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-[17px] rounded-full p-2 px-8 font-semibold hover:from-blue-800 hover:to-blue-950 transition-all duration-300 shadow-md hover:shadow-lg">
                S'inscrire
              </button>
              <button onClick={handleConnexionClick} className="bg-gradient-to-r from-green-600 to-green-800 text-white text-[17px] rounded-full p-2 px-8 font-semibold hover:from-green-700 hover:to-green-900 transition-all duration-300 shadow-md hover:shadow-lg">
                Connexion
              </button>
            </div>
          </div>
          
          {/* Menu mobile */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700">
              {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Menu mobile ouvert */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white absolute top-16 left-0 right-0 z-40 shadow-lg border-t">
            <div className="flex flex-col p-4">
              <button 
                onClick={() => {
                  handleAcceuilClick();
                  setMobileMenuOpen(false);
                }}
                className="py-3 text-lg font-medium text-left text-gray-700 hover:text-orange-500 transition-colors"
              >
                Accueil
              </button>
              <button 
                onClick={() => {
                  handleAproposClick();
                  setMobileMenuOpen(false);
                }}
                className="py-3 text-lg font-medium text-left text-gray-700 hover:text-orange-500 transition-colors"
              >
                À propos
              </button>
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                <button onClick={handleSinscrireClick} className="bg-blue-800 text-white rounded-full p-3 font-semibold">S'inscrire</button>
                <button onClick={handleConnexionClick} className="bg-green-700 text-white rounded-full p-3 font-semibold">Connexion</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;