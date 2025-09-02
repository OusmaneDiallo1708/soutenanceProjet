const mongoose = require('mongoose');
const utilisateurModel = require('../models/utilisateurModel');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; // 3 jours en secondes

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

module.exports.Connexion = async (req, res) => {
  const {email, motDepasse} = req.body;

  try {
    if (!email || !motDepasse) {
      return res.status(400).send('Tous les champs sont requis');
    }

    const utilisateur = await utilisateurModel.login(email, motDepasse);
    if (!utilisateur) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

    const token = createToken(utilisateur._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: maxAge * 1000, // en millisecondes
    });

    res.status(200).json({ utilisateur: utilisateur._id });
  } catch (error) {
    res.status(500).json({ message: 'Erreur de connexion', error: error.message });
  }
};

module.exports.Logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 }); // supprime le cookie
    res.status(200).json({ message: 'Déconnexion réussie' });
  };
