
import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Phone, Eye, EyeOff, Upload, List, UserPlus } from 'lucide-react';

const AddUsers = () => {
  const [view, setView] = useState('form'); // 'form' ou 'list'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [utilisateurs, setUtilisateurs] = useState([]);
  
  // États pour le formulaire
  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    motDePasse: '',
    genre: '',
    telephone: '',
    role: 'utilisateur',
    photo: null
  });
  
  // États pour les erreurs
  const [errors, setErrors] = useState({
    nomComplet: '',
    email: '',
    motDePasse: '',
    telephone: ''
  });

  // Charger les utilisateurs (simulation)
  useEffect(() => {
    // En réalité, vous feriez un appel API ici
    const mockUtilisateurs = [
      { id: 1, nomComplet: 'Jean Dupont', email: 'jean@exemple.com', genre: 'homme', telephone: '0123456789', role: 'admin', photo: null },
      { id: 2, nomComplet: 'Marie Martin', email: 'marie@exemple.com', genre: 'femme', telephone: '0987654321', role: 'utilisateur', photo: null }
    ];
    setUtilisateurs(mockUtilisateurs);
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
      
      // Validation en temps réel
      if (name === 'email' && value && !validateEmail(value)) {
        setErrors({ ...errors, email: 'Email invalide' });
      } else if (name === 'email') {
        setErrors({ ...errors, email: '' });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nomComplet) newErrors.nomComplet = 'Le nom complet est requis';
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.motDePasse) newErrors.motDePasse = 'Le mot de passe est requis';
    if (formData.telephone && !/^[0-9+\s()-]{10,}$/.test(formData.telephone)) {
      newErrors.telephone = 'Numéro de téléphone invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulation d'un appel API
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // En réalité, vous utiliseriez:
      // const response = await axios.post('/api/utilisateur/ajoutUtilisateur', formDataToSend, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      
      // Simulation de réponse
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Ajouter le nouvel utilisateur à la liste (en simulation)
      const newUser = {
        id: Date.now(),
        ...formData,
        photo: formData.photo ? URL.createObjectURL(formData.photo) : null
      };
      
      setUtilisateurs([...utilisateurs, newUser]);
      setShowSuccess(true);
      
      // Réinitialiser le formulaire
      setFormData({
        nomComplet: '',
        email: '',
        motDePasse: '',
        genre: '',
        telephone: '',
        role: 'utilisateur',
        photo: null
      });
      
      // Cacher le message de succès après 3 secondes
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 text-center">Ajoutez et gérez les utilisateurs du système</p>
        </div>
        
        <div className="flex justify-center p-4 bg-gray-100">
          <div className="flex space-x-4">
            <button
              onClick={() => setView('form')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                view === 'form' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <UserPlus size={18} className="mr-2" />
              Ajouter un utilisateur
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                view === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <List size={18} className="mr-2" />
              Liste des utilisateurs
            </button>
          </div>
        </div>
        
        {/* Message de succès */}
        {showSuccess && (
          <div className="m-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
            <p>Utilisateur ajouté avec succès!</p>
          </div>
        )}
        
        <div className="p-6">
          {view === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nom complet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="nomComplet"
                      value={formData.nomComplet}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-lg border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.nomComplet ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nom et prénom"
                    />
                  </div>
                  {errors.nomComplet && <p className="mt-1 text-sm text-red-600">{errors.nomComplet}</p>}
                </div>
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-lg border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="adresse@exemple.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                
                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="motDePasse"
                      value={formData.motDePasse}
                      onChange={handleChange}
                      className={`pl-10 pr-10 w-full rounded-lg border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.motDePasse ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="********"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.motDePasse && <p className="mt-1 text-sm text-red-600">{errors.motDePasse}</p>}
                </div>
                
                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-lg border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.telephone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0123456789"
                    />
                  </div>
                  {errors.telephone && <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>}
                </div>
                
                {/* Genre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez un genre</option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                {/* Rôle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="utilisateur">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                    <option value="moderateur">Modérateur</option>
                  </select>
                </div>
                
                {/* Photo */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo de profil</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-gray-400">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, JPEG (MAX. 5MB)
                        </p>
                      </div>
                      <input 
                        type="file" 
                        name="photo" 
                        onChange={handleChange} 
                        className="hidden" 
                        accept="image/*" 
                      />
                    </label>
                  </div>
                  {formData.photo && (
                    <p className="mt-2 text-sm text-gray-600">Fichier sélectionné: {formData.photo.name}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Ajout en cours...
                    </>
                  ) : (
                    'Ajouter l\'utilisateur'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom complet
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Téléphone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rôle
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {utilisateurs.length > 0 ? (
                    utilisateurs.map((utilisateur) => (
                      <tr key={utilisateur.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {utilisateur.photo ? (
                                <img className="h-10 w-10 rounded-full" src={utilisateur.photo} alt="" />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <User className="h-6 w-6 text-gray-500" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{utilisateur.nomComplet}</div>
                              <div className="text-sm text-gray-500 capitalize">{utilisateur.genre}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{utilisateur.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {utilisateur.telephone || 'Non renseigné'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                            {utilisateur.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                        Aucun utilisateur trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUsers;