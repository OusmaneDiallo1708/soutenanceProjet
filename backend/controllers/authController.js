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

const maxAge = 3 * 24 * 60 * 60; // 3 jours en secondes

// Génération du token JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

// Connexion utilisateur
module.exports.Connexion = async (req, res) => {
  const { email, motDepasse } = req.body;

  try {
    if (!email || !motDepasse) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérifie l'utilisateur dans la base
    const utilisateur = await utilisateurModel.login(email, motDepasse);
    if (!utilisateur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Création du token
    const token = createToken(utilisateur._id);

    // ⚡️ Envoi du cookie httpOnly sécurisé
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // pour dev local
      maxAge: maxAge * 1000, // en millisecondes
    });

    // ⚡️ Renvoie du token dans le JSON pour React
    res.status(200).json({
      message: 'Connexion réussie',
      token, // frontend peut le stocker
      utilisateur: {
        id: utilisateur._id,
        pseudo: utilisateur.pseudo,
        email: utilisateur.email
      }
    });

  } catch (error) {
    console.error("Erreur connexion :", error);
    res.status(500).json({ message: 'Erreur de connexion', error: error.message });
  }
};

// Récupérer les infos utilisateur depuis le middleware checkUser
module.exports.GetInfo = (req, res) => {
  if (res.locals.user) {
    res.json({
      pseudo: res.locals.user.pseudo,
      email: res.locals.user.email,
      photo: res.locals.user.photo || null
    });
  } else {
    res.status(401).json({ message: "Utilisateur non connecté" });
  }
};

// Déconnexion
module.exports.Logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); // supprime le cookie
  res.status(200).json({ message: 'Déconnexion réussie' });
};
