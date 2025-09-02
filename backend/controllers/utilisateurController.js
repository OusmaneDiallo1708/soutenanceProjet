const mongoose = require('mongoose')
const utilisateurModel = require('../models/utilisateurModel')
const bcrypt = require('bcrypt');
const ObjectID = require('mongoose').Types.ObjectId

module.exports.ajoutUtilisateur = async (req, res) => {
    const { nom, prenom, genre, email, telephone, role, motDePasse } = req.body;

    try {
        const utilisateur = await utilisateurModel.create({
            nom,prenom,genre,email,telephone,role,motDePasse});

        res.status(200).json({message:`${prenom} à été ajouter avec succès`,utilisateur});

    } catch (error) {
        console.error("Erreur lors de l'ajout :", error.message);
        res.status(500).json({ message: 'Erreur serveur' });
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
                    nom: req.body.nom,
                    prenom: req.body.prenom,
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
            message: `${utilisateur.prenom} a été modifié avec succès`,
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