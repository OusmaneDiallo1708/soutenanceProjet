const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const utilisateurModel = require('../models/utilisateurModel');
const ObjectID = require('mongoose').Types.ObjectId;

// ⚠️ SUPPRIME LE DEUXIÈME require('mongoose') plus bas dans ton fichier !

// ==================== AJOUT UTILISATEUR ====================
module.exports.ajoutUtilisateur = async (req, res) => {
    const { nomComplet, email, motDePasse, genre, telephone, role } = req.body;
  
    let photoPath = null;
    if (req.file) {
        photoPath = `/uploads/user/${req.file.filename}`;
    }
  
    try {
        if (!nomComplet || !email || !motDePasse) {
            return res.status(400).json({ 
                message: "Tous les champs (nom, email, mot de passe) sont obligatoires." 
            });
        }
  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Email invalide." });
        }
  
        const exist = await utilisateurModel.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }
  
        // Création de l'utilisateur (le motDePasse sera hashé automatiquement par le modèle)
        const utilisateur = await utilisateurModel.create({
            nomComplet,
            email,
            motDePasse,  // ← en clair, le modèle le hache
            genre,
            telephone,
            role: role || 'visiteur',
            photo: photoPath,
        });
  
        res.status(201).json({
            message: `${utilisateur.nomComplet} a été ajouté avec succès`,
            utilisateur: {
                _id: utilisateur._id,
                nomComplet: utilisateur.nomComplet,
                email: utilisateur.email,
                role: utilisateur.role
            }
        });
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error.message);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// ==================== AFFICHER TOUS LES UTILISATEURS ====================
module.exports.afficherTousLesUtilisateurs = async (req, res) => {
    try {
        const utilisateur = await utilisateurModel.find().select('-motDePasse');
        res.status(200).json({ 
            message: 'La Liste de tous les Utilisateurs', 
            utilisateur 
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error.message);
        res.status(500).json({ message: 'Erreur Serveur' });
    }
};

// ==================== AFFICHER UN UTILISATEUR ====================
module.exports.afficherUnUtilisateur = async (req, res) => {
    const utilisateurId = req.params.id;
    
    if (!ObjectID.isValid(utilisateurId)) {
        return res.status(400).json({ message: 'Identifiant invalide' });
    }
    
    try {
        const utilisateur = await utilisateurModel.findById(utilisateurId).select('-motDePasse');
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ 
            message: 'Voici l\'Utilisateur', 
            utilisateur 
        });
    } catch (error) {
        console.error('Erreur lors de la récupération:', error.message);
        res.status(500).json({ message: 'Erreur Serveur' });
    }
};

// ==================== MODIFIER UN UTILISATEUR ====================
module.exports.modifierUnUtilisateur = async (req, res) => {
    const utilisateurId = req.params.id;
    
    let photoPath = null;
    if (req.file) {
        photoPath = `/uploads/user/${req.file.filename}`;
    }
    
    if (!ObjectID.isValid(utilisateurId)) {
        return res.status(400).json({ message: 'Identifiant invalide' });
    }
    
    try {
        const updateData = {
            nomComplet: req.body.nomComplet,
            genre: req.body.genre,
            telephone: req.body.telephone,
            role: req.body.role,
        };
        
        if (photoPath) {
            updateData.photo = photoPath;
        }
        
        if (req.body.motDePasse) {
            const salt = await bcrypt.genSalt(10);
            updateData.motDePasse = await bcrypt.hash(req.body.motDePasse, salt);
        }
        
        const utilisateur = await utilisateurModel.findByIdAndUpdate(
            utilisateurId,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        
        res.status(200).json({
            message: `${utilisateur.nomComplet} a été modifié avec succès`,
            utilisateur: {
                _id: utilisateur._id,
                nomComplet: utilisateur.nomComplet,
                email: utilisateur.email,
                role: utilisateur.role
            }
        });
    } catch (error) {
        console.error('Erreur lors de la modification :', error.message);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// ==================== SUPPRIMER UN UTILISATEUR ====================
module.exports.supprimerUnUtilisateur = async (req, res) => {
    const utilisateurId = req.params.id;
    
    if (!ObjectID.isValid(utilisateurId)) {
        return res.status(400).json({ message: 'Identifiant invalide' });
    }
    
    try {
        const utilisateur = await utilisateurModel.findByIdAndDelete(utilisateurId);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ 
            message: 'Suppression effectuée avec succès' 
        });
    } catch (error) {
        console.error('Erreur lors de la suppression:', error.message);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};