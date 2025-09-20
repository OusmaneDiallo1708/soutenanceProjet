
const Footer = () => {
  return (
    <div>
        {/* CTA Final */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à rejoindre l'aventure ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Rejoignez des milliers de vendeurs et d'acheteurs qui font déjà confiance à Whalleïn Stock
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
            
              className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              Créer mon compte
            </button>
            <button 
            
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Découvrir la marketplace
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img 
              src="/images/Logo_WS.png" 
              alt="Whalleïn Stock" 
              className="w-16 h-16 mx-auto mb-4 rounded-full"
            />
            <p className="text-gray-400">
              © 2024 Whalleïn Stock. Tous droits réservés.
            </p>
            <p className="text-gray-400 mt-2">
              Construit avec ❤️ pour révolutionner le commerce en ligne
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

export default Footer