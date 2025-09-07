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

// module.exports.updateProduits = async (req, res) => {
//     const produitId = req.params.id;

//     if (!ObjectID.isValid(produitId)) {
//         return res.status(400).send('ID invalide');
//     }

//     try {
//         const produit = await produitModel.findOneAndUpdate(
//             { _id: produitId },
//             {
//                 $set: {
//                     quantite: req.body.quantite,
//                     stock: req.body.quantite, // mettre à jour automatiquement le stock
//                     prixAchat: req.body.prixAchat,
//                     prixVente: req.body.prixVente,
//                     stock_min: req.body.stock_min,
//                     date_ajout: req.body.date_ajout,
//                     date_expiration: req.body.date_expiration
//                 }
//             },
//             { new: true, runValidators: true }
//         );

//         if (!produit) {
//             return res.status(404).json({ message: 'Identifiant introuvable' });
//         }

//         // Vérifier si le stock est inférieur au minimum pour alerte
//         let alert = false;
//         if (produit.sctock < produit.stock_min) {
//             alert = true;
//         }

//         res.status(200).json({
//             message: 'Produit modifié avec succès',
//             produit: produit,
//             alert_stock: alert
//         });

//     } catch (error) {
//         res.status(400).json({ message: 'Erreur lors de la modification', error: error.message });
//     }
// };

module.exports.updateProduits = async (req, res) => {
  const produitId = req.params.id;

  if (!ObjectID.isValid(produitId)) {
    return res.status(400).send("ID invalide");
  }

  try {
    const { quantite, prixAchat, prixVente, stock_min, date_ajout, date_expiration } = req.body;

    // Trouver le produit et mettre à jour
    const produit = await produitModel.findOneAndUpdate(
      { _id: produitId },
      {
        $set: {
          quantite: Number(quantite),
          stock: Number(quantite), // mise à jour du stock automatiquement
          prixAchat: Number(prixAchat),
          prixVente: Number(prixVente),
          stock_min: Number(stock_min),
          date_ajout: date_ajout,
          date_expiration: date_expiration,
        }
      },
      { new: true, runValidators: true }
    );

    if (!produit) {
      return res.status(404).json({ message: "Identifiant introuvable" });
    }

    // Vérifier alerte stock
    const alert = produit.stock < produit.stock_min;

    // Mettre à jour le champ alert_stock dans la BDD
    if (alert !== produit.alert_stock) {
      produit.alert_stock = alert;
      await produit.save();
    }

    res.status(200).json({
      message: "Produit modifié avec succès",
      produit,
      alert_stock: alert
    });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la modification", error: error.message });
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

// La statistique
// module.exports.getStatsProduits = async (req, res) => {
//   try {
//     // 🔹 Nombre total de produits
//     const totalProduits = await produitModel.countDocuments();

//     // 🔹 Quantité totale en stock
//     const totalQuantite = await produitModel.aggregate([
//       { $group: { _id: null, total: { $sum: "$quantite" } } }
//     ]);

//     // 🔹 Valeur totale d’achat du stock
//     const valeurStockAchat = await produitModel.aggregate([
//       { $group: { _id: null, total: { $sum: { $multiply: ["$quantite", "$prixAchat"] } } } }
//     ]);

//     // 🔹 Valeur totale de vente potentielle
//     const valeurStockVente = await produitModel.aggregate([
//       { $group: { _id: null, total: { $sum: { $multiply: ["$quantite", "$prixVente"] } } } }
//     ]);

//     // 🔹 Produits sous le stock minimum
//     const produitsAlertes = await produitModel.find({ $expr: { $lt: ["$stock", "$stock_min"] } });

//     // 🔹 Répartition par catégorie
//     const repartitionCategorie = await produitModel.aggregate([
//       {
//         $group: {
//           _id: "$categorieNom",
//           totalProduits: { $sum: 1 },
//           quantiteTotale: { $sum: "$quantite" }
//         }
//       }
//     ]);

//     res.status(200).json({
//       message: "✅ Statistiques produits",
//       stats: {
//         totalProduits,
//         totalQuantite: totalQuantite[0]?.total || 0,
//         valeurStockAchat: valeurStockAchat[0]?.total || 0,
//         valeurStockVente: valeurStockVente[0]?.total || 0,
//         produitsAlertes,
//         repartitionCategorie
//       }
//     });
//   } catch (error) {
//     console.error("Erreur statistiques:", error);
//     res.status(500).json({ message: "❌ Erreur lors de la récupération des statistiques", error: error.message });
//   }
// };
// module.exports.getStatsProduits = async (req, res) => {
//   try {
//     const totalProduits = await produitModel.countDocuments();

//     const totalQuantite = await produitModel.aggregate([
//       { $group: { _id: null, total: { $sum: "$quantite" } } }
//     ]);

//     const valeurStockVente = await produitModel.aggregate([
//       { $group: { _id: null, total: { $sum: { $multiply: ["$quantite", "$prixVente"] } } } }
//     ]);

//     const produitsAlertes = await produitModel.find({ $expr: { $lt: ["$stock", "$stock_min"] } });

//     // 📊 Nouveaux calculs par période
//     const produitsParMois = await produitModel.aggregate([
//       {
//         $group: {
//           _id: { annee: { $year: "$date_ajout" }, mois: { $month: "$date_ajout" } },
//           totalProduits: { $sum: 1 },
//           quantiteTotale: { $sum: "$quantite" }
//         }
//       },
//       { $sort: { "_id.annee": 1, "_id.mois": 1 } }
//     ]);

//     const ventesParMois = await produitModel.aggregate([
//       {
//         $group: {
//           _id: { annee: { $year: "$date_ajout" }, mois: { $month: "$date_ajout" } },
//           revenuPotentiel: { $sum: { $multiply: ["$quantite", "$prixVente"] } }
//         }
//       },
//       { $sort: { "_id.annee": 1, "_id.mois": 1 } }
//     ]);

//     const produitsExpirés = await produitModel.aggregate([
//       { $match: { date_expiration: { $lt: new Date() } } },
//       {
//         $group: {
//           _id: { annee: { $year: "$date_expiration" }, mois: { $month: "$date_expiration" } },
//           totalExpirés: { $sum: 1 }
//         }
//       },
//       { $sort: { "_id.annee": 1, "_id.mois": 1 } }
//     ]);

//     res.status(200).json({
//       message: "✅ Statistiques produits",
//       stats: {
//         totalProduits,
//         totalQuantite: totalQuantite[0]?.total || 0,
//         valeurStockVente: valeurStockVente[0]?.total || 0,
//         produitsAlertes,
//         evolution: {
//           produitsParMois,
//           ventesParMois,
//           produitsExpirés
//         }
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: "❌ Erreur stats", error: error.message });
//   }
// };
// / Statistiques produits
module.exports.getStatsProduits = async (req, res) => {
  try {
    const totalProduits = await produitModel.countDocuments();
    const totalQuantiteAgg = await produitModel.aggregate([
      { $group: { _id: null, total: { $sum: "$quantite" } } }
    ]);
    const totalQuantite = totalQuantiteAgg[0]?.total || 0;
    const valeurStockVenteAgg = await produitModel.aggregate([
      { $group: { _id: null, total: { $sum: { $multiply: ["$quantite", "$prixVente"] } } } }
    ]);
    const valeurStockVente = valeurStockVenteAgg[0]?.total || 0;
    const produitsAlertes = await produitModel.find({ 
      $expr: { $lt: ["$stock", "$stock_min"] } 
    });
    // 🔥 CORRECTION MAJEURE : Formatage correct des données d'évolution
    const produitsParMois = await produitModel.aggregate([
      { 
        $match: { date_ajout: { $exists: true, $ne: null } } // Uniquement les produits avec date
      },
      { 
        $group: { 
          _id: { 
            annee: { $year: "$date_ajout" }, 
            mois: { $month: "$date_ajout" } 
          }, 
          totalProduits: { $sum: 1 },
          quantiteTotale: { $sum: "$quantite" }
        } 
      },
      { $sort: { "_id.annee": 1, "_id.mois": 1 } }
    ]);

    const ventesParMois = await produitModel.aggregate([
      { 
        $match: { date_ajout: { $exists: true, $ne: null } } 
      },
      { 
        $group: { 
          _id: { 
            annee: { $year: "$date_ajout" }, 
            mois: { $month: "$date_ajout" } 
          }, 
          revenuPotentiel: { $sum: { $multiply: ["$quantite", "$prixVente"] } },
          quantiteVendue: { $sum: "$quantite" }
        } 
      },
      { $sort: { "_id.annee": 1, "_id.mois": 1 } }
    ]);

    const produitsExpirés = await produitModel.aggregate([
      { 
        $match: { 
          date_expiration: { $exists: true, $ne: null, $lt: new Date() } 
        } 
      },
      { 
        $group: { 
          _id: { 
            annee: { $year: "$date_expiration" }, 
            mois: { $month: "$date_expiration" } 
          }, 
          totalExpirés: { $sum: 1 },
          quantiteExpiree: { $sum: "$quantite" }
        } 
      },
      { $sort: { "_id.annee": 1, "_id.mois": 1 } }
    ]);

    // 🔥 Formatage des données pour le frontend
    const stats = {
      totalProduits,
      totalQuantite,
      valeurStockVente,
      produitsAlertes: produitsAlertes.map(prod => ({
        _id: prod._id,
        categorieNom: prod.categorieNom,
        stock: prod.stock,
        stock_min: prod.stock_min
      })),
      evolution: {
        produitsParMois: produitsParMois.map(item => ({
          _id: item._id,
          totalProduits: item.totalProduits,
          quantiteTotale: item.quantiteTotale,
          label: `${item._id.mois.toString().padStart(2, '0')}/${item._id.annee}`
        })),
        ventesParMois: ventesParMois.map(item => ({
          _id: item._id,
          revenuPotentiel: item.revenuPotentiel,
          quantiteVendue: item.quantiteVendue,
          label: `${item._id.mois.toString().padStart(2, '0')}/${item._id.annee}`
        })),
        produitsExpirés: produitsExpirés.map(item => ({
          _id: item._id,
          totalExpirés: item.totalExpirés,
          quantiteExpiree: item.quantiteExpiree,
          label: `${item._id.mois.toString().padStart(2, '0')}/${item._id.annee}`
        }))
      }
    };

    res.status(200).json({
      message: "Statistiques produits",
      stats
    });

  } catch (error) {
    console.error("Erreur statistiques:", error);
    res.status(500).json({ message: "Erreur statistiques", error: error.message });
  }
};


  