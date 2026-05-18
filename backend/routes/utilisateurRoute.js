const mongoose = require('mongoose');
const router = require('express').Router();
const multer = require("multer");
const utilisateurController = require('../controllers/utilisateurController');
const uploadUser = require('../middlewares/uploadUser');
const authController = require('../controllers/authController');
const { requireAuth } = require('../middlewares/requireAuth'); // ✅ Garde la destructuration

// ==================== ROUTES PUBLIQUES (sans authentification) ====================

// Inscription - Pas besoin d'auth
router.post('/ajoutUtilisateur', uploadUser.single("photo"), utilisateurController.ajoutUtilisateur);

// Connexion - Pas besoin d'auth
router.post('/connexion', authController.Connexion);

// Déconnexion - Pas besoin d'auth (mais on peut laisser requireAuth si voulu)
router.get('/logout', requireAuth, authController.Logout);

// ==================== ROUTES PROTÉGÉES (avec authentification) ====================

// Profil utilisateur - PROTÉGÉE (nécessite d'être connecté)
router.get('/profil', requireAuth, authController.GetInfo);

// Liste de tous les utilisateurs - PROTÉGÉE (admin seulement si tu veux restreindre)
router.get('/getAllUtilisateurs', requireAuth, utilisateurController.afficherTousLesUtilisateurs);

// Détail d'un utilisateur - PROTÉGÉE
router.get('/getUnUtilisateur/:id', requireAuth, utilisateurController.afficherUnUtilisateur);

// Modification d'un utilisateur - PROTÉGÉE
router.put('/modifierUnUtilisateur/:id', requireAuth, utilisateurController.modifierUnUtilisateur);

// Suppression d'un utilisateur - PROTÉGÉE (admin seulement recommandé)
router.delete('/supprimerUnUtilisateur/:id', requireAuth, utilisateurController.supprimerUnUtilisateur);

module.exports = router;