const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;
const venteModel = require('../models/venteModel');
const produitModel = require('../models/produitModel');
const utilisateurModel = require('../models/utilisateurModel');


// Ajouter une vente
module.exports.addVente = async (req, res) => {
    try {
        let { produitId, utilisateurId, quantite, prix_unitaire, date_vente } = req.body;

        // Vérification ID produit
        if (!ObjectID.isValid(produitId)) {
            return res.status(400).json({ message: "ID produit invalide" });
        }

        // Vérification ID utilisateur
        if (!ObjectID.isValid(utilisateurId)) {
            return res.status(400).json({ message: "ID utilisateur invalide" });
        }

        // Vérifier si le produit existe
        const produit = await produitModel.findById(produitId);
        if (!produit) {
            return res.status(404).json({ message: "Produit introuvable" });
        }

        // Vérifier si l'utilisateur existe
        const utilisateur = await utilisateurModel.findById(utilisateurId);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        // Vérifier stock suffisant
        if (produit.sctock < quantite) { // ⚠️ Change en produit.stock si ton champ s'appelle stock
            return res.status(400).json({ message: "Stock insuffisant" });
        }

        // Créer la vente
        const nouvelleVente = new venteModel({
            produit: produitId,
            produitNom: produit.categorieNom, // nécessite que ton modèle produit ait "nom"
            utilisateur: utilisateurId,
            utilisateurNom: utilisateur.nom, // nécessite que ton modèle utilisateur ait "nom"
            quantite: Number(quantite),
            prix_unitaire:produit.prixVente,
            date_vente
        });

        await nouvelleVente.save();

        // Diminuer le stock
        produit.sctock -= Number(quantite); // ⚠️ change en produit.stock si nécessaire
        produit.quantite = produit.sctock;
        await produit.save();

        return res.status(201).json({ message: "Vente enregistrée avec succès", vente: nouvelleVente });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Récupérer toutes les ventes
module.exports.getAllVentes = async (req, res) => {
    try {
        const ventes = await venteModel.find()
            .populate('produit')
            .populate('utilisateur');

        res.status(200).json({ message: "Liste des ventes", ventes });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la récupération', error: error.message });
    }
};

// // Récupérer une seule vente
module.exports.getUneVente = async (req, res) => {
    const venteId = req.params.id;
    if (!ObjectID.isValid(venteId)) {
        return res.status(400).send("ID invalide");
    }
    try {
        const vente = await venteModel.findById(venteId)
            .populate('produit')
            .populate('utilisateur');
        if (!vente) {
            return res.status(404).json({ message: "Vente introuvable" });
        }
        res.status(200).json({ message: "Vente trouvée", vente });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la récupération', error: error.message });
    }
};

// // Modifier une vente
module.exports.updateVente = async (req, res) => {
    const venteId = req.params.id;

    if (!ObjectID.isValid(venteId)) {
        return res.status(400).send('ID invalide');
    }

    try {
        const venteExistante = await venteModel.findById(venteId);
        if (!venteExistante) {
            return res.status(404).json({ message: 'Vente introuvable' });
        }

        const produit = await produitModel.findById(venteExistante.produit);
        if (!produit) {
            return res.status(404).json({ message: "Produit introuvable" });
        }

        // Si la quantité change, ajuster le stock
        const ancienneQuantite = venteExistante.quantite;
        const nouvelleQuantite = Number(req.body.quantite);

        if (nouvelleQuantite > ancienneQuantite) {
            let diff = nouvelleQuantite - ancienneQuantite;
            if (produit.sctock < diff) {
                return res.status(400).json({ message: "Stock insuffisant" });
            }
            produit.sctock -= diff;
        } else if (nouvelleQuantite < ancienneQuantite) {
            let diff = ancienneQuantite - nouvelleQuantite;
            produit.sctock += diff;
        }

        produit.quantite = produit.sctock;
        await produit.save();

        // Mettre à jour la vente
        venteExistante.quantite = nouvelleQuantite;
        venteExistante.prix_unitaire = req.body.prix_unitaire || venteExistante.prix_unitaire;
        venteExistante.date_vente = req.body.date_vente || venteExistante.date_vente;

        await venteExistante.save();

        res.status(200).json({ message: 'Vente modifiée avec succès', vente: venteExistante });

    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la modification', error: error.message });
    }
};

// // Supprimer une vente
module.exports.deleteVente = async (req, res) => {
    const venteId = req.params.id;
    if (!ObjectID.isValid(venteId)) {
        return res.status(400).send("ID invalide");
    }
    try {
        const vente = await venteModel.findByIdAndDelete(venteId);
        if (!vente) {
            return res.status(404).send("Vente introuvable");
        }

        // Remettre le stock au produit
        const produit = await produitModel.findById(vente.produit);
        if (produit) {
            produit.sctock += vente.quantite;
            produit.quantite = produit.sctock;
            await produit.save();
        }

        res.status(200).json({ message: "Vente supprimée et stock ajusté" });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la suppression', error: error.message });
    }
};
