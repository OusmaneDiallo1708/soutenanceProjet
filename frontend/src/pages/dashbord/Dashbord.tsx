import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FiPackage, 
  FiShoppingCart, 
  FiAlertTriangle, 
  FiDollarSign,
  FiTrendingUp,
  FiBox,
  FiArchive,
  FiAlertCircle
} from "react-icons/fi";
import ListeProduits from "./ListeProduits ";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProduits: 0,
        totalQuantite: 0,
        valeurStockVente: 0,
        produitsAlertes: [],
        isLoading: true
    });
    
    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const statsVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.5, delay: 0.2 }
        }
    };

    // Fonction pour récupérer les statistiques
    const fetchStats = async () => {
        try {
            setStats(prev => ({ ...prev, isLoading: true }));
            const response = await fetch("http://localhost:4999/api/allroute/stats");
            const data = await response.json();
            
            if (data.stats) {
                setStats({
                    ...data.stats,
                    isLoading: false
                });
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des statistiques:", error);
            setStats(prev => ({ ...prev, isLoading: false }));
        }
    };

    useEffect(() => {
        fetchStats();
        
        // Rafraîchissement automatique toutes les 30 secondes
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    // Fonction pour formater les nombres
    const formatNumber = (number) => {
        return new Intl.NumberFormat('fr-FR').format(number);
    };

    // Fonction pour formater la valeur monétaire
    const formatCurrency = (amount) => {
        if (amount >= 1000000) {
            return `${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `${(amount / 1000).toFixed(1)}K`;
        }
        return formatNumber(amount);
    };

    // Cartes de statistiques
    const statCards = [
        {
            title: "Produits",
            value: stats.totalProduits,
            icon: <FiPackage className="text-3xl" />,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-500",
            textColor: "text-blue-100",
            description: "Total disponible",
            format: formatNumber
        },
        {
            title: "Stocks",
            value: stats.totalQuantite,
            icon: <FiShoppingCart className="text-3xl" />,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-500",
            textColor: "text-green-100",
            description: "Articles en magasin",
            format: formatNumber
        },
        {
            title: "Alertes",
            value: stats.produitsAlertes?.length || 0,
            icon: <FiAlertTriangle className="text-3xl" />,
            color: "from-amber-500 to-amber-600",
            bgColor: "bg-amber-500",
            textColor: "text-amber-100",
            description: "Produits en alerte",
            format: formatNumber
        },
        {
            title: "Valeur Stock",
            value: stats.valeurStockVente,
            icon: <FiDollarSign className="text-3xl" />,
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-500",
            textColor: "text-purple-100",
            description: "Revenu potentiel",
            format: formatCurrency,
            suffix: " GNF"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Tableau de Bord</h1>
                <p className="text-gray-600">Gestion et suivi de votre inventaire</p>
            </motion.div>

            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ 
                            scale: 1.02,
                            rotate: index % 2 === 0 ? 0.5 : -0.5,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group`}
                    >
                        {/* Effet de fond animé */}
                        <div className={`absolute -right-4 -top-4 w-20 h-20 ${card.bgColor} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-300`}></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-full ${card.bgColor} bg-opacity-20 backdrop-blur-sm`}>
                                    {card.icon}
                                </div>
                                <FiTrendingUp className="text-xl opacity-80" />
                            </div>
                            
                            {stats.isLoading ? (
                                <div className="h-8 bg-white bg-opacity-20 rounded animate-pulse mb-2"></div>
                            ) : (
                                <motion.div
                                    variants={statsVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="text-3xl font-bold mb-1"
                                >
                                    {card.format(card.value)}
                                    {card.suffix}
                                </motion.div>
                            )}
                            
                            <div className="text-sm opacity-90 font-medium">{card.title}</div>
                            <div className="text-xs opacity-80 mt-1">{card.description}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Section Alertes */}
            {stats.produitsAlertes && stats.produitsAlertes.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg mb-8 relative overflow-hidden"
                >
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                    <div className="absolute -left-8 -bottom-8 w-20 h-20 bg-white opacity-10 rounded-full"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center mb-4">
                            <FiAlertCircle className="text-2xl mr-3 animate-pulse" />
                            <h2 className="text-xl font-bold">Alertes de Stock</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {stats.produitsAlertes.slice(0, 3).map((prod, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white bg-opacity-15 backdrop-blur-sm p-4 rounded-xl border border-white border-opacity-20"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold">{prod.categorieNom}</span>
                                        <FiBox className="text-sm" />
                                    </div>
                                    <div className="text-sm">
                                        Stock: <span className="font-bold">{prod.stock}</span> / 
                                        Min: <span className="font-bold">{prod.stock_min}</span>
                                    </div>
                                    <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
                                        <div 
                                            className="bg-white h-2 rounded-full transition-all duration-1000"
                                            style={{ width: `${(prod.stock / prod.stock_min) * 100}%` }}
                                        ></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        {stats.produitsAlertes.length > 3 && (
                            <div className="text-center mt-4 text-sm opacity-90">
                                +{stats.produitsAlertes.length - 3} autres alertes...
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-lg mb-8"
            >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions Rapides</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: <FiPackage />, label: "Ajouter Produit", color: "blue" },
                        { icon: <FiArchive />, label: "Vérifier Stock", color: "green" },
                        { icon: <FiDollarSign />, label: "Nouvelle Vente", color: "purple" },
                        { icon: <FiAlertCircle />, label: "Voir Alertes", color: "red" }
                    ].map((action, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-4 rounded-xl bg-${action.color}-50 text-${action.color}-600 border border-${action.color}-200 hover:bg-${action.color}-100 transition-colors duration-200 flex flex-col items-center`}
                        >
                            <div className={`text-2xl mb-2 text-${action.color}-500`}>
                                {action.icon}
                            </div>
                            <span className="text-sm font-medium">{action.label}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Tableau des produits */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <ListeProduits />
            </motion.div>

            {/* Refresh Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={fetchStats}
                className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition-colors duration-200 z-50"
                aria-label="Rafraîchir les données"
            >
                <FiTrendingUp className="text-xl" />
            </motion.button>
        </div>
    );
};

export default Dashboard;