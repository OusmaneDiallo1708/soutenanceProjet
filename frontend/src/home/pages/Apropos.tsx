import React from "react";
import { 
  Users, 
  Shield, 
  TrendingUp, 
  Heart, 
  Award,
  Globe,
  Store,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Apropos: React.FC = () => {
  const navigate = useNavigate();

  const handleAcceuilClick = () => {
    navigate("/acceuil");
  };

  const handleCommencerClick = () => {
    navigate("/inscription");
  };

  // Statistiques de la plateforme
  const stats = [
    { number: "10K+", label: "Utilisateurs actifs", icon: <Users className="w-8 h-8" /> },
    { number: "5K+", label: "Vendeurs certifiés", icon: <Store className="w-8 h-8" /> },
    { number: "50K+", label: "Produits disponibles", icon: <Award className="w-8 h-8" /> },
    { number: "98%", label: "Satisfaction clients", icon: <Heart className="w-8 h-8" /> }
  ];

  // Valeurs de l'entreprise
  const values = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Sécurité",
      description: "Transactions sécurisées et protection des données pour une expérience d'achat en toute confiance."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-600" />,
      title: "Croissance",
      description: "Plateforme conçue pour favoriser la croissance des vendeurs et l'épanouissement des acheteurs."
    },
    {
      icon: <Globe className="w-12 h-12 text-purple-600" />,
      title: "Accessibilité",
      description: "Accessible à tous, partout. Une marketplace ouverte à toutes et à tous."
    }
  ];

  // Fonctionnalités principales
  const features = [
    "Paiements sécurisés multiples",
    "Interface intuitive et moderne",
    "Gestion de boutique complète",
    "Analyses de performances détaillées",
    "Support client 24/7",
    "Livraison suivie et assurée"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b fixed top-0 w-full z-50">
        <Header/>
      </nav>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            À propos de <span className="text-orange-400">Whalleïn Stock</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90">
            Découvrez l'histoire derrière la marketplace qui révolutionne l'expérience d'achat en ligne
          </p>
          <button 
            onClick={handleCommencerClick}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl flex items-center mx-auto"
          >
            Commencer maintenant
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Notre Histoire
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Fondée en 2023, Whalleïn Stock est née d'une vision simple mais puissante : créer une marketplace 
              où chaque vendeur peut prospérer et chaque acheteur peut trouver exactement ce qu'il cherche. 
              Notre plateforme combine innovation technologique et approche humaine pour offrir une expérience 
              d'achat et de vente exceptionnelle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/about-team.jpg" 
                alt="Équipe Whalleïn Stock" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre Mission</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Rendre le commerce en ligne accessible à tous tout en maintenant les plus hauts standards 
                de qualité et de sécurité. Nous croyons en un internet où chacun peut entreprendre et 
                réussir, quel que soit son background ou son expérience.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Devenir la marketplace de référence en Afrique et dans le monde, en connectant des millions 
                d'acheteurs et de vendeurs dans un écosystème prospère et sécurisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nos Valeurs
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-6 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi choisir Whalleïn Stock ?
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start p-4 bg-white rounded-xl shadow-md">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <div>
      <Footer/>

      </div>
    </div>
  );
};

export default Apropos;