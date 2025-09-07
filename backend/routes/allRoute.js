// const mongoose = require('mongoose')
// const router = require('express').Router()
// const multer = require("multer");
// const upload = require("../middlewares/upload");
// const categorieController = require('../controllers/categorieController')
// const produitController = require('../controllers/produitController')
// const venteController = require('../controllers/venteController')
// const { getAllProduits } = require('../controllers/produitController');

// // Les Categories
// router.post('/addCategorie',categorieController.addCategories)
// router.get('/getAllCategorie',categorieController.getAllCategories)
// router.get('/getUnCateroie/:id',categorieController.getUnCateroies)
// router.put('/updateCategorie/:id',categorieController.updateCategories)
// router.delete('/deleteCategorie/:id',categorieController.deleteCategories)

// //Les Produits
// router.post('/addProduit',upload.single("image"),produitController.addProduits)
// // router.get("/stats", produitController.getStatsProduits);
// router.get("/stats", produitController.getStatsProduits);
// router.get('/getAllProduit',produitController.getAllProduits)
// router.get('/getUnProduit/:id',produitController.getUnProduits)
// router.put('/updateProduit/:id',produitController.updateProduits)
// router.delete('/deleteProduit/:id',produitController.deleteProduits)
// //Les Produits
// router.post('/addVente',venteController.addVente)
// router.get('/getAllVente',venteController.getAllVentes)
// router.get('/getUnVente/:id',venteController.getUneVente)
// router.put('/updateVente/:id',venteController.updateVente)
// router.delete('/deleteVente/:id',venteController.deleteVente)









// module.exports = router
const mongoose = require('mongoose');
const router = require('express').Router();
const multer = require("multer");
const upload = require("../middlewares/upload");
const categorieController = require('../controllers/categorieController');
const produitController = require('../controllers/produitController');
const venteController = require('../controllers/venteController');

// ------------------- CATEGORIES -------------------
router.post('/addCategorie', categorieController.addCategories);
router.get('/getAllCategorie', categorieController.getAllCategories);
router.get('/getUnCategorie/:id', categorieController.getUnCateroies);
router.put('/updateCategorie/:id', categorieController.updateCategories);
router.delete('/deleteCategorie/:id', categorieController.deleteCategories);

// ------------------- PRODUITS -------------------
router.post('/addProduit', upload.single("image"), produitController.addProduits);
router.get('/stats', produitController.getStatsProduits);
router.get('/getAllProduit', produitController.getAllProduits);
router.get('/getUnProduit/:id', produitController.getUnProduits);
router.put('/updateProduit/:id', produitController.updateProduits);
router.delete('/deleteProduit/:id', produitController.deleteProduits);

// ------------------- VENTES -------------------
router.post('/addVente', venteController.addVente);
router.get('/getAllVente', venteController.getAllVentes);
router.get('/getUnVente/:id', venteController.getUneVente);
router.put('/updateVente/:id', venteController.updateVente);
router.delete('/deleteVente/:id', venteController.deleteVente);

module.exports = router;
