const mongoose = require('mongoose')
const ObjectID = require('mongoose').Types.ObjectId
const categorieModel = require('../models/categorieModel')
const produitModel = require('../models/produitModel')
const path = require("path");
const fs = require("fs");

// module.exports.addProduits = async (req, res) => {
//     try {
//       let { categorieId, categories, quantite, prixAchat, prixVente, 
//           stock_min, date_ajout, date_expiration } = req.body;
  
//       // Si on reçoit un objet catégorie complet, extraire l'ID
//       if (!categorieId && categories && categories._id) {
//         categorieId = categories._id;
//       }
  
//       // Vérifier l'ID
//       if (!ObjectID.isValid(categorieId)) {
//         return res.status(400).json({ message: "ID de catégorie invalide" });
//       }
  
//       // Vérifie si la catégorie existe
//       const categorieExistante = await categorieModel.findById(categorieId);
//       if (!categorieExistante) {
//         return res.status(404).json({ message: "Catégorie introuvable" });
//       }
  
//       // Convertir quantite en nombre
//       quantite = Number(quantite);
  
//       // Chercher si un produit avec le même nom et description existe déjà
//       let produitExistant = await produitModel.findOne({ 
//         categorieNom: categorieExistante.categorieNom,
//         categorieDescription: categorieExistante.categorieDescription
//       });
  
//       if (produitExistant) {
//         // Mise à jour de la quantité et du stock
//         produitExistant.quantite += quantite;
//         produitExistant.stock = produitExistant.quantite;
//         await produitExistant.save();
//         return res.status(200).json({ message: "Quantité mise à jour", produit: produitExistant });
//       }
  
//       // Sinon, créer un nouveau produit
//       const nouveauProduit = new produitModel({
//         categorie: categorieId,
//         categorieNom: categorieExistante.categorieNom,
//         categorieDescription: categorieExistante.categorieDescription,
//         quantite,
//         stock: quantite,
//         prixAchat,
//         prixVente,
//         stock_min,
//         date_ajout,
//         date_expiration
//       });
  
//       await nouveauProduit.save();
//       return res.status(201).json({ message: "Produit ajouté", produit: nouveauProduit });
  
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };


// Ajouter un produit
// module.exports.addProduits = async (req, res) => {
//   try {
//     let {
//       categorieId,
//       quantite,
//       prixAchat,
//       prixVente,
//       stock_min,
//       date_ajout,
//       date_expiration,
//     } = req.body;

//     // Vérifier l’ID catégorie
//     if (!mongoose.Types.ObjectId.isValid(categorieId)) {
//       return res.status(400).json({ message: "❌ ID de catégorie invalide" });
//     }

//     // Vérifier si la catégorie existe
//     const categorieExistante = await categorieModel.findById(categorieId);
//     if (!categorieExistante) {
//       return res.status(404).json({ message: "❌ Catégorie introuvable" });
//     }

//     // Forcer le cast des nombres
//     quantite = Number(quantite);
//     prixAchat = Number(prixAchat);
//     prixVente = Number(prixVente);
//     stock_min = Number(stock_min);

//     // Vérifier les valeurs obligatoires
//     if (!quantite || !prixAchat || !prixVente) {
//       return res
//         .status(400)
//         .json({ message: "❌ Données manquantes ou invalides" });
//     }

//     // 🔹 Gestion de l’image
//     if (produitExistant) {
//       produitExistant.quantite += quantite;
//       produitExistant.stock = produitExistant.quantite;
//       if (imagePath) produitExistant.image = imagePath; // maj image si fournie
//       await produitExistant.save();
//       return res.status(200).json({
//         message: "✅ Quantité mise à jour",
//         produit: produitExistant,
//       });
//     }
    

//     // Créer un nouveau produit
//     const nouveauProduit = new produitModel({
//       categorie: categorieId,
//       categorieNom: categorieExistante.nom, // ⚠️ assure-toi que ça existe dans ta BDD
//       categorieDescription: categorieExistante.description,
//       quantite,
//       stock: quantite,
//       prixAchat,
//       prixVente,
//       stock_min,
//       date_ajout,
//       date_expiration,
//       image: imagePath, // ajout image
//     });

//     await nouveauProduit.save();
//     return res.status(201).json({
//       message: "✅ Produit ajouté avec succès",
//       produit: nouveauProduit,
//     });
//   } catch (error) {
//     console.error("Erreur serveur:", error);
//     res.status(500).json({ message: "⚠️ Erreur interne: " + error.message });
//   }
// };

module.exports.addProduits = async (req, res) => {
  try {
    let {
      categorieId,
      quantite,
      prixAchat,
      prixVente,
      stock_min,
      date_ajout,
      date_expiration,
    } = req.body;

    // Vérifier l’ID catégorie
    if (!mongoose.Types.ObjectId.isValid(categorieId)) {
      return res.status(400).json({ message: "❌ ID de catégorie invalide" });
    }

    // Vérifier si la catégorie existe
    const categorieExistante = await categorieModel.findById(categorieId);
    if (!categorieExistante) {
      return res.status(404).json({ message: "❌ Catégorie introuvable" });
    }

    // Forcer le cast des nombres
    quantite = Number(quantite);
    prixAchat = Number(prixAchat);
    prixVente = Number(prixVente);
    stock_min = Number(stock_min);

    if (!quantite || !prixAchat || !prixVente) {
      return res
        .status(400)
        .json({ message: "❌ Données manquantes ou invalides" });
    }

    // 🔹 Gestion de l'image (si tu utilises multer)
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    // 🔹 Vérifier si le produit existe déjà pour cette catégorie
    let produitExistant = await produitModel.findOne({
      categorie: categorieId,
    });

    if (produitExistant) {
      // Ajouter la quantité si le produit existe
      produitExistant.quantite += quantite;
      produitExistant.stock = produitExistant.quantite;
      if (imagePath) produitExistant.image = imagePath;
      await produitExistant.save();

      return res.status(200).json({
        message: "✅ Quantité mise à jour",
        produit: produitExistant,
      });
    }

    // Sinon créer un nouveau produit
    const nouveauProduit = new produitModel({
      categorie: categorieId,
      categorieNom: categorieExistante.nom,
      categorieDescription: categorieExistante.description,
      quantite,
      stock: quantite,
      prixAchat,
      prixVente,
      stock_min,
      date_ajout,
      date_expiration,
      image: imagePath,
    });

    await nouveauProduit.save();

    return res.status(201).json({
      message: "✅ Produit ajouté avec succès",
      produit: nouveauProduit,
    });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return res.status(500).json({ message: "⚠️ Erreur interne: " + error.message });
  }
};



module.exports.getAllProduits = async (req,res)=>{
    try {
        const produit = await  produitModel.find()
        res.status(200).json({message:'Voici la liste Total',produit:produit})
    } catch (error) {
        res.status(400).json({message:'Erreur lors de la recuperation',error:error.message})
    }
}

module.exports.getUnProduits = async (req,res)=>{
    const produitId = req.params.id
    if (!ObjectID) {
        return res.status(400).send("ID invalide");
    }
    try {
        const produit = await produitModel.findById(produitId)
        if(!produitId) return "Identifient non tourve"
        res.status(200).json({
            message:`${produit.nom} a été recuperé avec succés`,
            produit})
    } catch (error) {
        res.status(400).json({message:'Erreur lors de la recuperation',error:error.message})
    }
  }

module.exports.updateProduits = async (req, res) => {
    const produitId = req.params.id;

    if (!ObjectID.isValid(produitId)) {
        return res.status(400).send('ID invalide');
    }

    try {
        const produit = await produitModel.findOneAndUpdate(
            { _id: produitId },
            {
                $set: {
                    quantite: req.body.quantite,
                    stock: req.body.quantite, // mettre à jour automatiquement le stock
                    prixAchat: req.body.prixAchat,
                    prixVente: req.body.prixVente,
                    stock_min: req.body.stock_min,
                    date_ajout: req.body.date_ajout,
                    date_expiration: req.body.date_expiration
                }
            },
            { new: true, runValidators: true }
        );

        if (!produit) {
            return res.status(404).json({ message: 'Identifiant introuvable' });
        }

        // Vérifier si le stock est inférieur au minimum pour alerte
        let alert = false;
        if (produit.sctock < produit.stock_min) {
            alert = true;
        }

        res.status(200).json({
            message: 'Produit modifié avec succès',
            produit: produit,
            alert_stock: alert
        });

    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la modification', error: error.message });
    }
};


module.exports.deleteProduits = async (req,res)=>{
    const produitId = req.params.id
    if (!ObjectID) {
        return res.status(400).send("ID invalide");
    }
    try {
        const produit = await produitModel.findByIdAndDelete(produitId)
        if (!produitId) {
            return res.status(400).send("Identifiant intourvable")
        }
        if (!produitId) return res.status(404).send("Identifiant introuvable");
        res.status(200).json({message:`Produit supprimer avec succès`})
    } catch (error) {
        res.status(400).json({message:'Erreur lors de la suppression',error:error.message})
    }
}


  