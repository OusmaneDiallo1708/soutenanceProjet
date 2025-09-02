import ListeProduits from "./ListeProduits ";

const Dashboard = () => {
    return (
      <div className="p-6">
        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl">📦</div>
              <div className="text-sm font-semibold uppercase">Produits</div>
            </div>
            <div className="text-3xl font-bold">120</div>
            <div className="mt-2 text-blue-200 text-sm">Total disponible</div>
          </div>
  
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl">🛒</div>
              <div className="text-sm font-semibold uppercase">Stocks</div>
            </div>
            <div className="text-3xl font-bold">450</div>
            <div className="mt-2 text-green-200 text-sm">Articles en magasin</div>
          </div>
  
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl">📑</div>
              <div className="text-sm font-semibold uppercase">Commandes</div>
            </div>
            <div className="text-3xl font-bold">89</div>
            <div className="mt-2 text-yellow-100 text-sm">Commandes récentes</div>
          </div>
  
          <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl">💵</div>
              <div className="text-sm font-semibold uppercase">Ventes</div>
            </div>
            <div className="text-3xl font-bold">25M GNF</div>
            <div className="mt-2 text-red-200 text-sm">Revenu total</div>
          </div>
        </div>
  
        {/* Tableau des produits */}
        {/* <div className="bg-white p-8 rounded-2xl shadow-lg overflow-x-auto">
          <h2 className="text-3xl font-bold mb-6">Produits Récents</h2>
          <table className="w-full text-left border-collapse divide-y divide-gray-200 text-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 font-medium text-gray-700">Nom</th>
                <th className="p-4 font-medium text-gray-700">Catégorie</th>
                <th className="p-4 font-medium text-gray-700">Stock</th>
                <th className="p-4 font-medium text-gray-700">Prix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">Ordinateur</td>
                <td className="p-4">Informatique</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">15</span>
                </td>
                <td className="p-4 font-medium">7M GNF</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">Chaise</td>
                <td className="p-4">Mobilier</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">45</span>
                </td>
                <td className="p-4 font-medium">300k GNF</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">Téléphone</td>
                <td className="p-4">Électronique</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">23</span>
                </td>
                <td className="p-4 font-medium">4M GNF</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <ListeProduits />
      </div>
    );
  };
  
  export default Dashboard;
  