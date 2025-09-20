// // import axios from "axios";
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const SignUpForm = () => {
// //   const navigate = useNavigate();

// //   const [nom, setNom] = useState<string>("");
// //   const [prenom, setPrenom] = useState<string>("");
// //   const [genre, setGenre] = useState<string>("");
// //   const [telephone, setTelephone] = useState<string>("");
// //   const [role, setRole] = useState<string>("");
// //   const [email, setEmail] = useState<string>("");
// //   const [password, setPasseWord] = useState<string>("");
// //   const [confirme, setConfirme] = useState<string>("");

// //   // erreurs
// //   const [nomErreur, setNomErreur] = useState<string>("");
// //   const [prenomErreur, setPrenomErreur] = useState<string>("");
// //   const [genreErreur, setGenreErreur] = useState<string>("");
// //   const [telephoneErreur, setTelephoneErreur] = useState<string>("");
// //   const [roleErreur, setRoleErreur] = useState<string>("");
// //   const [emailErreur, setEmailErreur] = useState<string>("");
// //   const [passwordErreur, setPasswordErreur] = useState<string>("");

// //   const handleResister = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     // reset erreurs
// //     setNomErreur("");
// //     setPrenomErreur("");
// //     setGenreErreur("");
// //     setTelephoneErreur("");
// //     setRoleErreur("");
// //     setEmailErreur("");
// //     setPasswordErreur("");

// //     let hasError = false;

// //     if (!nom) {
// //       setNomErreur("⚠️ Le nom est obligatoire");
// //       hasError = true;
// //     }
// //     if (!prenom) {
// //       setPrenomErreur("⚠️ Le prénom est obligatoire");
// //       hasError = true;
// //     }
// //     if (!genre) {
// //       setGenreErreur("⚠️ Veuillez choisir un genre");
// //       hasError = true;
// //     }
// //     if (!telephone) {
// //       setTelephoneErreur("⚠️ Le téléphone est obligatoire");
// //       hasError = true;
// //     }
// //     if (!role) {
// //       setRoleErreur("⚠️ Veuillez choisir un rôle");
// //       hasError = true;
// //     }
// //     if (!email) {
// //       setEmailErreur("⚠️ L'email est obligatoire");
// //       hasError = true;
// //     }
// //     if (!password) {
// //       setPasswordErreur("⚠️ Le mot de passe est obligatoire");
// //       hasError = true;
// //     } else if (password !== confirme) {
// //       setPasswordErreur("⚠️ Le mot de passe et la confirmation ne correspondent pas");
// //       hasError = true;
// //     }

// //     if (hasError) return;

// //     try {
// //       const res = await axios.post(
// //         `${import.meta.env.VITE_APP_URL}/api/user/register`,
// //         { nom, prenom, genre, telephone, role, email, password },
// //         { withCredentials: true }
// //       );
// //       console.log("Inscription réussie :", res.data);
// //       navigate("/"); // Redirection après succès
// //     } catch (error: any) {
// //       console.log("Erreur d'inscription :", error.response?.data || error.message);
// //     }
// //   };

// //   return (
// //     <div className="flex w-full flex-col">
// //       <form
// //         className="justify-center items-center text-center"
// //         id="SigninForm"
// //         onSubmit={handleResister}
// //       >
// //         <h1 className="text-blue-950 text-3xl font-bold border-green-800 border-b-4 mb-4">
// //           Se Connecter
// //         </h1>

// //         {/* Nom + Prénom */}
// //         <div className="flex gap-1 w-full">
// //           <div className="w-full">
// //             <input
// //               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
// //               type="text"
// //               value={nom}
// //               onChange={(e) => setNom(e.target.value)}
// //               placeholder="Nom"
// //             />
// //             {nomErreur && <span className="text-red-500 text-sm">{nomErreur}</span>}
// //           </div>
// //           <div className="w-full">
// //             <input
// //               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
// //               type="text"
// //               value={prenom}
// //               onChange={(e) => setPrenom(e.target.value)}
// //               placeholder="Prenom"
// //             />
// //             {prenomErreur && <span className="text-red-500 text-sm">{prenomErreur}</span>}
// //           </div>
// //         </div>

// //         {/* Genre + Email */}
// //         <div className="flex gap-1 w-full">
// //           <div className="w-full">
// //             <select
// //               onChange={(e) => setGenre(e.target.value)}
// //               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
// //               value={genre}
// //             >
// //               <option value="">------Choisissez un genre---</option>
// //               <option value="Homme">Homme</option>
// //               <option value="Femme">Femme</option>
// //             </select>
// //             {genreErreur && <span className="text-red-500 text-sm">{genreErreur}</span>}
// //           </div>
// //           <div className="w-full">
// //             <input
// //               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               placeholder="Email"
// //             />
// //             {emailErreur && <span className="text-red-500 text-sm">{emailErreur}</span>}
// //           </div>
// //         </div>

// //         {/* Téléphone + Rôle */}
// //         <div className="flex gap-1 w-full">
// //           <div className="w-full">
// //             <input
// //               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
// //               type="text"
// //               value={telephone}
// //               onChange={(e) => setTelephone(e.target.value)}
// //               placeholder="Téléphone"
// //             />
// //             {telephoneErreur && <span className="text-red-500 text-sm">{telephoneErreur}</span>}
// //           </div>
// //           <div className="w-full">
// //             <select
// //               onChange={(e) => setRole(e.target.value)}
// //               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
// //               value={role}
// //             >
// //               <option value="">------Choisissez un rôle---</option>
// //               <option value="visiteur">Visiteur</option>
// //               <option value="admin">Admin</option>
// //               <option value="employe">Employé</option>
// //               <option value="superAdmin">SuperAdmin</option>
// //             </select>
// //             {roleErreur && <span className="text-red-500 text-sm">{roleErreur}</span>}
// //           </div>
// //         </div>

// //         {/* Password + Confirmation */}
// //         <div className="flex gap-1 w-full">
// //           <div className="w-full">
// //             <input
// //               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPasseWord(e.target.value)}
// //               placeholder="Mot de passe"
// //             />
// //           </div>
// //           <div className="w-full">
// //             <input
// //               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
// //               type="password"
// //               value={confirme}
// //               onChange={(e) => setConfirme(e.target.value)}
// //               placeholder="Confirmer"
// //             />
// //           </div>
// //         </div>
// //         {passwordErreur && <span className="text-red-500 text-sm">{passwordErreur}</span>}

// //         <p className="text-right text-lg text-green-800 mb-2 cursor-pointer">
// //           Mot de passe oublié ?
// //         </p>
// //         <button className="bg-blue-950 text-white text-2xl py-2 rounded mb-2 w-full hover:bg-blue-700">
// //           Connexion
// //         </button>
// //         <button className="bg-blue-950 text-white text-2xl py-2 rounded mb-2 w-full hover:bg-blue-700">
// //           Continuer avec Google
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default SignUpForm;

// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SignUpForm = () => {
//   const navigate = useNavigate();

//   const [nom, setNom] = useState<string>("");
//   const [prenom, setPrenom] = useState<string>("");
//   const [genre, setGenre] = useState<string>("");
//   const [telephone, setTelephone] = useState<string>("");
//   const [role, setRole] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPasseWord] = useState<string>("");
//   const [confirme, setConfirme] = useState<string>("");

//   // erreurs → uniquement booléens (true = bordure rouge)
//   const [nomErreur, setNomErreur] = useState<boolean>(false);
//   const [prenomErreur, setPrenomErreur] = useState<boolean>(false);
//   const [genreErreur, setGenreErreur] = useState<boolean>(false);
//   const [telephoneErreur, setTelephoneErreur] = useState<boolean>(false);
//   const [roleErreur, setRoleErreur] = useState<boolean>(false);
//   const [emailErreur, setEmailErreur] = useState<boolean>(false);
//   const [passwordErreur, setPasswordErreur] = useState<boolean>(false);

//   const handleResister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // reset erreurs
//     setNomErreur(false);
//     setPrenomErreur(false);
//     setGenreErreur(false);
//     setTelephoneErreur(false);
//     setRoleErreur(false);
//     setEmailErreur(false);
//     setPasswordErreur(false);

//     let hasError = false;

//     if (!nom) {
//       setNomErreur(true);
//       hasError = true;
//     }
//     if (!prenom) {
//       setPrenomErreur(true);
//       hasError = true;
//     }
//     if (!genre) {
//       setGenreErreur(true);
//       hasError = true;
//     }
//     if (!telephone) {
//       setTelephoneErreur(true);
//       hasError = true;
//     }
//     if (!role) {
//       setRoleErreur(true);
//       hasError = true;
//     }
//     if (!email) {
//       setEmailErreur(true);
//       hasError = true;
//     }
//     if (!password || password !== confirme) {
//       setPasswordErreur(true);
//       hasError = true;
//     }

//     if (hasError) return;

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_APP_URL}/api/utilisateur/ajoutUtilisateur`,
//         { nom, prenom, genre, telephone, role, email, password },
//         { withCredentials: true }
//       );
//       console.log("Inscription réussie :", res.data);
//       navigate("/");
//     } catch (error: any) {
//       console.log("Erreur d'inscription :", error.response?.data || error.message);
//     }
//   };

//   // fonction utilitaire → bordure rouge si erreur
//   const inputClass = (erreur: boolean) =>
//     `border rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800 ${
//       erreur ? "border-red-500" : "border-gray-300"
//     }`;

//   return (
//     <div className="flex w-full flex-col">
//       <form
//         className="justify-center items-center text-center"
//         id="SigninForm"
//         onSubmit={handleResister}
//       >
//         <h1 className="text-blue-950 text-3xl font-bold border-green-800 border-b-4 mb-4">
//           Se Connecter
//         </h1>

//         {/* Nom + Prénom */}
//         <div className="flex gap-1 w-full">
//           <div className="w-full">
//             <input
//               className={inputClass(nomErreur)}
//               type="text"
//               value={nom}
//               onChange={(e) => setNom(e.target.value)}
//               placeholder="Nom"
//             />
//           </div>
//           <div className="w-full">
//             <input
//               className={inputClass(prenomErreur)}
//               type="text"
//               value={prenom}
//               onChange={(e) => setPrenom(e.target.value)}
//               placeholder="Prénom"
//             />
//           </div>
//         </div>

//         {/* Genre + Email */}
//         <div className="flex gap-1 w-full">
//           <div className="w-full">
//             <select
//               onChange={(e) => setGenre(e.target.value)}
//               className={inputClass(genreErreur)}
//               value={genre}
//             >
//               <option value="">------Choisissez un genre---</option>
//               <option value="Homme">Homme</option>
//               <option value="Femme">Femme</option>
//             </select>
//           </div>
//           <div className="w-full">
//             <input
//               className={inputClass(emailErreur)}
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//             />
//           </div>
//         </div>

//         {/* Téléphone + Rôle */}
//         <div className="flex gap-1 w-full">
//           <div className="w-full">
//             <input
//               className={inputClass(telephoneErreur)}
//               type="text"
//               value={telephone}
//               onChange={(e) => setTelephone(e.target.value)}
//               placeholder="Téléphone"
//             />
//           </div>
//           <div className="w-full">
//             <select
//               onChange={(e) => setRole(e.target.value)}
//               className={inputClass(roleErreur)}
//               value={role}
//             >
//               <option value="">------Choisissez un rôle---</option>
//               <option value="visiteur">Visiteur</option>
//               <option value="admin">Admin</option>
//               <option value="employe">Employé</option>
//               <option value="superAdmin">SuperAdmin</option>
//             </select>
//           </div>
//         </div>

//         {/* Password + Confirmation */}
//         <div className="flex gap-1 w-full">
//           <div className="w-full">
//             <input
//               className={inputClass(passwordErreur)}
//               type="password"
//               value={password}
//               onChange={(e) => setPasseWord(e.target.value)}
//               placeholder="Mot de passe"
//             />
//           </div>
//           <div className="w-full">
//             <input
//               className={inputClass(passwordErreur)}
//               type="password"
//               value={confirme}
//               onChange={(e) => setConfirme(e.target.value)}
//               placeholder="Confirmer"
//             />
//           </div>
//         </div>

//         <p className="text-right text-lg text-green-800 mb-2 cursor-pointer">
//           Mot de passe oublié ?
//         </p>
//         <button
//           type="submit"
//           className="bg-blue-950 text-white text-2xl py-2 rounded mb-2 w-full hover:bg-blue-700"
//         >
//           Connexion
//         </button>
//         <button
//           type="button"
//           className="bg-blue-950 text-white text-2xl py-2 rounded mb-2 w-full hover:bg-blue-700"
//         >
//           Continuer avec Google
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;

// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Mail, Lock, User, Phone, ChevronDown, Shield } from "lucide-react";

// const SignUpForm = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     nom: "",
//     prenom: "",
//     genre: "",
//     telephone: "",
//     role: "",
//     email: "",
//     password: "",
//     confirme: ""
//   });

//   const [errors, setErrors] = useState<Record<string, boolean>>({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const newErrors: Record<string, boolean> = {};
//     if (!formData.nom) newErrors.nom = true;
//     if (!formData.prenom) newErrors.prenom = true;
//     if (!formData.genre) newErrors.genre = true;
//     if (!formData.telephone) newErrors.telephone = true;
//     if (!formData.role) newErrors.role = true;
//     if (!formData.email) newErrors.email = true;
//     if (!formData.password || formData.password !== formData.confirme) newErrors.password = true;

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_APP_URL}/api/utilisateur/ajutUtilisateur`,
//         {
//           nom: formData.nom,
//           prenom: formData.prenom,
//           genre: formData.genre,
//           telephone: formData.telephone,
//           role: formData.role,
//           email: formData.email,
//           password: formData.password
//         },
//         { withCredentials: true }
//       );
//       console.log("Inscription réussie :", res.data);
//       navigate("/");
//     } catch (error: any) {
//       console.log("Erreur d'inscription :", error.response?.data || error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const inputClass = (hasError: boolean) =>
//     `w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-600 
//   focus:border-green-600 transition-all duration-200 ${
//       hasError ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
//     }`;

//   const selectClass = (hasError: boolean) =>
//     `w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-600 
//   focus:border-green-600 transition-all duration-200 appearance-none ${
//       hasError ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
//     }`;

//   return (
//     <div className="w-full max-w-3xl mx-auto">
//       <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//         {/* En-tête élégant */}
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 
//           rounded-full flex items-center justify-center mx-auto mb-4">
//             <User className="text-white" size={28} />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Créer un Compte</h1>
//           <p className="text-gray-600">Rejoignez-nous en quelques secondes</p>
//         </div>

//         <form onSubmit={handleRegister} className="space-y-4">
//           {/* Nom + Prénom */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <User className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 className={inputClass(errors.nom)}
//                 type="text"
//                 value={formData.nom}
//                 onChange={(e) => handleChange("nom", e.target.value)}
//                 placeholder="Nom"
//               />
//             </div>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <User className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 className={inputClass(errors.prenom)}
//                 type="text"
//                 value={formData.prenom}
//                 onChange={(e) => handleChange("prenom", e.target.value)}
//                 placeholder="Prénom"
//               />
//             </div>
//           </div>

//           {/* Genre + Email */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <User className="h-5 w-5 text-gray-400" />
//               </div>
//               <select
//                 className={selectClass(errors.genre)}
//                 value={formData.genre}
//                 onChange={(e) => handleChange("genre", e.target.value)}
//               >
//                 <option value="">Genre</option>
//                 <option value="Homme">Homme</option>
//                 <option value="Femme">Femme</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
//               text-gray-400 pointer-events-none" />
//             </div>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 className={inputClass(errors.email)}
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 placeholder="Email"
//               />
//             </div>
//           </div>

//           {/* Téléphone + Rôle */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Phone className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 className={inputClass(errors.telephone)}
//                 type="text"
//                 value={formData.telephone}
//                 onChange={(e) => handleChange("telephone", e.target.value)}
//                 placeholder="Téléphone"
//               />
//             </div>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Shield className="h-5 w-5 text-gray-400" />
//               </div>
//               <select
//                 className={selectClass(errors.role)}
//                 value={formData.role}
//                 onChange={(e) => handleChange("role", e.target.value)}
//               >
//                 <option value="">Rôle</option>
//                 <option value="visiteur">Visiteur</option>
//                 <option value="admin">Admin</option>
//                 <option value="employe">Employé</option>
//                 <option value="superAdmin">SuperAdmin</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4
//                text-gray-400 pointer-events-none" />
//             </div>
//           </div>

//           {/* Password + Confirmation */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 className={inputClass(errors.password)}
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={(e) => handleChange("password", e.target.value)}
//                 placeholder="Mot de passe"
//               />
//             </div>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 className={inputClass(errors.password)}
//                 type={showPassword ? "text" : "password"}
//                 value={formData.confirme}
//                 onChange={(e) => handleChange("confirme", e.target.value)}
//                 placeholder="Confirmation"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-green-600 transition-colors" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 hover:text-green-600 transition-colors" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Bouton d'inscription */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-blue-950 to-green-800 text-white py-3 
//             rounded-lg font-semibold hover:from-blue-900
//              hover:to-green-900 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
//           >
//             {isLoading ? "Création..." : "Créer mon Compte"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;

import React, { useState } from "react";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [motDepasse, setMotDepasse] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Utilisateur créé :", { email, motDepasse });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={motDepasse}
        onChange={(e) => setMotDepasse(e.target.value)}
      />
      <button type="submit">Créer un compte</button>
    </form>
  );
};

export default SignUpForm;


