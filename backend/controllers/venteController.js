// const mongoose = require('mongoose');
// const ObjectID = mongoose.Types.ObjectId;
// const venteModel = require('../models/venteModel');
// const produitModel = require('../models/produitModel');
// const utilisateurModel = require('../models/utilisateurModel');


// // Ajouter une vente
// module.exports.addVente = async (req, res) => {
//     try {
//         let { produitId, utilisateurId, quantite, prix_unitaire, date_vente } = req.body;

//         // Vérification ID produit
//         if (!ObjectID.isValid(produitId)) {
//             return res.status(400).json({ message: "ID produit invalide" });
//         }

//         // Vérification ID utilisateur
//         if (!ObjectID.isValid(utilisateurId)) {
//             return res.status(400).json({ message: "ID utilisateur invalide" });
//         }

//         // Vérifier si le produit existe
//         const produit = await produitModel.findById(produitId);
//         if (!produit) {
//             return res.status(404).json({ message: "Produit introuvable" });
//         }

//         // Vérifier si l'utilisateur existe
//         const utilisateur = await utilisateurModel.findById(utilisateurId);
//         if (!utilisateur) {
//             return res.status(404).json({ message: "Utilisateur introuvable" });
//         }

//         // Vérifier stock suffisant
//         if (produit.sctock < quantite) { // ⚠️ Change en produit.stock si ton champ s'appelle stock
//             return res.status(400).json({ message: "Stock insuffisant" });
//         }

//         // Créer la vente
//         const nouvelleVente = new venteModel({
//             produit: produitId,
//             produitNom: produit.categorieNom, // nécessite que ton modèle produit ait "nom"
//             produitDescription: produit.categorieDescription, // nécessite que ton modèle produit ait "description"
//             utilisateur: utilisateurId,
//             utilisateurNom: utilisateur.nom, // nécessite que ton modèle utilisateur ait "nom"
//             quantite: Number(quantite),
//             prix_unitaire:produit.prixVente,
//             date_vente
//         });

//         await nouvelleVente.save();

//         // Diminuer le stock
//         produit.sctock -= Number(quantite); // ⚠️ change en produit.stock si nécessaire
//         produit.quantite = produit.sctock;
//         await produit.save();

//         return res.status(201).json({ message: "Vente enregistrée avec succès", vente: nouvelleVente });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// // Récupérer toutes les ventes
// module.exports.getAllVentes = async (req, res) => {
//     try {
//         const ventes = await venteModel.find()
//             .populate('produit')
//             .populate('utilisateur');

//         res.status(200).json({ message: "Liste des ventes", ventes });
//     } catch (error) {
//         res.status(400).json({ message: 'Erreur lors de la récupération', error: error.message });
//     }
// };

// // // Récupérer une seule vente
// module.exports.getUneVente = async (req, res) => {
//     const venteId = req.params.id;
//     if (!ObjectID.isValid(venteId)) {
//         return res.status(400).send("ID invalide");
//     }
//     try {
//         const vente = await venteModel.findById(venteId)
//             .populate('produit')
//             .populate('utilisateur');
//         if (!vente) {
//             return res.status(404).json({ message: "Vente introuvable" });
//         }
//         res.status(200).json({ message: "Vente trouvée", vente });
//     } catch (error) {
//         res.status(400).json({ message: 'Erreur lors de la récupération', error: error.message });
//     }
// };

// // // Modifier une vente
// module.exports.updateVente = async (req, res) => {
//     const venteId = req.params.id;

//     if (!ObjectID.isValid(venteId)) {
//         return res.status(400).send('ID invalide');
//     }

//     try {
//         const venteExistante = await venteModel.findById(venteId);
//         if (!venteExistante) {
//             return res.status(404).json({ message: 'Vente introuvable' });
//         }

//         const produit = await produitModel.findById(venteExistante.produit);
//         if (!produit) {
//             return res.status(404).json({ message: "Produit introuvable" });
//         }

//         // Si la quantité change, ajuster le stock
//         const ancienneQuantite = venteExistante.quantite;
//         const nouvelleQuantite = Number(req.body.quantite);

//         if (nouvelleQuantite > ancienneQuantite) {
//             let diff = nouvelleQuantite - ancienneQuantite;
//             if (produit.sctock < diff) {
//                 return res.status(400).json({ message: "Stock insuffisant" });
//             }
//             produit.sctock -= diff;
//         } else if (nouvelleQuantite < ancienneQuantite) {
//             let diff = ancienneQuantite - nouvelleQuantite;
//             produit.sctock += diff;
//         }

//         produit.quantite = produit.sctock;
//         await produit.save();

//         // Mettre à jour la vente
//         venteExistante.quantite = nouvelleQuantite;
//         venteExistante.prix_unitaire = req.body.prix_unitaire || venteExistante.prix_unitaire;
//         venteExistante.date_vente = req.body.date_vente || venteExistante.date_vente;

//         await venteExistante.save();

//         res.status(200).json({ message: 'Vente modifiée avec succès', vente: venteExistante });

//     } catch (error) {
//         res.status(400).json({ message: 'Erreur lors de la modification', error: error.message });
//     }
// };

// // // Supprimer une vente
// module.exports.deleteVente = async (req, res) => {
//     const venteId = req.params.id;
//     if (!ObjectID.isValid(venteId)) {
//         return res.status(400).send("ID invalide");
//     }
//     try {
//         const vente = await venteModel.findByIdAndDelete(venteId);
//         if (!vente) {
//             return res.status(404).send("Vente introuvable");
//         }

//         // Remettre le stock au produit
//         const produit = await produitModel.findById(vente.produit);
//         if (produit) {
//             produit.sctock += vente.quantite;
//             produit.quantite = produit.sctock;
//             await produit.save();
//         }

//         res.status(200).json({ message: "Vente supprimée et stock ajusté" });
//     } catch (error) {
//         res.status(400).json({ message: 'Erreur lors de la suppression', error: error.message });
//     }
// };





// const mongoose = require('mongoose');
// const ObjectID = mongoose.Types.ObjectId;
// const venteModel = require('../models/venteModel');
// const produitModel = require('../models/produitModel');
// const utilisateurModel = require('../models/utilisateurModel');

// // Ajouter une vente
// module.exports.addVente = async (req, res) => {
//     try {
//         let { produitId, utilisateurId, quantite, prix_unitaire, date_vente,montantT } = req.body;

//         // Validation des champs requis
//         if (!produitId || !utilisateurId || !quantite || !prix_unitaire || !montantT) {
//             return res.status(400).json({ message: "Tous les champs sont requis: produitId, utilisateurId, quantite, prix_unitaire" });
//         }

//         // Vérification ID produit
//         if (!ObjectID.isValid(produitId)) {
//             return res.status(400).json({ message: "ID produit invalide" });
//         }

//         // Vérification ID utilisateur
//         if (!ObjectID.isValid(utilisateurId)) {
//             return res.status(400).json({ message: "ID utilisateur invalide" });
//         }

//         // Vérifier si le produit existe
//         const produit = await produitModel.findById(produitId);
//         if (!produit) {
//             return res.status(404).json({ message: "Produit introuvable" });
//         }

//         // Vérifier si l'utilisateur existe
//         const utilisateur = await utilisateurModel.findById(utilisateurId);
//         if (!utilisateur) {
//             return res.status(404).json({ message: "Utilisateur introuvable" });
//         }

//         // Vérifier stock suffisant - CORRECTION: utiliser le bon champ stock
//         if (produit.stock < quantite) { // Change produit.sctock en produit.stock
//             return res.status(400).json({ 
//                 message: "Stock insuffisant", 
//                 stockDisponible: produit.stock,
//                 quantiteDemandee: quantite 
//             });
//         }

//         // Créer la vente - CORRECTION: utiliser les bons champs
//         const nouvelleVente = new venteModel({
//             produit: produitId,
//             produitNom: produit.nom || produit.categorieNom || 'Nom non disponible', // Utiliser le bon champ
//             produitDescription: produit.description || produit.categorieDescription || '', // Utiliser le bon champ
//             utilisateur: utilisateurId,
//             utilisateurNom: utilisateur.nom || utilisateur.username || 'Utilisateur inconnu', // Utiliser le bon champ
//             quantite: Number(quantite),
//             montantT:montantT,
//             prix_unitaire: Number(prix_unitaire), // Utiliser le prix de la requête, pas du produit
//             date_vente: date_vente || new Date()
//         });

//         await nouvelleVente.save();

//         // Diminuer le stock - CORRECTION: utiliser le bon champ stock
//         produit.stock -= Number(quantite); // Change produit.sctock en produit.stock
//         produit.quantite = produit.stock; // Si tu veux synchroniser quantite avec stock
//         await produit.save();

//         return res.status(201).json({ 
//             message: "Vente enregistrée avec succès", 
//             vente: nouvelleVente,
//             nouveauStock: produit.stock
//         });

//     } catch (error) {
//         console.error('Erreur addVente:', error);
//         res.status(500).json({ 
//             message: "Erreur serveur", 
//             error: error.message,
//             stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//         });
//     }
// };

// // Récupérer toutes les ventes
// module.exports.getAllVentes = async (req, res) => {
//     try {
//         const ventes = await venteModel.find()
//             // .populate('produit')
//             // .populate('utilisateur')
//             .sort({ date_vente: -1 }); // Trier par date décroissante

//         res.status(200).json({ 
//             message: "Liste des ventes", 
//             count: ventes.length,
//             ventes 
//         });
//     } catch (error) {
//         console.error('Erreur getAllVentes:', error);
//         res.status(500).json({ 
//             message: 'Erreur lors de la récupération', 
//             error: error.message 
//         });
//     }
// };

// // Récupérer une seule vente
// module.exports.getUneVente = async (req, res) => {
//     const venteId = req.params.id;
    
//     if (!ObjectID.isValid(venteId)) {
//         return res.status(400).json({ message: "ID invalide" });
//     }
    
//     try {
//         const vente = await venteModel.findById(venteId)
//             .populate('produit')
//             .populate('utilisateur');
            
//         if (!vente) {
//             return res.status(404).json({ message: "Vente introuvable" });
//         }
        
//         res.status(200).json({ 
//             message: "Vente trouvée", 
//             vente 
//         });
//     } catch (error) {
//         console.error('Erreur getUneVente:', error);
//         res.status(500).json({ 
//             message: 'Erreur lors de la récupération', 
//             error: error.message 
//         });
//     }
// };

// // Modifier une vente
// module.exports.updateVente = async (req, res) => {
//     const venteId = req.params.id;

//     if (!ObjectID.isValid(venteId)) {
//         return res.status(400).json({ message: 'ID invalide' });
//     }

//     try {
//         const venteExistante = await venteModel.findById(venteId);
//         if (!venteExistante) {
//             return res.status(404).json({ message: 'Vente introuvable' });
//         }

//         const produit = await produitModel.findById(venteExistante.produit);
//         if (!produit) {
//             return res.status(404).json({ message: "Produit introuvable" });
//         }

//         // Si la quantité change, ajuster le stock
//         const ancienneQuantite = venteExistante.quantite;
//         const nouvelleQuantite = Number(req.body.quantite) || ancienneQuantite;

//         if (nouvelleQuantite !== ancienneQuantite) {
//             const difference = nouvelleQuantite - ancienneQuantite;
            
//             // Vérifier si le stock est suffisant pour l'augmentation
//             if (difference > 0 && produit.stock < difference) {
//                 return res.status(400).json({ 
//                     message: "Stock insuffisant pour cette modification",
//                     stockDisponible: produit.stock,
//                     differenceNecessaire: difference
//                 });
//             }
            
//             // Ajuster le stock
//             produit.stock -= difference;
//             produit.quantite = produit.stock; // Synchroniser si nécessaire
//             await produit.save();
//         }

//         // Mettre à jour la vente
//         venteExistante.quantite = nouvelleQuantite;
//         venteExistante.prix_unitaire = Number(req.body.prix_unitaire) || venteExistante.prix_unitaire;
//         venteExistante.date_vente = req.body.date_vente || venteExistante.date_vente;

//         await venteExistante.save();

//         res.status(200).json({ 
//             message: 'Vente modifiée avec succès', 
//             vente: venteExistante,
//             nouveauStock: produit.stock
//         });

//     } catch (error) {
//         console.error('Erreur updateVente:', error);
//         res.status(500).json({ 
//             message: 'Erreur lors de la modification', 
//             error: error.message 
//         });
//     }
// };

// // Supprimer une vente
// module.exports.deleteVente = async (req, res) => {
//     const venteId = req.params.id;
    
//     if (!ObjectID.isValid(venteId)) {
//         return res.status(400).json({ message: "ID invalide" });
//     }
    
//     try {
//         const vente = await venteModel.findByIdAndDelete(venteId);
//         if (!vente) {
//             return res.status(404).json({ message: "Vente introuvable" });
//         }

//         // Remettre le stock au produit - CORRECTION: utiliser le bon champ stock
//         const produit = await produitModel.findById(vente.produit);
//         if (produit) {
//             produit.stock += vente.quantite; // Change produit.sctock en produit.stock
//             produit.quantite = produit.stock; // Synchroniser si nécessaire
//             await produit.save();
//         }

//         res.status(200).json({ 
//             message: "Vente supprimée et stock ajusté",
//             stockAjoute: vente.quantite,
//             nouveauStock: produit ? produit.stock : 'Produit non trouvé'
//         });
        
//     } catch (error) {
//         console.error('Erreur deleteVente:', error);
//         res.status(500).json({ 
//             message: 'Erreur lors de la suppression', 
//             error: error.message 
//         });
//     }
// };




const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;
const venteModel = require('../models/venteModel');
const produitModel = require('../models/produitModel');
const utilisateurModel = require('../models/utilisateurModel');

// Ajouter une vente
// module.exports.addVente = async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const { produitId, utilisateurId, quantite, prix_unitaire, date_vente, montantT } = req.body;

//         // 1. VALIDATION DES DONNÉES D'ENTRÉE
//         if (!produitId || !utilisateurId || !quantite || !prix_unitaire) {
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(400).json({ message: "Tous les champs sont requis: produitId, utilisateurId, quantite, prix_unitaire, montantT" });
//         }

//         if (!ObjectID.isValid(produitId) || !ObjectID.isValid(utilisateurId)) {
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(400).json({ message: "ID produit ou utilisateur invalide" });
//         }

//         // 2. VÉRIFICATION DES RÉFÉRENCES (Produit et Utilisateur)
//         const [produit, utilisateur] = await Promise.all([
//             produitModel.findById(produitId).session(session),
//             utilisateurModel.findById(utilisateurId).session(session)
//         ]);

//         if (!produit) {
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(404).json({ message: "Produit introuvable" });
//         }
//         if (!utilisateur) {
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(404).json({ message: "Utilisateur introuvable" });
//         }

//         // 3. VÉRIFICATION DU STOCK
//         if (produit.stock < quantite) {
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(400).json({
//                 message: "Stock insuffisant",
//                 stockDisponible: produit.stock,
//                 quantiteDemandee: quantite
//             });
//         }

//         // 4. CRÉATION DE LA VENTE
//         const nouvelleVente = new venteModel({
//             produit: produitId,
//             produitNom: produit.nom || 'Nom non disponible',
//             produitDescription: produit.description || '',
//             utilisateur: utilisateurId,
//             utilisateurNom: utilisateur.nom || utilisateur.username || 'Utilisateur inconnu',
//             quantite: Number(quantite),
//             prix_unitaire: Number(prix_unitaire),
//             montantT: Number(montantT),
//             date_vente: date_vente || new Date()
//         });

//         const venteSauvegardee = await nouvelleVente.save({ session });

//         // 5. MISE À JOUR DU STOCK
//         produit.stock -= Number(quantite);
//         await produit.save({ session });

//         // 6. VALIDATION DE LA TRANSACTION
//         await session.commitTransaction();
//         session.endSession();

//         // 7. RÉPONSE DE SUCCÈS
//         return res.status(201).json({
//             message: "Vente enregistrée avec succès",
//             vente: venteSauvegardee,
//             nouveauStock: produit.stock
//         });

//     } catch (error) {
//         // 8. GESTION DES ERREURS (Annulation de la transaction)
//         await session.abortTransaction();
//         session.endSession();

//         console.error('Erreur addVente:', error);
//         res.status(500).json({
//             message: "Erreur serveur lors de la création de la vente",
//             error: error.message,
//             stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//         });
//     }
// };

module.exports.addVente = async (req, res) => {
    console.log("🔍 Données reçues addVente:", JSON.stringify(req.body, null, 2));
    
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        
        const { produitId, utilisateurId, quantite, prix_unitaire, date_vente } = req.body;

        // VALIDATION RENFORCÉE
        if (!produitId || !utilisateurId || !quantite || !prix_unitaire) {
            await session.abortTransaction();
            return res.status(400).json({ 
                message: "Champs requis: produitId, utilisateurId, quantite, prix_unitaire" 
            });
        }

        // CONVERSION ET VALIDATION NUMÉRIQUE
        const quantiteNum = Number(quantite);
        const prixNum = parseFloat(prix_unitaire);
        
        if (isNaN(quantiteNum) || isNaN(prixNum) || quantiteNum <= 0 || prixNum <= 0) {
            await session.abortTransaction();
            return res.status(400).json({ 
                message: "Quantité et prix doivent être des nombres positifs" 
            });
        }

        // VÉRIFICATION PRODUIT
        const produit = await produitModel.findById(produitId).session(session);
        if (!produit) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Produit introuvable" });
        }

        // VÉRIFICATION UTILISATEUR  
        const utilisateur = await utilisateurModel.findById(utilisateurId).session(session);
        if (!utilisateur) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        // VÉRIFICATION STOCK
        if (produit.stock < quantiteNum) {
            await session.abortTransaction();
            return res.status(400).json({ 
                message: "Stock insuffisant",
                stockDisponible: produit.stock
            });
        }

        // CRÉATION VENTE (avec calcul sécurisé)
        const nouvelleVente = new venteModel({
            produit: produitId,
            produitNom: produit.nom || produit.categorieNom || 'Nom inconnu',
            produitDescription: produit.description || produit.categorieDescription || 'Aucune description disponible', // CORRIGÉ
            utilisateur: utilisateurId,
            utilisateurNom: utilisateur.nom || utilisateur.username || 'Utilisateur inconnu',
            quantite: quantiteNum,
            prix_unitaire: prixNum,
            montantT: quantiteNum * prixNum, // CALCUL SÉCURISÉ
            date_vente: date_vente || new Date()
        });

        const venteSauvegardee = await nouvelleVente.save({ session });
        console.log("✅ Vente sauvegardée:", venteSauvegardee);

        // MISE À JOUR STOCK
        produit.stock -= quantiteNum;
        await produit.save({ session });
        console.log("✅ Stock mis à jour:", produit.stock);

        await session.commitTransaction();
        
        res.status(201).json({
            message: "Vente enregistrée avec succès!",
            vente: venteSauvegardee,
            nouveauStock: produit.stock
        });

    } catch (error) {
        console.error("❌ ERREUR addVente:", error.message);
        
        if (session) {
            await session.abortTransaction();
        }
        
        res.status(500).json({
            message: "Erreur lors de l'enregistrement de la vente",
            error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur technique'
        });
    } finally {
        if (session) {
            session.endSession();
        }
    }
};

// Récupérer toutes les ventes
// module.exports.getAllVentes = async (req, res) => {
//     try {
//         const ventes = await venteModel.find()
//             .sort({ createdAt: -1 }) // Utilisation du timestamp createdAt pour une cohérence
//             .lean(); // Améliore les performances pour les données en lecture seule

//         res.status(200).json({
//             message: "Liste des ventes récupérée avec succès",
//             count: ventes.length,
//             data: ventes // Formatage cohérent des réponses avec 'data'
//         });

//     } catch (error) {
//         console.error('Erreur getAllVentes:', error);
//         res.status(500).json({
//             message: 'Erreur serveur lors de la récupération des ventes',
//             error: error.message
//         });
//     }
// };
module.exports.getAllVentes = async (req, res) => {
        try {
            const ventes = await venteModel.find()
                // .populate('produit')
                // .populate('utilisateur')
                .sort({ date_vente: -1 }); // Trier par date décroissante
    
            res.status(200).json({ 
                message: "Liste des ventes", 
                count: ventes.length,
                ventes 
            });
        } catch (error) {
            console.error('Erreur getAllVentes:', error);
            res.status(500).json({ 
                message: 'Erreur lors de la récupération', 
                error: error.message 
            });
        }
    };
// Récupérer une seule vente
module.exports.getUneVente = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectID.isValid(id)) {
            return res.status(400).json({ message: "ID de vente invalide" });
        }

        const vente = await venteModel.findById(id)
            .populate('produit', 'nom description stock') // Sélection des champs pertinents
            .populate('utilisateur', 'nom email') // Sélection des champs pertinents
            .lean();

        if (!vente) {
            return res.status(404).json({ message: "Vente non trouvée" });
        }

        res.status(200).json({
            message: "Vente récupérée avec succès",
            data: vente
        });

    } catch (error) {
        console.error('Erreur getUneVente:', error);
        res.status(500).json({
            message: 'Erreur serveur lors de la récupération de la vente',
            error: error.message
        });
    }
};

// Modifier une vente
module.exports.updateVente = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;
        const { quantite, prix_unitaire, date_vente } = req.body;

        if (!ObjectID.isValid(id)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'ID de vente invalide' });
        }

        // Trouver la vente existante
        const venteExistante = await venteModel.findById(id).session(session);
        if (!venteExistante) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Vente non trouvée' });
        }

        // Trouver le produit associé
        const produit = await produitModel.findById(venteExistante.produit).session(session);
        if (!produit) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Produit associé introuvable" });
        }

        // Gestion de la modification de la quantité
        const ancienneQuantite = venteExistante.quantite;
        const nouvelleQuantite = Number(quantite) || ancienneQuantite;
        const differenceQuantite = nouvelleQuantite - ancienneQuantite;

        if (differenceQuantite !== 0) {
            // Vérification du stock en cas d'augmentation de la quantité
            if (differenceQuantite > 0 && produit.stock < differenceQuantite) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    message: "Stock insuffisant pour cette modification",
                    stockDisponible: produit.stock,
                    differenceNecessaire: differenceQuantite
                });
            }

            // Mise à jour du stock
            produit.stock -= differenceQuantite;
            await produit.save({ session });
        }

        // Mise à jour de la vente
        venteExistante.quantite = nouvelleQuantite;
        if (prix_unitaire !== undefined) venteExistante.prix_unitaire = Number(prix_unitaire);
        if (date_vente !== undefined) venteExistante.date_vente = date_vente;
        // Recalcul du montant total si nécessaire (à implémenter si logique métier)
        // venteExistante.montantT = nouvelleQuantite * venteExistante.prix_unitaire;

        await venteExistante.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: 'Vente modifiée avec succès',
            data: venteExistante,
            nouveauStock: produit.stock
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Erreur updateVente:', error);
        res.status(500).json({
            message: 'Erreur serveur lors de la modification de la vente',
            error: error.message
        });
    }
};

// Supprimer une vente
module.exports.deleteVente = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        if (!ObjectID.isValid(id)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "ID de vente invalide" });
        }

        const vente = await venteModel.findByIdAndDelete(id).session(session);
        if (!vente) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Vente non trouvée" });
        }

        // Restitution du stock
        const produit = await produitModel.findById(vente.produit).session(session);
        if (produit) {
            produit.stock += vente.quantite;
            await produit.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: "Vente supprimée avec succès et stock restitué",
            stockRestitue: vente.quantite,
            nouveauStock: produit ? produit.stock : 'Produit non trouvé'
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Erreur deleteVente:', error);
        res.status(500).json({
            message: 'Erreur serveur lors de la suppression de la vente',
            error: error.message
        });
    }
};