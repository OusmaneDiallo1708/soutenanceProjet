// const jwt = require('jsonwebtoken');
// const utilisateurModel = require('../models/utilisateurModel');

// module.exports.requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt; // on récupère le cookie JWT
//   if (!token) return res.status(401).json({ message: 'Accès non autorisé' });

//   jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
//     if (err) return res.status(401).json({ message: 'Token invalide' });

//     const utilisateur = await utilisateurModel.findById(decodedToken.id);
//     if (!utilisateur) return res.status(401).json({ message: 'Utilisateur non trouvé' });

//     res.locals.user = utilisateur; // on stocke l'utilisateur pour la route
//     next(); // on laisse la requête continuer vers la route protégée
//   });
// };


const jwt = require("jsonwebtoken");
const utilisateurModel = require("../models/utilisateurModel");

module.exports.requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Accès non autorisé" });

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const utilisateur = await utilisateurModel.findById(decodedToken.id);
    if (!utilisateur) return res.status(401).json({ message: "Utilisateur non trouvé" });

    res.locals.user = utilisateur;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};
