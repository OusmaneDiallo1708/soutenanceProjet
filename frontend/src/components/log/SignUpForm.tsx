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
//   const [motDePasse, setPasseWord] = useState<string>("");
//   const [confirme, setConfirme] = useState<string>("");

//   // erreurs
//   const [nomErreur, setNomErreur] = useState<string>("");
//   const [prenomErreur, setPrenomErreur] = useState<string>("");
//   const [genreErreur, setGenreErreur] = useState<string>("");
//   const [telephoneErreur, setTelephoneErreur] = useState<string>("");
//   const [roleErreur, setRoleErreur] = useState<string>("");
//   const [emailErreur, setEmailErreur] = useState<string>("");
//   const [motDePasseErreur, setmotDePasseErreur] = useState<string>("");

//   const handleResister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // reset erreurs
//     setNomErreur("");
//     setPrenomErreur("");
//     setGenreErreur("");
//     setTelephoneErreur("");
//     setRoleErreur("");
//     setEmailErreur("");
//     setmotDePasseErreur("");

//     let hasError = false;

//     if (!nom) {
//       setNomErreur("⚠️ Le nom est obligatoire");
//       hasError = true;
//     }
//     if (!prenom) {
//       setPrenomErreur("⚠️ Le prénom est obligatoire");
//       hasError = true;
//     }
//     if (!genre) {
//       setGenreErreur("⚠️ Veuillez choisir un genre");
//       hasError = true;
//     }
//     if (!telephone) {
//       setTelephoneErreur("⚠️ Le téléphone est obligatoire");
//       hasError = true;
//     }
//     if (!role) {
//       setRoleErreur("⚠️ Veuillez choisir un rôle");
//       hasError = true;
//     }
//     if (!email) {
//       setEmailErreur("⚠️ L'email est obligatoire");
//       hasError = true;
//     }
//     if (!motDePasse) {
//       setmotDePasseErreur("⚠️ Le mot de passe est obligatoire");
//       hasError = true;
//     } else if (motDePasse !== confirme) {
//       setmotDePasseErreur("⚠️ Le mot de passe et la confirmation ne correspondent pas");
//       hasError = true;
//     }

//     if (hasError) return;

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_APP_URL}/api/user/register`,
//         { nom, prenom, genre, telephone, role, email, motDePasse },
//         { withCredentials: true }
//       );
//       console.log("Inscription réussie :", res.data);
//       navigate("/"); // Redirection après succès
//     } catch (error: any) {
//       console.log("Erreur d'inscription :", error.response?.data || error.message);
//     }
//   };

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
//               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
//               type="text"
//               value={nom}
//               onChange={(e) => setNom(e.target.value)}
//               placeholder="Nom"
//             />
//             {nomErreur && <span className="text-red-500 text-sm">{nomErreur}</span>}
//           </div>
//           <div className="w-full">
//             <input
//               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
//               type="text"
//               value={prenom}
//               onChange={(e) => setPrenom(e.target.value)}
//               placeholder="Prenom"
//             />
//             {prenomErreur && <span className="text-red-500 text-sm">{prenomErreur}</span>}
//           </div>
//         </div>

//         {/* Genre + Email */}
//         <div className="flex gap-1 w-full">
//           <div className="w-full">
//             <select
//               onChange={(e) => setGenre(e.target.value)}
//               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
//               value={genre}
//             >
//               <option value="">------Choisissez un genre---</option>
//               <option value="Homme">Homme</option>
//               <option value="Femme">Femme</option>
//             </select>
//             {genreErreur && <span className="text-red-500 text-sm">{genreErreur}</span>}
//           </div>
//           <div className="w-full">
//             <input
//               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//             />
//             {emailErreur && <span className="text-red-500 text-sm">{emailErreur}</span>}
//           </div>
//         </div>

//         {/* Téléphone + Rôle */}
//         <div className="flex gap-1 w-full">
//           <div className="w-full">
//             <input
//               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
//               type="text"
//               value={telephone}
//               onChange={(e) => setTelephone(e.target.value)}
//               placeholder="Téléphone"
//             />
//             {telephoneErreur && <span className="text-red-500 text-sm">{telephoneErreur}</span>}
//           </div>
//           <div className="w-full">
//             <select
//               onChange={(e) => setRole(e.target.value)}
//               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
//               value={role}
//             >
//               <option value="">------Choisissez un rôle---</option>
//               <option value="visiteur">Visiteur</option>
//               <option value="admin">Admin</option>
//               <option value="employe">Employé</option>
//               <option value="superAdmin">SuperAdmin</option>
//             </select>
//             {roleErreur && <span className="text-red-500 text-sm">{roleErreur}</span>}
//           </div>
//         </div>

//         {/* motDePasse + Confirmation */}
//         <div className="flex gap-1 w-full">
//           <div className="w-full">
//             <input
//               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
//               type="motDePasse"
//               value={motDePasse}
//               onChange={(e) => setPasseWord(e.target.value)}
//               placeholder="Mot de passe"
//             />
//           </div>
//           <div className="w-full">
//             <input
//               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
//               type="motDePasse"
//               value={confirme}
//               onChange={(e) => setConfirme(e.target.value)}
//               placeholder="Confirmer"
//             />
//           </div>
//         </div>
//         {motDePasseErreur && <span className="text-red-500 text-sm">{motDePasseErreur}</span>}

//         <p className="text-right text-lg text-green-800 mb-2 cursor-pointer">
//           Mot de passe oublié ?
//         </p>
//         <button className="bg-blue-950 text-white text-2xl py-2 rounded mb-2 w-full hover:bg-blue-700">
//           Connexion
//         </button>
//         <button className="bg-blue-950 text-white text-2xl py-2 rounded mb-2 w-full hover:bg-blue-700">
//           Continuer avec Google
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ setIsLogin}: { setIsLogin: (val: boolean) => void }) => {
  const navigate = useNavigate();

  const [nomComplet, setnomComlet] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [motDePasse, setPasseWord] = useState<string>("");
  const [confirme, setConfirme] = useState<string>("");

  // erreurs → uniquement booléens (true = bordure rouge)
  const [nomCompletErreur, setNomComletErreur] = useState<boolean>(false);
  const [emailErreur, setEmailErreur] = useState<boolean>(false);
  const [motDePasseErreur, setmotDePasseErreur] = useState<boolean>(false);

  const handleResister = async (e: React.FormEvent) => {
    e.preventDefault();

    // reset erreurs
    setNomComletErreur(false);
    setEmailErreur(false);
    setmotDePasseErreur(false);

    let hasError = false;
    if (!nomComplet) {
      setNomComletErreur(true);
      hasError = true;
    }
    if (!email) {
      setEmailErreur(true);
      hasError = true;
    }
    if (!motDePasse || motDePasse !== confirme) {
      setmotDePasseErreur(true);
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/utilisateur/ajoutUtilisateur`,
        { nomComplet, email, motDePasse },
        { withCredentials: true }
      );
      console.log("Inscription réussie :", res.data);
      // ✅ vider les champs après enregistrement
      setnomComlet("");
      setEmail("");
      setPasseWord("");
      setConfirme("");
      // navigate("/profil");
      // ✅ rediriger vers login (même page)
      setIsLogin(true);
    } catch (error: any) {
      console.log("Erreur d'inscription :", error.response?.data || error.message);
    }
  };

  // fonction utilitaire → bordure rouge si erreur
  const inputClass = (erreur: boolean) =>
    `border rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800 ${
      erreur ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="flex w-full flex-col">
  <form
    className="justify-center items-center text-center"
    id="SignUpForm"
    onSubmit={handleResister}
  >
    <h1 className="text-blue-950 text-3xl font-bold border-green-800 
    border-b-4 mb-6">S'inscrire</h1>

    {/* Champ nomComplet */}
    <input
      className={`border border-t-gray-300 rounded px-4 py-2 mb-5 w-full
      focus:outline-none focus:ring-2 focus:ring-green-800 ${inputClass(nomCompletErreur)}`}
      type="text"
      value={nomComplet}
      onChange={(e) => setnomComlet(e.target.value)}
      placeholder="Nom et Prénom"
    /><br />
    <span className="text-red-500 text-sm mb-2">{nomCompletErreur}</span> <br />
    {/* Champ Email */}
    <input
      className={`border border-t-gray-300 rounded px-4 py-2 mb-5 w-full
      focus:outline-none focus:ring-2 focus:ring-green-800 ${inputClass(emailErreur)}`}
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
    /><br />
    <span className="text-red-500 text-sm mb-2">{emailErreur}</span> <br />

    {/* Champ Mot de passe */}
    <input
      className={`border border-t-gray-300 rounded px-4 py-2 mb-5 w-full
      focus:outline-none focus:ring-2 focus:ring-green-800 ${inputClass(motDePasseErreur)}`}
      type="text"
      value={motDePasse}
      onChange={(e) => setPasseWord(e.target.value)}
      placeholder="Mot de passe"
    /><br />
    <span className="text-red-500 text-sm mb-2">{motDePasseErreur}</span> <br />

    {/* Champ Confirmation */}
    <input
      className={`border border-t-gray-300 rounded px-4 py-2 mb-5 w-full
      focus:outline-none focus:ring-2 focus:ring-green-800 ${inputClass(motDePasseErreur)}`}
      type="text"
      value={confirme}
      onChange={(e) => setConfirme(e.target.value)}
      placeholder="Confirmer le mot de passe"
    /><br />
    <span className="text-red-500 text-sm mb-2">{motDePasseErreur}</span> <br />

    {/* Bouton Connexion */}
    <button
      type="submit"
      className="bg-blue-950 text-white text-2xl py-2 rounded mb-4 w-full hover:bg-blue-700"
    >
      Inscription
    </button><br />

    {/* Bouton Google */}
    <button
      type="button"
      className="bg-blue-950 text-white text-2xl py-2 rounded mb-4 w-full hover:bg-blue-700"
    >
      Continuer avec Google
    </button><br />
  </form>
</div>

  );
};

export default SignUpForm;
