// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { User, Mail, Lock, Phone, Eye, EyeOff, Upload, List, UserPlus } from 'lucide-react';

// const AddUsers = () => {
//   const [view, setView] = useState('form'); // 'form' ou 'list'
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [utilisateurs, setUtilisateurs] = useState([]);
  
//   // États pour le formulaire
//   const [formData, setFormData] = useState({
//     nomComplet: '',
//     email: '',
//     motDePasse: '',
//     genre: '',
//     telephone: '',
//     role: 'visiteur',
//     image: null
//   });
  
//   // États pour les erreurs
//   const [errors, setErrors] = useState({
//     nomComplet: '',
//     email: '',
//     motDePasse: '',
//     telephone: ''
//   });

//   // Charger les utilisateurs depuis l'API
//   const fetchUtilisateurs = async () => {
//     try {
//       const response = await axios.get('/api/utilisateur/getAllUtilisateurs');
//       setUtilisateurs(response.data.utilisateur || []);
//     } catch (error) {
//       console.error("Erreur lors du chargement des utilisateurs:", error);
//       setUtilisateurs([]);
//     }
//   };

//   useEffect(() => {
//     if (view === 'list') {
//       fetchUtilisateurs();
//     }
//   }, [view]);

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
    
//     if (name === 'image') {
//       setFormData({ ...formData, image: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
      
//       // Validation en temps réel
//       if (name === 'email' && value && !validateEmail(value)) {
//         setErrors({ ...errors, email: 'Email invalide' });
//       } else if (name === 'email') {
//         setErrors({ ...errors, email: '' });
//       }
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.nomComplet) newErrors.nomComplet = 'Le nom complet est requis';
//     if (!formData.email) {
//       newErrors.email = 'L\'email est requis';
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = 'Email invalide';
//     }
//     if (!formData.motDePasse) newErrors.motDePasse = 'Le mot de passe est requis';
//     if (formData.telephone && !/^[0-9+\s()-]{10,}$/.test(formData.telephone)) {
//       newErrors.telephone = 'Numéro de téléphone invalide';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsLoading(true);
    
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('nomComplet', formData.nomComplet);
//       formDataToSend.append('email', formData.email);
//       formDataToSend.append('motDePasse', formData.motDePasse);
//       formDataToSend.append('genre', formData.genre);
//       formDataToSend.append('telephone', formData.telephone);
//       formDataToSend.append('role', formData.role);
      
//       if (formData.image) {
//         formDataToSend.append('image', formData.image);
//       }
      
//       // Utilisez l'URL correcte selon votre configuration
//       const apiUrl = import.meta.env.VITE_APP_URL 
//         ? `${import.meta.env.VITE_APP_URL}/api/utilisateur/ajoutUtilisateur`
//         : '/api/utilisateur/ajoutUtilisateur';
      
//       const response = await axios.post(apiUrl, formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         withCredentials: true
//       });

//       setShowSuccess(true);
      
//       // Réinitialiser le formulaire
//       setFormData({
//         nomComplet: '',
//         email: '',
//         motDePasse: '',
//         genre: '',
//         telephone: '',
//         role: 'visiteur',
//         image: null
//       });
      
//       // Rafraîchir la liste des utilisateurs
//       fetchUtilisateurs();
      
//       // Cacher le message de succès après 3 secondes
//       setTimeout(() => setShowSuccess(false), 3000);
      
//     } catch (error) {
//       console.error("Erreur lors de l'ajout:", error);
//       if (error.response?.status === 400) {
//         alert(error.response.data.message);
//       } else {
//         alert("Erreur lors de l'ajout de l'utilisateur");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl mt-10 border border-blue-100">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Gestion des Utilisateurs</h1>
//           <p className="text-gray-600 text-center">Ajoutez et gérez les utilisateurs du système</p>
//         </div>
        
//         <div className="flex justify-center p-4 bg-gray-100">
//           <div className="flex space-x-4">
//             <button
//               onClick={() => setView('form')}
//               className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
//                 view === 'form' 
//                   ? 'bg-blue-600 text-white' 
//                   : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//               }`}
//             >
//               <UserPlus size={18} className="mr-2" />
//               Ajouter un utilisateur
//             </button>
//             <button
//               onClick={() => setView('list')}
//               className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
//                 view === 'list' 
//                   ? 'bg-blue-600 text-white' 
//                   : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//               }`}
//             >
//               <List size={18} className="mr-2" />
//               Liste des utilisateurs
//             </button>
//           </div>
//         </div>
        
//         {/* Message de succès */}
//         {showSuccess && (
//           <div className="m-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
//             <p>Utilisateur ajouté avec succès!</p>
//           </div>
//         )}
        
//         <div className="p-6">
//           {view === 'form' ? (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Nom complet */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="nomComplet"
//                       value={formData.nomComplet}
//                       onChange={handleChange}
//                       className={`pl-10 w-full rounded-lg border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         errors.nomComplet ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="Nom et prénom"
//                     />
//                   </div>
//                   {errors.nomComplet && <p className="mt-1 text-sm text-red-600">{errors.nomComplet}</p>}
//                 </div>
                
//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className={`pl-10 w-full rounded-lg border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         errors.email ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="adresse@exemple.com"
//                     />
//                   </div>
//                   {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//                 </div>
                
//                 {/* Mot de passe */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="motDePasse"
//                       value={formData.motDePasse}
//                       onChange={handleChange}
//                       className={`pl-10 pr-10 w-full rounded-lg border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         errors.motDePasse ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="********"
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-5 w-5 text-gray-400" />
//                       ) : (
//                         <Eye className="h-5 w-5 text-gray-400" />
//                       )}
//                     </button>
//                   </div>
//                   {errors.motDePasse && <p className="mt-1 text-sm text-red-600">{errors.motDePasse}</p>}
//                 </div>
                
//                 {/* Téléphone */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Phone className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="tel"
//                       name="telephone"
//                       value={formData.telephone}
//                       onChange={handleChange}
//                       className={`pl-10 w-full rounded-lg border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         errors.telephone ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="0123456789"
//                     />
//                   </div>
//                   {errors.telephone && <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>}
//                 </div>
                
//                 {/* Genre */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
//                   <select
//                     name="genre"
//                     value={formData.genre}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Sélectionnez un genre</option>
//                     <option value="Homme">Homme</option>
//                     <option value="Femme">Femme</option>
//                   </select>
//                 </div>
                
//                 {/* Rôle */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="visiteur">Visiteur</option>
//                     <option value="employé">Employé</option>
//                     <option value="admin">Administrateur</option>
//                     <option value="superAdmin">Super Admin</option>
//                   </select>
//                 </div>
                
//                 {/* image */}
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">image de profil</label>
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-gray-400">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <Upload className="w-8 h-8 mb-3 text-gray-400" />
//                         <p className="mb-2 text-sm text-gray-500">
//                           <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           PNG, JPG, JPEG (MAX. 5MB)
//                         </p>
//                       </div>
//                       <input 
//                         type="file" 
//                         name="image" 
//                         onChange={handleChange} 
//                         className="hidden" 
//                         accept="image/*" 
//                       />
//                     </label>
//                   </div>
//                   {formData.image && (
//                     <p className="mt-2 text-sm text-gray-600">Fichier sélectionné: {formData.image.name}</p>
//                   )}
//                 </div>
//               </div>
              
//               <div className="flex justify-center pt-4">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Ajout en cours...
//                     </>
//                   ) : (
//                     'Ajouter l\'utilisateur'
//                   )}
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Nom complet
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Téléphone
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Rôle
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {utilisateurs && utilisateurs.length > 0 ? (
//                     utilisateurs.map((utilisateur) => (
//                       <tr key={utilisateur._id}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10">
//                               {utilisateur.image ? (
//                                 <img className="h-10 w-10 rounded-full" src={utilisateur.image} alt="" />
//                               ) : (
//                                 <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//                                   <User className="h-6 w-6 text-gray-500" />
//                                 </div>
//                               )}
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-gray-900">{utilisateur.nomComplet}</div>
//                               <div className="text-sm text-gray-500 capitalize">{utilisateur.genre}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">{utilisateur.email}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {utilisateur.telephone || 'Non renseigné'}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
//                             {utilisateur.role}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
//                         Aucun utilisateur trouvé
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddUsers;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Lock, Phone, Eye, EyeOff, Upload, List, UserPlus, X, CheckCircle, AlertCircle } from 'lucide-react';
import ListUsers from './ListUsers';

const AddUsers = () => {
  const [view, setView] = useState('form');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [utilisateurs, setUtilisateurs] = useState([]);
  
  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    motDePasse: '',
    genre: '',
    telephone: '',
    role: 'visiteur',
    photo: null
  });
  
  const [errors, setErrors] = useState({
    nomComplet: '',
    email: '',
    motDePasse: '',
    telephone: ''
  });

  // Notification de succès élégante
  const SuccessNotification = ({ message, onClose }) => (
    <div className="fixed top-6 right-6 z-50 animate-fade-in-down">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-2xl border-l-4 border-white/30 flex items-center space-x-3 max-w-md">
        <CheckCircle className="h-6 w-6 text-white flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold">Succès!</p>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  // Notification d'erreur élégante
  const ErrorNotification = ({ message, onClose }) => (
    <div className="fixed top-6 right-6 z-50 animate-fade-in-down">
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl shadow-2xl border-l-4 border-white/30 flex items-center space-x-3 max-w-md">
        <AlertCircle className="h-6 w-6 text-white flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold">Erreur</p>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get('/api/utilisateur/getAllUtilisateurs');
      setUtilisateurs(response.data.utilisateur || []);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
      setUtilisateurs([]);
    }
  };

  useEffect(() => {
    if (view === 'list') {
      fetchUtilisateurs();
    }
  }, [view]);

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
    if (formData.motDePasse && formData.motDePasse.length < 6) {
      newErrors.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (formData.telephone && !/^[0-9+\s()-]{10,}$/.test(formData.telephone)) {
      newErrors.telephone = 'Numéro de téléphone invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (type, message) => {
    if (type === 'success') {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      setErrorMessage(message);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nomComplet', formData.nomComplet);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('motDePasse', formData.motDePasse);
      formDataToSend.append('genre', formData.genre);
      formDataToSend.append('telephone', formData.telephone);
      formDataToSend.append('role', formData.role);
      
      if (formData.photo) {
        formDataToSend.append('image', formData.photo);
      }
      
      const apiUrl = import.meta.env.VITE_APP_URL 
        ? `${import.meta.env.VITE_APP_URL}/api/utilisateur/ajoutUtilisateur`
        : '/api/utilisateur/ajoutUtilisateur';
      
      const response = await axios.post(apiUrl, formDataToSend, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      showNotification('success', 'Utilisateur ajouté avec succès!');
      
      setFormData({
        nomComplet: '',
        email: '',
        motDePasse: '',
        genre: '',
        telephone: '',
        role: 'visiteur',
        photo: null
      });
      
      fetchUtilisateurs();
      
    } catch (error) {
      console.error("Erreur détaillée lors de l'ajout:", error);
      
      if (error.response?.status === 400) {
        showNotification('error', error.response.data.message || "Données invalides");
      } else if (error.response?.status === 500) {
        showNotification('error', "Erreur serveur. Contactez l'administrateur.");
      } else {
        showNotification('error', "Erreur de connexion au serveur");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header élégant */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent mb-3">
            Gestion des Utilisateurs
          </h1>
          {/* <p className="text-gray-600 text-lg">Ajoutez et gérez les utilisateurs du système</p> */}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Navigation stylée */}
          <div className="flex justify-center p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex space-x-3 bg-white p-2 rounded-2xl shadow-inner">
              <button
                onClick={() => setView('form')}
                className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                  view === 'form' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <UserPlus size={20} className="mr-2" />
                Ajouter un utilisateur
              </button>
              <button
                onClick={() => setView('list')}
                className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                  view === 'list' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <List size={20} className="mr-2" />
                Liste des utilisateurs
              </button>
            </div>
          </div>

          {/* Notifications */}
          {showSuccess && <SuccessNotification message="Utilisateur ajouté avec succès!" onClose={() => setShowSuccess(false)} />}
          {showError && <ErrorNotification message={errorMessage} onClose={() => setShowError(false)} />}

          <div className="p-8">
            {view === 'form' ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Nom complet */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-blue-400" />
                      </div>
                      <input
                        type="text"
                        name="nomComplet"
                        value={formData.nomComplet}
                        onChange={handleChange}
                        className={`pl-12 w-full rounded-xl border-2 py-3 px-4 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all ${
                          errors.nomComplet ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                        }`}
                        placeholder="Nom et prénom"
                      />
                    </div>
                    {errors.nomComplet && <p className="text-red-500 text-sm flex items-center mt-1"><AlertCircle className="h-4 w-4 mr-1" /> {errors.nomComplet}</p>}
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-blue-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`pl-12 w-full rounded-xl border-2 py-3 px-4 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all ${
                          errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                        }`}
                        placeholder="adresse@exemple.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm flex items-center mt-1"><AlertCircle className="h-4 w-4 mr-1" /> {errors.email}</p>}
                  </div>
                  
                  {/* Mot de passe */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-blue-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="motDePasse"
                        value={formData.motDePasse}
                        onChange={handleChange}
                        className={`pl-12 pr-12 w-full rounded-xl border-2 py-3 px-4 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all ${
                          errors.motDePasse ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                        }`}
                        placeholder="********"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.motDePasse && <p className="text-red-500 text-sm flex items-center mt-1"><AlertCircle className="h-4 w-4 mr-1" /> {errors.motDePasse}</p>}
                  </div>
                  
                  {/* Téléphone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-blue-400" />
                      </div>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className={`pl-12 w-full rounded-xl border-2 py-3 px-4 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all ${
                          errors.telephone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                        }`}
                        placeholder="0123456789"
                      />
                    </div>
                    {errors.telephone && <p className="text-red-500 text-sm flex items-center mt-1"><AlertCircle className="h-4 w-4 mr-1" /> {errors.telephone}</p>}
                  </div>
                  
                  {/* Genre */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Genre</label>
                    <div className="relative">
                      <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full rounded-xl border-2 border-gray-200 py-3 px-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all appearance-none"
                      >
                        <option value="">Sélectionnez un genre</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rôle */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rôle</label>
                    <div className="relative">
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full rounded-xl border-2 border-gray-200 py-3 px-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all appearance-none"
                      >
                        <option value="visiteur">Visiteur</option>
                        <option value="employé">Employé</option>
                        <option value="admin">Administrateur</option>
                        <option value="superAdmin">Super Admin</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Photo de profil</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-10 h-10 mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <p className="mb-2 text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                            <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                          </p>
                          <p className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors">
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
                      <p className="text-sm text-blue-600 flex items-center mt-2">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Fichier sélectionné: {formData.photo.name}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Ajout en cours...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5" />
                        <span>Ajouter l'utilisateur</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-2xl shadow-inner border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <ListUsers/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Styles d'animation */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddUsers;
