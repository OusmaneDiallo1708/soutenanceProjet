// const mongoose = require('mongoose');
// const utilisateurModel = require('../models/utilisateurModel');
// const jwt = require('jsonwebtoken');

// const maxAge = 3 * 24 * 60 * 60; // 3 jours en secondes

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
// };

// module.exports.Connexion = async (req, res) => {
//   const {email, motDepasse} = req.body;

//   try {
//     if (!email || !motDepasse) {
//       return res.status(400).send('Tous les champs sont requis');
//     }

//     const utilisateur = await utilisateurModel.login(email, motDepasse);
//     if (!utilisateur) {
//         return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
//       }

//     const token = createToken(utilisateur._id);

//     res.cookie('jwt', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: maxAge * 1000, // en millisecondes
//     });

//     res.status(200).json({ utilisateur: utilisateur._id });
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur de connexion', error: error.message });
//   }
// };
// module.exports.GetInfo =  (req,res) => {
//   {
//       if (res.locals.user) {
//         res.json({
//           prenom: res.locals.user.prenom, // assure-toi que ton modèle contient "prenom"
//           photo: res.locals.user.photo,   // idem pour "photo"
//         });
//       } else {
//         res.status(401).json({ message: "Utilisateur non connecté" });
//       }
//   }
// }

// module.exports.Logout = (req, res) => {
//     res.cookie('jwt', '', { maxAge: 1 }); // supprime le cookie
//     res.status(200).json({ message: 'Déconnexion réussie' });
//   };

// controllers/utilisateurController.js
const jwt = require('jsonwebtoken');
const utilisateurModel = require('../models/utilisateurModel');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

// ==================== CONNEXION ====================
module.exports.Connexion = async (req, res) => {
  console.log("📥 BODY reçu:", req.body);
  
  const { email, motDePasse } = req.body;

  try {
    if (!email || !motDePasse) {
      console.log("❌ Champs manquants");
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    console.log("🔍 Recherche de l'utilisateur:", email);
    const utilisateur = await utilisateurModel.login(email, motDePasse);
    
    if (!utilisateur) {
      console.log("❌ Utilisateur non trouvé ou mot de passe incorrect");
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    console.log("✅ Utilisateur trouvé:", utilisateur.email);
    const token = createToken(utilisateur._id);
    console.log("✅ Token généré");

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: maxAge * 1000,
    });

    // Réponse complète pour le frontend
    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      token: token,
      utilisateur: {
        _id: utilisateur._id,
        nomComplet: utilisateur.nomComplet,
        email: utilisateur.email,
        role: utilisateur.role,
        photo: utilisateur.photo || null
      }
    });

  } catch (error) {
    console.error("❌ Erreur complète:", error);
    res.status(500).json({ 
      message: 'Erreur de connexion', 
      error: error.message 
    });
  }
};

// ==================== RÉCUPÉRER LES INFOS ====================
module.exports.GetInfo = (req, res) => {
  console.log("🔍 GetInfo - req.user:", req.user);
  console.log("🔍 GetInfo - res.locals.user:", res.locals.user);
  
  const user = req.user || res.locals.user;
  
  if (user) {
    res.json({
      _id: user._id,
      nomComplet: user.nomComplet,
      email: user.email,
      photo: user.photo || null,
      role: user.role
    });
  } else {
    res.status(401).json({ message: "Utilisateur non connecté" });
  }
};

// ==================== DÉCONNEXION ====================
module.exports.Logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'Déconnexion réussie' });
};