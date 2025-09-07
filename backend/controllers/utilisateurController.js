const mongoose = require('mongoose')
const utilisateurModel = require('../models/utilisateurModel')
const bcrypt = require('bcrypt');
const ObjectID = require('mongoose').Types.ObjectId

module.exports.ajoutUtilisateur = async (req, res) => {
    const { nomComplet, email, motDePasse } = req.body;
  
    try {
      // Vérifier si tous les champs obligatoires sont remplis
      if (!nomComplet || !email || !motDePasse) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires" });
      }
  
      // Vérifier le format de l'email avec regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email invalide" });
      }
  
      // Vérifier si l'email existe déjà
      const exist = await utilisateurModel.findOne({ email });
      if (exist) {
        return res.status(400).json({ message: "Cet email est déjà utilisé" });
      }
  
      // Création de l’utilisateur
      const utilisateur = await utilisateurModel.create({
        nomComplet,
        email,
        motDePasse,
      });
  
      res
        .status(201)
        .json({ message: `${email} a été ajouté avec succès`, utilisateur });
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error.message);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };  
module.exports.afficherTousLesUtilisateurs = async (req,res)=>{
    try {
        const utilisateur = await utilisateurModel.find().select('-motDePasse')
        res.status(200).json({message:'La Liste de tous les Utilisateur',utilisateur})
    } catch (error) {
        console.send('Erreur lors de la recuperation des utilisateurs',error.message)
        res.status(500).json({message:'Erreur Serveur'})
    }
}
module.exports.afficherUnUtilisateur = async (req,res)=>{
    const utilisateurId = req.params.id
    if (!ObjectID) {
        res.status(400).send('Identifiant invalide')
    }
    try {
        const utilisateur = await utilisateurModel.findById(utilisateurId).select('-motDePasse')
        if(!utilisateurId) return res.status(400).json({message:'Identifiant incorrecte'})
        res.status(200).json({message:'Voici  l\'Utilisateur',utilisateur})
    } catch (error) {
        console.send('Erreur lors de la modificatin',error.message)
        res.status(500).json({message:'Erreur Serveur'})
    }
}

module.exports.modifierUnUtilisateur = async (req, res) => {
    const utilisateurId = req.params.id;
    // 🔹 Gestion de l'image (si tu utilises multer)
    let photoPath = null;
    if (req.file) {
    photoPath = `/uploads/${req.file.filename}`;
    }
    // Vérification si l'ID est valide
    if (!ObjectID.isValid(utilisateurId)) {
        return res.status(400).json({ message: 'Identifiant invalide' });
    }
    try {
        // Si motDePasse envoyé, on le hash
        if (req.body.motDePasse) {
            const salt = await bcrypt.genSalt(10);
            req.body.motDePasse = await bcrypt.hash(req.body.motDePasse, salt);
        }
        const utilisateur = await utilisateurModel.findByIdAndUpdate(
            utilisateurId,
            {
                $set: {
                    nomComplet: req.body.nomComplet,
                    photo:photoPath,
                    genre: req.body.genre,
                    telephone: req.body.telephone,
                    role: req.body.role,
                    motDePasse: req.body.motDePasse // Décommente si tu veux aussi mettre à jour le mot de passe
                }
            },
            { new: true, runValidators: true } // retourne le document mis à jour et valide les données
        );
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.status(200).json({
            message: `${utilisateur.nomComplet} a été modifié avec succès`,
            utilisateur
        });
    } catch (error) {
        console.error('Erreur lors de la modification :', error.message);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports.supprimerUnUtilisateur = async (req,res)=>{
    const utilisateurId = req.params.id
    if (!ObjectID) {
        res.status(400).json({message:'Identifiant ivalide'})
    }
    try {
        const utilisateur = await utilisateurModel.findByIdAndDelete(utilisateurId)
        if(!utilisateur) req.status(400).json({message:'Utilisateur non tourve'})
        res.status(200).json({message:'Suppression effectue avec succès'})
    } catch (error) {
        console.send('Erreur lors de la suppression de l\'utilisateur',error.message)
        res.status(500).json({message:'Erreur serveur'})
    }
}