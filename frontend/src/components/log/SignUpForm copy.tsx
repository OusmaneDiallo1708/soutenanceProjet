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

//   // erreurs
//   const [nomErreur, setNomErreur] = useState<string>("");
//   const [prenomErreur, setPrenomErreur] = useState<string>("");
//   const [genreErreur, setGenreErreur] = useState<string>("");
//   const [telephoneErreur, setTelephoneErreur] = useState<string>("");
//   const [roleErreur, setRoleErreur] = useState<string>("");
//   const [emailErreur, setEmailErreur] = useState<string>("");
//   const [passwordErreur, setPasswordErreur] = useState<string>("");

//   const handleResister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // reset erreurs
//     setNomErreur("");
//     setPrenomErreur("");
//     setGenreErreur("");
//     setTelephoneErreur("");
//     setRoleErreur("");
//     setEmailErreur("");
//     setPasswordErreur("");

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
//     if (!password) {
//       setPasswordErreur("⚠️ Le mot de passe est obligatoire");
//       hasError = true;
//     } else if (password !== confirme) {
//       setPasswordErreur("⚠️ Le mot de passe et la confirmation ne correspondent pas");
//       hasError = true;
//     }

//     if (hasError) return;

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_APP_URL}/api/user/register`,
//         { nom, prenom, genre, telephone, role, email, password },
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

//         {/* Password + Confirmation */}
//         <div className="flex gap-1 w-full">
//           <div className="w-full">
//             <input
//               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
//               type="password"
//               value={password}
//               onChange={(e) => setPasseWord(e.target.value)}
//               placeholder="Mot de passe"
//             />
//           </div>
//           <div className="w-full">
//             <input
//               className="border border-t-gray-300 rounded px-4 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
//               type="password"
//               value={confirme}
//               onChange={(e) => setConfirme(e.target.value)}
//               placeholder="Confirmer"
//             />
//           </div>
//         </div>
//         {passwordErreur && <span className="text-red-500 text-sm">{passwordErreur}</span>}

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

const SignUpForm = () => {
  const navigate = useNavigate();

  const [nom, setNom] = useState<string>("");
  const [prenom, setPrenom] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPasseWord] = useState<string>("");
  const [confirme, setConfirme] = useState<string>("");

  // erreurs → uniquement booléens (true = bordure rouge)
  const [nomErreur, setNomErreur] = useState<boolean>(false);
  const [prenomErreur, setPrenomErreur] = useState<boolean>(false);
  const [genreErreur, setGenreErreur] = useState<boolean>(false);
  const [telephoneErreur, setTelephoneErreur] = useState<boolean>(false);
  const [roleErreur, setRoleErreur] = useState<boolean>(false);
  const [emailErreur, setEmailErreur] = useState<boolean>(false);
  const [passwordErreur, setPasswordErreur] = useState<boolean>(false);

  const handleResister = async (e: React.FormEvent) => {
    e.preventDefault();

    // reset erreurs
    setNomErreur(false);
    setPrenomErreur(false);
    setGenreErreur(false);
    setTelephoneErreur(false);
    setRoleErreur(false);
    setEmailErreur(false);
    setPasswordErreur(false);

    let hasError = false;

    if (!nom) {
      setNomErreur(true);
      hasError = true;
    }
    if (!prenom) {
      setPrenomErreur(true);
      hasError = true;
    }
    if (!genre) {
      setGenreErreur(true);
      hasError = true;
    }
    if (!telephone) {
      setTelephoneErreur(true);
      hasError = true;
    }
    if (!role) {
      setRoleErreur(true);
      hasError = true;
    }
    if (!email) {
      setEmailErreur(true);
      hasError = true;
    }
    if (!password || password !== confirme) {
      setPasswordErreur(true);
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/utilisateur/ajoutUtilisateur`,
        { nom, prenom, genre, telephone, role, email, password },
        { withCredentials: true }
      );
      console.log("Inscription réussie :", res.data);
      navigate("/");
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
        id="SigninForm"
        onSubmit={handleResister}
      >
        <h1 className="text-blue-950 text-3xl font-bold border-green-800 border-b-4 mb-4">
          Se Connecter
        </h1>

        {/* Nom + Prénom */}
        <div className="flex gap-1 w-full">
          <div className="w-full">
            <input
              className={inputClass(nomErreur)}
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom"
            />
          </div>
          <div className="w-full">
            <input
              className={inputClass(prenomErreur)}
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Prénom"
            />
          </div>
        </div>

        {/* Genre + Email */}
        <div className="flex gap-1 w-full">
          <div className="w-full">
            <select
              onChange={(e) => setGenre(e.target.value)}
              className={inputClass(genreErreur)}
              value={genre}
            >
              <option value="">------Choisissez un genre---</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>
          </div>
          <div className="w-full">
            <input
              className={inputClass(emailErreur)}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
        </div>

        {/* Téléphone + Rôle */}
        <div className="flex gap-1 w-full">
          <div className="w-full">
            <input
              className={inputClass(telephoneErreur)}
              type="text"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Téléphone"
            />
          </div>
          <div className="w-full">
            <select
              onChange={(e) => setRole(e.target.value)}
              className={inputClass(roleErreur)}
              value={role}
            >
              <option value="">------Choisissez un rôle---</option>
              <option value="visiteur">Visiteur</option>
              <option value="admin">Admin</option>
              <option value="employe">Employé</option>
              <option value="superAdmin">SuperAdmin</option>
            </select>
          </div>
        </div>

        {/* Password + Confirmation */}
        <div className="flex gap-1 w-full">
          <div className="w-full">
            <input
              className={inputClass(passwordErreur)}
              type="password"
              value={password}
              onChange={(e) => setPasseWord(e.target.value)}
              placeholder="Mot de passe"
            />
          </div>
          <div className="w-full">
            <input
              className={inputClass(passwordErreur)}
              type="password"
              value={confirme}
              onChange={(e) => setConfirme(e.target.value)}
              placeholder="Confirmer"
            />
          </div>
        </div>

        <p className="text-right text-lg text-green-800 mb-2 cursor-pointer">
          Mot de passe oublié ?
        </p>
        <button
          type="submit"
          className="bg-blue-950 text-white text-2xl py-2 rounded mb-2 w-full hover:bg-blue-700"
        >
          Connexion
        </button>
        <button
          type="button"
          className="bg-blue-950 text-white text-2xl py-2 rounded mb-2 w-full hover:bg-blue-700"
        >
          Continuer avec Google
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
