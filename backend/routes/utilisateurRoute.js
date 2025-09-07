const mongoose = require('mongoose')
const router = require('express').Router()
const multer = require("multer");
const utilisateurController = require('../controllers/utilisateurController')
const uploadUser = require('../middlewares/uploadUser')
const authController = require('../controllers/authController')
const { requireAuth } = require('../middlewares/requireAuth') // ⬅️ attention à la destructuration


router.post('/ajoutUtilisateur',utilisateurController.ajoutUtilisateur)
// router.post('/ajoutUtilisateur',uploadUser.single("image"),utilisateurController.ajoutUtilisateur)
router.post('/connexion',authController.Connexion)
router.get('/recuperation',authController.GetInfo)
router.get('/logout', requireAuth, authController.Logout);
// router.get('/getAllUtilisateurs',utilisateurController.afficherTousLesUtilisateurs)
router.get('/getAllUtilisateurs', utilisateurController.afficherTousLesUtilisateurs);
router.get('/afficherUnUtilisateur/:id',utilisateurController.afficherUnUtilisateur)
router.put('/modifierUnUtilisateur/:id',utilisateurController.modifierUnUtilisateur)
router.delete('/supprimerUnUtilisateur/:id',utilisateurController.supprimerUnUtilisateur)
module.exports = router