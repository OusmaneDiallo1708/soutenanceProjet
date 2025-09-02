const mongoose = require('mongoose')
const router = require('express').Router()
const utilisateurController = require('../controllers/utilisateurController')
const authController = require('../controllers/authController')
const { requireAuth } = require('../middlewares/requireAuth') // ⬅️ attention à la destructuration


router.post('/ajoutUtilisateur',utilisateurController.ajoutUtilisateur)
router.post('/connexion',authController.Connexion)
router.get('/logout', requireAuth, authController.Logout);
router.get('/afficherTous',utilisateurController.afficherTousLesUtilisateurs)
router.get('/afficherUnUtilisateur/:id',utilisateurController.afficherUnUtilisateur)
router.put('/modifierUnUtilisateur/:id',utilisateurController.modifierUnUtilisateur)
router.delete('/supprimerUnUtilisateur/:id',utilisateurController.supprimerUnUtilisateur)
module.exports = router