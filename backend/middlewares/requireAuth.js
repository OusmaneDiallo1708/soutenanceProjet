const jwt = require('jsonwebtoken');
const utilisateurModel = require('../models/utilisateurModel');

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt; // on récupère le cookie JWT
  if (!token) return res.status(401).json({ message: 'Accès non autorisé' });

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
    if (err) return res.status(401).json({ message: 'Token invalide' });

    const utilisateur = await utilisateurModel.findById(decodedToken.id);
    if (!utilisateur) return res.status(401).json({ message: 'Utilisateur non trouvé' });

    res.locals.user = utilisateur; // on stocke l'utilisateur pour la route
    next(); // on laisse la requête continuer vers la route protégée
  });
};
